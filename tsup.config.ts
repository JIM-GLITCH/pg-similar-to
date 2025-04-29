import { defineConfig } from "tsup";

export default defineConfig({
    clean: true,
    dts: true,
    entry: ["./index.ts"],
    format: [ "cjs"],
    legacyOutput: true,
    outDir: "dist",
    sourcemap: true,
    external:[]
});