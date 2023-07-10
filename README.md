# Interactive Coding Environment

<sub>I will reorganize docs later</sub>
React application that is able to locally (on the user's personal machine) create text
cells and code cells with a preview window beside each cell. Multiple programming
languages will be able to be configured into this environment.

## Challenges

1.  Code will be provided to Preview as a string. This string must be executed safely.
2.  This code might have advanced JavaScript in it (<em>e.g.</em>, JSX) that the browser
    cannot execute.

    -   will need to use a transpiler, like Babel. For this app, we can:
        -   setup a backend server to traspile the sent code
        -   use an in-browser transpiler

3.  The code might have import statements for other JavaScript or CSS files. These
    import statements must be dealt with <em>before</em> executing the code.
    -   will need to find all the modules the user has imported from NPM

### Transpiling & Bundling Locally

-   Removes an extra request to the API server (which means faster code execution).
-   An API server will not have to be maintained.
-   Less complexity - no moving code back and forth.

This calls for webpack needing to built into the react app with a custom plugin to
fetch individual files from NPM.

#### Problem with bundling locally is that webpack does NOT work in the browser.

Solve webpack problem by using a webpack and babel replacement called
[esbuild](https://esbuild.github.io/).

### Esbuild

Contains:

-   build: S => (g(), $.build(S))
-   serve: f serve(S, K)
-   stop: f stop()
-   transform: f transforms(S, K)

`transform` will attempt to execute transpiling on the code that is user provided.

`build` bundles the user provided code. Bundling in the browser requires extra setup.

`build` relies on a file system. If user writes:

```JavaScript
import React from "react";
```

`esbuild` will look for a filesystem that the browser will not have. The app will use a
plugin to intercept the request from `esbuild` for `react` code and send a request to
the NPM Registry to get the URL to `react`.

Running the following in a command line:

```sh
npm view react dist.tarball
```

will return `https://registry.npmjs.org/react/-/react-18.2.0.tgz`. This provides the
`react` source code.

For this app, inside of the tarball is `/package/index.js` which
has the code:

```JavaScript
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/react.production.min.js');
} else {
    module.exports = require('./cjs/react.development.js');
}
```

`esbuild` will interpret the `require()` statements in order to join the needed files.

To help with getting the above JS code, [UNPKG](https://unpkg.com) will be used
(`unpkg.com/react`) to fetch the above `index.js`.

### Esbuild Bundling Process

To create a bundle in the browser with esbuild, `onResolve` and `onLoad` will need
to be used.

Both `onResolve` and `onLoad` have an object with `filter` that is a regular expression.
The regex controls when `onResolve` & `onLoad` are executed. `onResolve` handles the
different types of files attempting to be loaded.
<em>e.g.</em>, one `onResolve` may have a `filter` for loading a JS file, and another
for loading a CSS file.

The `namespace` is similar to `filter` in that it specifies a set of files. An example
of applying an `onLoad` on only files with a `namespace` of `a`:

```javascript
build.onResolve({...}, async (args: any) => ({ path: args.path, namespace: 'a' }));

build.onLoad({ filter: /.*/, namespace: 'a] }', async (args: any) => {...});
```

|                                      Description                                      |       Step       |
| :-----------------------------------------------------------------------------------: | :--------------: |
|                    Figure out where the `index.js` file is stored                     | `onResolve` step |
|                        Attempt to load up the `index.js` file                         |  `onLoad` step   |
|           Parse the `index.js` file, find any `import`/`require`/`exports`            |                  |
| If there are any `import`/`require`/`exports`, figure out where the requested file is | `onResolve` step |
|                             Attempt to load that file up                              |  `onLoad` step   |

### onResolve

`onResolve` will find where `index.js` is stored. This function overrides esbuild's
natural process of finding out what a file's path is.

Only one `onResolve` function is needed. It can be defined with multiple `if`
statements to determine paths through one `filter`:

```javascript
build.onResolve({ filter: /.*/ }, () => {...});
```

For this application, several `onResolve` functions will have more specific `filter`s:

```javascript
build.onResolve({ filter: /^index\.js$/ }, () => ({ path: "index.js" namespace: "a" }));
build.onResolve({ filter: /^\.{1,2}\// }, (args: any) => ({ path:..., namespace: "a" }));
build.onResolve({ filter: /\.*/ }, (...) => {...});
```

This first `filter` looks for exactly "index.js", the second handles relative paths
(<em>i.e.</em>, "./" or "../", for something like "./utils"), and the last will handle
the main file of a module.
