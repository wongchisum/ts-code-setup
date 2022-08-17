import spawn from "cross-spawn";

export default function () {
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
        choices: ["eslint", "prettier", "husky", "lint-staged", "typedoc"],
      },
    ])
    .then((answer: any) => {
      const { tool, dependencies } = answer;
      if (tool && dependencies.length) {
        let cmdArgs = ["typescript", "rollup", ...dependencies];
        cmdArgs.unshift(tool, "add");
        console.log(`Run command:`, cmdArgs.join(" "));
        spawn.sync(tool, cmdArgs, { stdio: "inherit" });
      }
    })
    .catch((err: any) => {
      console.log("Error:", err);
      process.exit(1);
    });
}
