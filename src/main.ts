import inquirer from "inquirer";

inquirer
  .prompt([
    {
      type: "list",
      name: "source",
      message: "请选择项目的软件源",
      choices: ["pnpm(推荐)", "yarn", "npm"],
    },
    {
      type: "list",
      name: "lang",
      message: "请选择项目的语言",
      choices: ["TypesScript(推荐)", "JavaScript"],
    },
    {
      type: "checkbox",
      name: "dependencies",
      message: "请选择需要安装的依赖",
      choices: ["Eslint(检查语法规范)", "Prettier(检查编码格式)", "Husky+Lint-staged(Git Hook)"],
    },
  ])
  .then((answer) => {
    console.log("answer", answer);
  });
