/*
* @Author: Just be free
* @Date:   2020-05-26 13:59:49
* @Last Modified by:   Just be free
* @Last Modified time: 2020-05-26 14:25:40
* @E-mail: justbefree@126.com
*/
const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
module.exports = {
  hi() {
    console.log("===============================================================");
    console.log("|                                                             |");
    console.log("|             " + chalk.white("欢迎使用vue2-cli自动生成Vue项目工具") + "             |");
    console.log("|                                                             |");
    console.log("===============================================================");
    console.log();
    console.log(chalk.yellow.bold("If you have any questions,") + chalk.yellow.underline.bold(" don't be hesitate"));
    console.log();
    qrcode.generate('https://u.wechat.com/EICPGRBBQ92j-TtqqS-wN9Q');
  }
};
