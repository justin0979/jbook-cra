# Interactive Coding Environment

Application that is able to create text cells and code cells with a preview window
beside each cell. Multiple languages will be able to be configured into this
environment.

## Challenges

-   Code will be provided to Preview as a string. This string must be executed safely.
-   This code might have advanced JavaScript in it (<em>e.g.</em>, JSX) that the browser
    cannot execute.
    -   will need to use a transpiler, like Babel. For this app, we can:
        -   setup a backend server to traspile the sent code
        -   use an in-browser transpiler
-   The code might have import statements for other JavaScript or CSS files. These
    import statements must be dealt with <em>before</em> executing the code.
