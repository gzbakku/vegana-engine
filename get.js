const common = require('./common');

module.exports = {

  pageModule : function(pageName){

    if(window.pageModules[pageName]){
      return window.pageModules[pageName];
    } else {
      return null;
    }

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

  },

  panelModule : function(pageName,contName,panelName){

    if(!pageName || typeof(pageName) !== 'string'){
      return common.error('invalid/not_found-pageName');
    }
    if(!contName || typeof(contName) !== 'string'){
      return common.error('invalid/not_found-contName');
    }
    if(!panelName || typeof(panelName) !== 'string'){
      return common.error('invalid/not_found-panelName');
    }

    let pool = window.pageModules[pageName].contModules[contName].panelModules[panelName];

    if(pool){
      return pool;
    } else {
      return false;
    }

  },

  rowByTdId : function(id){

    if(id==null){
      return common.error('not_found-td_id');
    }
    if(!id.match('-') || !id.match('row')){
      return common.error('invalid-td_id');
    }
    let array = id.split('-');
    let rowIndex = array.indexOf('row') + 2;
    let rowId = null;
    for(var i=0;i<rowIndex;i++){
      if(rowId == null){
        rowId = array[i];
      } else {
        rowId = rowId + '-' + array[i];
      }
    }
    return rowId;
  },

  divIdByEvent : function(e){

    if(navigator.userAgent.indexOf("Chrome") != -1){
      return e.path[0].id;
    }
    if(navigator.userAgent.indexOf("Firefox") != -1){
      return e.target.id;
    }

    return false;

  },

  body : {

    width : function(){
      return document.body.offsetWidth;
    },

    height : function(){
      return document.body.offsetHeight;
    }

  },

};
