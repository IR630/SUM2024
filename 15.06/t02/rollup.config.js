import resolve from "@rollup/plugin-node-resolve";

export default {
    input: "main.js",
    output: {
        dir: "output",
        format: "iife",
        sourcemap: "inline"
    },
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
          }),
        // terser()
    ]
}