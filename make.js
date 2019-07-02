const initImport = require('./make/init');
const viewersImport = require('./make/viewers');
const inputsImport = require('./make/inputs');
const listImport = require('./make/list');
const customImport = require('./make/custom');
const tabsImport = require('./make/tabs/index');
const a = require('./make/a.js');

module.exports = {

  a:a,

  //init
  init : initImport,
  //viewers
  div:viewersImport.div,
  card:viewersImport.card,
  text:viewersImport.text,
  span:viewersImport.span,
  p:viewersImport.p,
  heading:viewersImport.heading,
  image:viewersImport.image,
  addClass:viewersImport.addClass,
  removeClass:viewersImport.removeClass,
  style:viewersImport.style,
  message:viewersImport.message,
  tabs:tabsImport,

  //inputs
  select:inputsImport.select,
  input:inputsImport.input,
  upload:inputsImport.upload,
  textarea:inputsImport.textarea,
  checkBox:inputsImport.checkBox,
  checkbox:inputsImport.checkBox,
  button:inputsImport.button,
  enableButton:inputsImport.enableButton,

  //lists
  list:listImport.list,
  listItem:listImport.listItem,
  listItems:listImport.listItems,

  //custom
  element:customImport.element

};
