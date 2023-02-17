import pkg from "./package.json" assert { type: "json" };
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import externalPeer from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import html from "rollup-plugin-html";
import multi from "@rollup/plugin-multi-entry";
import nodePolyfills from "rollup-plugin-node-polyfills";
import globals from "rollup-plugin-node-globals";

export default {
  input: ["./src/main.ts"],
  output: [
    {
      file: pkg.main,
      format: "esm",
      exports: "named",
      strict: true,
      name: "TradePanel",
      intro: "import Handlebars from 'handlebars/dist/cjs/handlebars.js';",
    },
  ],
  external: ["js-sha3"],
  plugins: [
    resolve({
      browser: false,
      preferBuiltins: true,
    }),
    nodePolyfills(),
    externalPeer(),
    globals(),
    commonjs({
      include: "node_modules/**",
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    multi(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    html({
      include: "**/*.html",
    }),
  ],
  onwarn(warning, warn) {
    if (warning.code === "THIS_IS_UNDEFINED") return;
    warn(warning);
  },
};
