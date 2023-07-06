# Interactive Coding Environment

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

`esbuild` will look for a filesystem that the browser will not have. The app will a
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

To help with getting the above JS code, UNPKG will be used (`unpkg.com/react`) to
fetch the above `index.js`.
