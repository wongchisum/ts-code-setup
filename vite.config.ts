import { defineConfig } from "vite";
import { resolve } from "path";
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "./src/main.ts"),
            fileName:"index.js",
            formats:["cjs"]
        }
    },
    plugins:[commonjs()]
});
