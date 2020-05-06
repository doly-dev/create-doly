const fs = require('fs-extra');
const which = require('which');
const shell = require('shelljs');

function findGit() {
  const git = 'git';
  try {
    which.sync(git);
    return git;
  } catch (e) {

  }
  throw new Error('Please install git');
}

function hasGitFile(directoryName) {
  const dirList = fs.readdirSync(directoryName);
  const lowerCaseDirList = dirList.map(item => item.toLowerCase());
  return lowerCaseDirList.indexOf('.git') > -1;
}

function initGit(appPath) {
  return new Promise(resolve => {
    if (!hasGitFile(appPath)) {
      const git = findGit();
      shell.exec(`cd ${appPath} && ${git} init`, resolve);
    } else {
      resolve();
    }
  });
}

module.exports = initGit;