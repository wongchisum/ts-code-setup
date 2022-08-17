import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import typescript from 'rollup-plugin-typescript2';

export default {
  input: "src/main.ts",
  output: {
    file: "dist/main.js",
    format: "cjs",
  },
  plugins: [
    resolve(), 
    commonjs({
      include: "node_modules/**", // 包括
      exclude: [], // 排除
    }),
    babel({
      // 运行babel配置
      exclude: "**/node_modules/**", // 不打包node_modules中的文件
    }),
    typescript(), // typescript支持
  ],
  external:["child_process","path","fs"]
};
