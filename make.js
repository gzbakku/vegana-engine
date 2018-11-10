const initImport = require('./make/init');
const viewersImport = require('./make/viewers');
const inputsImport = require('./make/inputs');
const tableImport = require('./make/table');
const listImport = require('./make/list');
const customImport = require('./make/custom');
const tabsImport = require('./make/tabs');

module.exports = {

  //init
  init : initImport,
  //viewers
  div:viewersImport.div,
  card:viewersImport.card,
  text:viewersImport.text,
  image:viewersImport.image,
  tabs:viewersImport.tabs,
  dropdown:viewersImport.dropdown,
  message:viewersImport.message,
  addClass:viewersImport.addClass,
  removeClass:viewersImport.removeClass,
  tabs:tabsImport,

  //inputs
  select:inputsImport.select,
  input:inputsImport.input,
  button:inputsImport.button,
  enableButton:inputsImport.enableButton,

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
