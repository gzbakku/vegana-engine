const common = require('../common');
const log = false;

module.exports = {

  pageModule : function(pageName){

    common.tell('fetching pageModule',log);

    if(!pageName){
      return common.error('not_found-inputs');
    }
    if(!window.pageModules[pageName]){
      return common.error('not_found-pageModule');
    } else {
      return window.pageModules[pageName];
    }

  },

  contModule : function(pageName,contName){

    common.tell('fetching contModule',log);

    if(!pageName || !contName){
      return common.error('not_found-inputs');
    }
    if(!window.pageModules[pageName].contModules[contName]){
      return common.error('not_found-pageModule');
    } else {
      return window.pageModules[pageName].contModules[contName];
    }

  },

  panelModule : function(pageName,contName,panelName){

    common.tell('fetching panelModule',log);

    if(!pageName || !contName || !panelName){
      return common.error('not_found-inputs');
    }
    if(!window.pageModules[pageName].contModules[contName].panelModules[panelName]){
      return common.error('not_found-pageModule');
    } else {
      return window.pageModules[pageName].contModules[contName].panelModules[panelName];
    }

  },

  baseHref : function(){
    return window.baseHref;
  }

}
