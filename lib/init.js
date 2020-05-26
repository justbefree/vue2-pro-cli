/*
* @Author: Just be free
* @Date:   2020-05-26 11:57:27
* @Last Modified by:   Just be free
* @Last Modified time: 2020-05-26 15:22:02
* @E-mail: justbefree@126.com
*/

const ora = require('ora');
const inquirer = require('inquirer');
const chalk = require('chalk');
const request = require('request');
const download = require('download-git-repo');

module.exports = () => {
  request({
    url: 'https://api.github.com/users/justbefree-org/repos',
    headers: {
      'User-Agent': 'vue2-cli'
    }
  }, (err, res, body) =>{
    if (err) {
      console.log(chalk.red('查询模版列表失败'));
      console.log(chalk.red(err));
      process.exit();
    }

    const requestBody = JSON.parse(body)
    if (Array.isArray(requestBody)) {
      let tplNames = [];
      requestBody.forEach(repo => {
        tplNames.push(repo.name);
      })

      let promptList = [
        {
          type: 'list',
          message: '请选择模版',
          name: 'tplName',
          choices: tplNames
        },
        {
          type: 'input',
          message: '请输入项目名字',
          name: 'projectName',
          validate (val) {
            if (val !== '') {
              return true
            }
            return '项目名称不能为空'
          }
        }
      ]
      inquirer.prompt(promptList).then(answers => {

        let ind = requestBody.find(function (ele) {
          return answers.tplName == ele.name;
        });
        let gitUrl = `${ind.full_name}#${ind.default_branch}`,
          defaultUrl = './',
          projectUrl = `${defaultUrl}/${answers.projectName}`,
          spinner = ora('\n 开始生成项目，请等待...');
          spinner.start();
        download(gitUrl, projectUrl, (error)=>{
          spinner.stop();
          if (error) {
            console.log('模版下载失败……');
            console.log(error);
            process.exit();
          }
          console.log(chalk.green(`\n √ ${answers.projectName} 项目生成完毕!`));
          console.log(`\n cd ${answers.projectName} && npm install \n`);
        })
      })
    } else {
      console.error(requestBody.message);
    }
  })
}
