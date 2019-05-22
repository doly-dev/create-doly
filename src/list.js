const { listTable } = require(`${__dirname}/utils/listTable`);
let tplList = require(`${__dirname}/../templates`);

const showList = () => listTable(tplList);

module.exports = showList;