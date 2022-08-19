import spawn from "cross-spawn";
import chalk from "chalk";

const log = (...args: unknown[]) => console.log.apply(null, args);

const processLog = (message:string) => log(chalk.bold.bgBlue.white(message))
const commandLog = (message:string) => log(chalk.bold.bgBlue.hex('#FF8800')(message))
const errorLog = (message:string) => log(chalk.bold.bgRed.white(message))
const successLog = (message:string) => log(chalk.bold.bgGreen.white(message))

export default function setup() {
  require("inquirer")
    .prompt([
      {
        type: "list",
        name: "tool",
        message: "请选择项目的依赖管理工具",
        choices: ["pnpm", "yarn", "npm"],
      },
      {
        type: "checkbox",
        name: "dependencies",
        message: "请选择需要安装的依赖",
        choices: [
          "eslint",
          "prettier",
          "husky",
          "lint-staged",
          "typedoc",
          "@pierred/commity",
        ],
      },
    ])
    .then((answer: any) => {
      const { tool, dependencies } = answer;
      if (tool && dependencies.length) {
        // 下载开发和构建所需的依赖
        processLog(`\n下载开发和构建所需的依赖\n`);
        let buildPlugins = [
          "typescript",
          "rollup",
          "rollup-plugin-babel",
          "rollup-plugin-commonjs",
          "rollup-plugin-node-resolve",
          "rollup-plugin-typescript2",
          "rollup-plugin-terser",
          "cross-env"
        ];
        buildPlugins.unshift(tool, "add");
        buildPlugins.push("-D");
        commandLog(`\n执行命令:${buildPlugins.join(" ")}\n`);
        spawn.sync(tool, buildPlugins, { stdio: "inherit" });
        processLog(`\n下载完毕\n`);

        processLog(`\n下载用户指定的依赖\n`);
        let cmdArgs = [...dependencies];
        cmdArgs.unshift(tool, "add");
        cmdArgs.push("-D");
        commandLog(`\n执行命令:${cmdArgs.join(" ")}\n`);
        spawn.sync(tool, cmdArgs, { stdio: "inherit" });
        processLog(`\n下载完毕\n`);

        // 下载eslint所需的依赖
        if (dependencies.includes("eslint")) {
          processLog(`\n正在下载eslint插件\n`);
          let eslintPlugins = [
            "eslint-config-prettier",
            "eslint-plugin-import",
            "eslint-plugin-jsx-a11y",
            "eslint-plugin-prettier",
            "eslint-plugin-react",
            "eslint-plugin-simple-import-sort",
            "@typescript-eslint/eslint-plugin",
            "@typescript-eslint/parser",
          ];
          eslintPlugins.unshift(tool, "add");
          eslintPlugins.push("-D");
          commandLog(`\n执行命令:${buildPlugins.join(" ")}\n`);
          spawn.sync(tool, buildPlugins, { stdio: "inherit" });
          processLog(`\n下载完毕\n`);
        }

        processLog("正在项目配置模板");
        // 完成下载，git拉取项目模板
        const { execSync } = require("child_process");

        execSync(
          `rm -rf temp && git clone -b release https://github.com/wongchisum/ts-code-base.git temp && cd temp && rm -rf .git && mv * ../ && cd ../ && rm -rf ./temp`
        );

        processLog("正在配置npm scripts");
        // 设置项目的npm scripts
        execSync(`npm set-script build "rollup --config rollup.config.js"`);
        execSync(`npm set-script lint:es "npx eslint src/** --fix"`);
        execSync(`npm set-script lint:code "prettier src/** --write"`);
        execSync(`npm set-script lint:staged "npx lint-staged -v"`);
        execSync(`npm set-script commit "npx commity"`);

        successLog("初始化完毕，可以使用package.json 的scripts 进行开发");
        process.exit(0);
      }
    })
    .catch((err: any) => {
      errorLog(`运行发生错误:${err}`);
      process.exit(1);
    });
}
// 需要使用dev命令调试，需要调用一下setup
// setup()

