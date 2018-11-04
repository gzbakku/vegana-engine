const initImport = require('./make/init');
const viewersImport = require('./make/viewers');
const inputsImport = require('./make/inputs');
const tableImport = require('./make/table');
const listImport = require('./make/list');
const customImport = require('./make/custom');

module.exports = {

  //init
  init : initImport,

  //viewers
  div:viewersImport.div,
  card:viewersImport.card,
  text:viewersImport.text,
  image:viewersImport.image,
  dropdown:viewersImport.dropdown,

  //inputs
  select:inputsImport.select,
  input:inputsImport.input,
  button:inputsImport.button,

  //table
  table:tableImport.table,
  tableRow:tableImport.tableRow,
  tableRows:tableImport.tableRows,

  //lists
  list:listImport.list,
  listItem:listImport.listItem,
  listItems:listImport.listItems,

  //custom
  element:customImport.element

};
