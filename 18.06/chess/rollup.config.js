import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "./client/index.js",
  output: {
    dir: "./client/output",
    format: "iife",
    sourcemap: "inline",
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
  ],
};
