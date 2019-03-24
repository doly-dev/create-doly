const { listTable } = require(`${__dirname}/utils/listTable`);
let tplList = require(`${__dirname}/../templates`);

module.exports = listTable(tplList);