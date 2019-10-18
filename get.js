module.exports = {

  platform:(data)=>{

    if(!data){
      //check cordova here
      if(/AppName\/[0-9\.]+$/.test(navigator.userAgent)){
        return 'cordova';
      }
      //check electron here
      if(
        typeof window !== 'undefined' &&
        typeof window.process === 'object' &&
        window.process.type === 'renderer'
      ){
        return 'electron';
      }
      if(
        typeof process !== 'undefined' &&
        typeof process.versions === 'object' &&
        !!process.versions.electron
      ){
        return 'electron';
      }
      if (
        typeof navigator === 'object' &&
        typeof navigator.userAgent === 'string' &&
        navigator.userAgent.indexOf('Electron') >= 0
      ){
        return 'electron';
      }
      data = 'platform';
    }

    if(data == 'electron'){
      if(
        typeof window !== 'undefined' &&
        typeof window.process === 'object' &&
        window.process.type === 'renderer'
      ){
        return true;
      }
      if(
        typeof process !== 'undefined' &&
        typeof process.versions === 'object' &&
        !!process.versions.electron
      ){
        return true;
      }
      if (
        typeof navigator === 'object' &&
        typeof navigator.userAgent === 'string' &&
        navigator.userAgent.indexOf('Electron') >= 0
      ){
        return true;
      }
      return false;
    }

    if(data == 'cordova'){
      return /AppName\/[0-9\.]+$/.test(navigator.userAgent);
    }

    let w = document.body.offsetWidth;
    let h = Math.max(window.innerHeight, document.body.clientHeight);
    let ans;

    if(w >= h){
      if(data == 'platform'){
        ans = 'pc';
      } else if(data == 'mobile'){
        ans = false;
      } else if(data == 'pc'){
        ans = true;
      }
    }

    if(w < h){
      if(data == 'platform'){
        ans = 'mobile';
      } else if(data == 'mobile'){
        ans = true;
      } else if(data == 'pc'){
        ans = false;
      }
    }

    return ans;

  },

  pageModule : function(pageName){

    if(window.pageModules[pageName]){
      return window.pageModules[pageName];
    } else {
      return null;
    }

  },

  contName : function(contId){

    if(!contId || typeof(contId) !== 'string'){
      return engine.common.error('invalid/not_found-contId');
    }

    if(!contId.match('-')){
      return engine.common.error('invalid-contId');
    }

    let name = contId.split('-')[3];
    return name + 'Cont';

  },

  contModule : function(pageName,contName){

    if(!pageName || typeof(pageName) !== 'string'){
      return engine.common.error('invalid/not_found-pageName');
    }
    if(!contName || typeof(contName) !== 'string'){
      return engine.common.error('invalid/not_found-contName');
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
      return engine.common.error('invalid/not_found-pageName');
    }
    if(!contName || typeof(contName) !== 'string'){
      return engine.common.error('invalid/not_found-contName');
    }
    if(!panelName || typeof(panelName) !== 'string'){
      return engine.common.error('invalid/not_found-panelName');
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
      return engine.common.error('not_found-td_id');
    }
    if(!id.match('-') || !id.match('row')){
      return engine.common.error('invalid-td_id');
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
