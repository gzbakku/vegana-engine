const initImport = require('./make/init');
const viewersImport = require('./make/viewers');
const inputsImport = require('./make/inputs');
const listImport = require('./make/list');
const tabsImport = require('./make/tabs/index');
const a = require('./make/a.js');
const creator = require("./make/creator");

module.exports = {

  creator:creator,

  a:a,

  //init
  init : initImport,
  //viewers
  div:viewersImport.div,
  text:viewersImport.text,
  span:viewersImport.span,
  p:viewersImport.p,
  heading:viewersImport.heading,
  image:viewersImport.image,
  addClass:viewersImport.addClass,
  removeClass:viewersImport.removeClass,
  style:viewersImport.style,

  //inputs
  select:inputsImport.select,
  input:inputsImport.input,
  textarea:inputsImport.textarea,
  button:inputsImport.button,

  //lists
  list:listImport.list,
  listItem:listImport.listItem,
  listItems:listImport.listItems,

  //custom
  element:(options)=>{
    if(!options.tag){
      return engine.common.error('not_found-tag-custom-make-engine');
    }
    return creator(options.tag,options);
  }

};
