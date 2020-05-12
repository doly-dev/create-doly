const execSync = require('child_process').execSync;

function isInGitRepository(appPath) {
  try {
    execSync(`cd ${appPath} && git rev-parse --is-inside-work-tree`, { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function tryGitInit(appPath){
  let didInit = false;

  try {
    execSync('git --version', { stdio: 'ignore' });
    if (isInGitRepository(appPath)) {
      return false;
    }

    execSync(`cd ${appPath} && git init`, { stdio: 'ignore' });
    didInit = true;

    execSync(`cd ${appPath} && git add -A`, { stdio: 'ignore' });
    execSync(`cd ${appPath} && git commit -m "Initial commit from doly app"`, {
      stdio: 'ignore',
    });
    return true;
  } catch (e) {
    return false;
  }
}

function initGit(appPath) {
  return new Promise(resolve => {
    tryGitInit(appPath);
    resolve();
  });
}

module.exports = initGit;