/*
* @Author: Just be free
* @Date:   2020-05-26 11:57:27
* @Last Modified by:   Just be free
* @Last Modified time: 2021-03-05 11:33:50
* @E-mail: justbefree@126.com
*/

const request = require('request');
const chalk = require('chalk');
const ora = require('ora');
module.exports = () => {
  let spinner = ora('\n ' + chalk.yellow('正在查询模版列表，请等待...'));
  spinner.start();
  request({
    url: 'https://api.github.com/users/justbefree-org/repos',
    headers: {
      'User-Agent': 'vue2-pro-cli'
    }
  }, (err, res, body) => {
    spinner.stop();
    if (err) {
      console.log(chalk.red('查询模版列表失败'));
      console.log(chalk.red(err));
      console.log(chalk.yellow('你也可以手动下载模板：'));
      console.log(chalk.green(`
        https://github.com/justbefree-org/vue2-js,
        https://github.com/justbefree-org/vue2-ts(most recommended)
      `));
      process.exit();
    }
    const requestBody = JSON.parse(body);
    if (Array.isArray(requestBody)) {
      console.log();
      console.log(chalk.green('可用的模版列表：'));
      console.log();
      requestBody.forEach(repo => {
        console.log(
        '  ' + chalk.yellow('★') +
        '  ' + chalk.white(repo.name) +
        ' - ' + repo.description)
      });
    } else {
      console.error(requestBody.message);
    }
  })
}
