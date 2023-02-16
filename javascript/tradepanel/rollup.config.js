import pkg from "./package.json" assert { type: "json" };
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import externalPeer from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import html from "rollup-plugin-html";
import multi from "@rollup/plugin-multi-entry";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default {
  input: ["./src/main.ts"],
  output: [
    {
      file: pkg.main,
      format: "es",
      // format: "iife",
      exports: "named",
      strict: true,
      name: "TradePanel",
    },
  ],
  external: ["js-sha3"],
  plugins: [
    multi(),
    nodePolyfills(/* options */),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    resolve({
      browser: true,
      preferBuiltins: true,
    }),
    commonjs({
      // defaultIsModuleExports: true,
      // include: "node_modules/**",
    }),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    html({
      include: "**/*.html",
    }),
    externalPeer(),
  ],
  onwarn(warning, warn) {
    if (warning.code === "THIS_IS_UNDEFINED") return;
    warn(warning);
  },
};
