import pkg from "./package.json" assert { type: "json" };
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import externalPeer from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import html from "rollup-plugin-html";
import multi from "@rollup/plugin-multi-entry";

export default {
  input: ["./src/main.ts"],
  output: [
    {
      file: pkg.main,
      format: "esm",
      exports: "named",
      strict: false,
    },
  ],
  plugins: [
    multi(),
    babel({
      babelHelpers: "bundled",
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    html({
      include: "**/*.html",
    }),
    externalPeer(),
  ],
};
