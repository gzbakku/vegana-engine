const common = require('./common');

module.exports = {

  pageName : function(pageId){

    if(!pageId || typeof(pageId) !== 'string'){
      return common.error('invalid/not_found-pageId');
    }

    if(!pageId.match('-')){
      return common.error('invalid-pageId');
    }

    let name = pageId.split('-')[1];
    return name + 'Page';

  },

  contName : function(contId){

    if(!contId || typeof(contId) !== 'string'){
      return common.error('invalid/not_found-contId');
    }

    if(!contId.match('-')){
      return common.error('invalid-contId');
    }

    let name = contId.split('-')[3];
    return name + 'Cont';

  },

  contModule : function(pageName,contName){

    if(!pageName || typeof(pageName) !== 'string'){
      return common.error('invalid/not_found-pageName');
    }
    if(!contName || typeof(contName) !== 'string'){
      return common.error('invalid/not_found-contName');
    }

    let pool = window.pageModules[pageName].contModules;

    if(pool[contName]){
      return pool[contName];
    } else {
      return false;
    }

  }

};
