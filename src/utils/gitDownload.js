const fs = require('fs-extra');
const chalk = require('chalk');
const download = require('download-git-repo');
const ora = require('ora');

// only support github

// TODO support gitlab

function gitDownLoad(gitPlace, path = '' ) {
  return new Promise((reslove) => {
    if (gitPlace) {
      console.log(chalk.red(''));
    }

    // const WORK_DIR = process.cwd();

    const spinner = ora('Downloading template...');

    spinner.start();

    download(`${gitPlace}`, path, (err) => {
      if (err) {
        console.log(chalk.red(err));
        process.exit();
      }
      spinner.stop();
      const msg = 'DownLoad Success ';
      reslove(msg);
    });
  });
}


module.exports = gitDownLoad;