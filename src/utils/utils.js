const fs = require('fs-extra');
const which = require('which');
const changeJsonfile = require('./changeJsonfile');


function findNpm() {
  const npms = ['npm', 'tnpm', 'cnpm'];
  for (let i = 0; i < npms.length; i++) {
    try {
      which.sync(npms[i]);
      return npms[i];
    } catch (e) {

    }
  }
  throw new Error('Please install npm');
}

function isDirectory(directoryName) {
  const stat = fs.statSync(directoryName);
  return stat.isDirectory();
}

function isEmptyDirectory(directoryName) {
  if (!isDirectory(directoryName)) {
    console.error(`Folder does not exist.`);
    return;
  }

  const dirList = fs.readdirSync(directoryName);

  if (dirList.length === 0) {
    return true;
  } else if (dirList.length === 1) {
    if (dirList[0].toLowerCase() === '.ds_store' || dirList[0].toLowerCase() === '.git') {
      return true;
    } else {
      return false;
    }
  } else if (dirList.length === 2) {
    const tmpLowerCaseDirList = dirList.map(item => item.toLowerCase());
    if(tmpLowerCaseDirList.indexOf('.ds_store') > -1 && tmpLowerCaseDirList.indexOf('.git') > -1){
      return true;
    }else{
      return false;
    }
  } else {
    return false;
  }
}

function changePackageJsonName(appPath, appName) {
  return new Promise(resolve => {
    const pkgFile = `${appPath}/package.json`;
    if (fs.existsSync(pkgFile) && appName) {
      changeJsonfile(pkgFile, {
        name: appName
      });
    }
    resolve();
  });
}

module.exports = { findNpm, isDirectory, isEmptyDirectory, changePackageJsonName };