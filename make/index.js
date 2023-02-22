const initImport = require('./init');
const viewersImport = require('./viewers');
const inputsImport = require('./inputs');
const listImport = require('./list');
const tabsImport = require('./tabs/index');
const a = require('./a.js');
const creator = require("./creator");
const platform = require("./platform");

module.exports = {

  platform:platform,

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
  element:(options,parent_tag)=>{
    if(!options.tag){
      return engine.common.error('not_found-tag-custom-make-engine');
    }
    return creator(options.tag,options,parent_tag);
  },

  integrate_objects:integrate_objects,

  styles:require("./styles"),

  raw_css:(media_rule)=>{
    if(is_static){
      return engine.static.add.css(media_rule);
    }
    let sheet = window.document.styleSheets[0];
    sheet.insertRule(media_rule,sheet.cssRules.length);
  }

};

function integrate_objects(one,two,checked){
  // console.log({one:one});
  // console.log({two:two});
  if((one instanceof Array) && (two instanceof Array)){
    one = one.concat(two);
    return one;
  }
  if(!(one instanceof Object) && !(two instanceof Object)){
      return {};
  }
  if(!(one instanceof Object) && (two instanceof Object)){
      return two;
  }
  if((one instanceof Object) && !(two instanceof Object)){
      return one;
  }
  for(let key in two){
    if(checked){
      if(!one.hasOwnProperty(key)){one[key] = two[key];}
    } else {
      one[key] = two[key];
    }
  }
  return one;
}
