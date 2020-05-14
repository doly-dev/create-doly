const { prompt } = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const shell = require('shelljs');
const ora = require('ora');

const gitDownload = require(`${__dirname}/utils/gitDownload`);
const gitInit = require(`${__dirname}/utils/gitInit`);
const { findNpm, isEmptyDirectory, changePackageJsonName } = require(`${__dirname}/utils/utils`);
let tplList = require(`${__dirname}/../templates`);


const templateList = Object.keys(tplList).map(sca => sca);
let optionsList = [];

optionsList = templateList.concat(optionsList);

const question = [
  {
    type: 'list',
    name: 'appName',
    message: 'Which one do you want to use the scaffold?',
    choices: optionsList,
  },
  {
    type: 'confirm',
    name: 'isCreateDirectory',
    message: 'Do you want to create a project directory?',
  }
];

const questionScaffold = [
  {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    validate(val) {
      if (val !== '') {
        return true
      }
      return 'Project name is required!'
    }
  },
];

const questionRemote = [
  {
    type: 'input',
    name: 'gitPlace',
    message: 'owner/name:',
    validate(val) {
      if (val !== '') {
        return true
      }
      return 'Project name is required!'
    }
  },
  {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    validate(val) {
      if (val !== '') {
        return true
      }
      return 'Project name is required!'
    }
  },
];

function checkDirectory(appPath, appName) {
  if (!fs.existsSync(appPath)) {
    fs.mkdirSync(appPath);
  }

  if (!isEmptyDirectory(appPath)) {
    console.log();
    console.error(chalk.red('Please empty folders for this operation or introduced to the project name.'));
    console.log();
    process.exit(0);
  }
}

async function run() {
  const { appName, isCreateDirectory } = await prompt(question);

  let gitPlace = '', project = '';

  if (appName === 'remote') {
    const remoteInfo = await prompt(questionRemote);
    gitPlace = remoteInfo.gitPlace;
    project = remoteInfo.project;

  } else {
    const diyInfo = await prompt(questionScaffold);
    gitPlace = tplList[appName]['owner/name'];
    project = diyInfo.project;
  }

  const cwd = process.cwd();
  let appPath = isCreateDirectory ? path.resolve(cwd, project) : cwd;

  checkDirectory(appPath, project);

  gitDownload(gitPlace, appPath).then((res) => {
    console.log(chalk.green(res));

    changePackageJsonName(appPath, project).then(async () => {

      await gitInit(appPath);

      const npm = findNpm();

      const spinnerInstall = ora(`${npm} installing...`);
      spinnerInstall.start();

      shell.exec(`cd ${appPath} && ${npm} install`, function () {
        console.log(chalk.green(npm + ' install end'));
        spinnerInstall.stop();

        console.log();
        console.log(`Success!`);
        console.log('Inside that directory, you can run several commands:');
        console.log();
        console.log(chalk.cyan(`  npm start`));
        console.log('    Starts the development server.');
        console.log();
        console.log(chalk.cyan(`  npm run build`));
        console.log('    Bundles the app into output files "dist" for production.');
        console.log();
      });
    })
  });
}


module.exports = run;