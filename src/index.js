const semver = require('semver');
const pkg = require('../package.json');
const chalk = require('chalk');
const program = require('commander');

if (!semver.satisfies(process.version, pkg.engines.node)) {
  console.error(chalk.red('✘ The generator will only work with Node v8.0.0 and up!'));
  process.exit(1);
}

program
    .version(pkg.version, '-v, --version')
    .description('run setup commands for all envs');

program
    .command('list')
    .alias('l')
    .description('展示项目当前脚手架列表')
    .action(function () {
      require('./list');
    });

// TODO 增加自定义扩展列表

// program
//     .command('add')
//     .alias('a')
//     .description('增加自定义脚手架')
//     .action(function () {
//       require('./add');
//     });

// TODO 移除自定义列表功能

// program
//     .command('remove')
//     .alias('d')
//     .description('删除已有脚手架')
//     .action(function(){
//       require('./remove');
//     });

program.parse(process.argv);

if(!program.args.length){
  require('./run')();
} else if(process.argv[2] !== 'add' && process.argv[2] !== 'list' && process.argv[2] !== 'remove' ) {

}
