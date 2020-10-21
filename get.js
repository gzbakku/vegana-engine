module.exports = {

  os:()=>{
    let ua = navigator.userAgent.toLowerCase();
    if(!ua){return 'unknown';}
    if(ua && /ipad|iphone|ipod/.test(ua)){return 'ios';}
    if(ua && /android/.test(ua)){return 'android';}
    if(ua && /windows/.test(ua)){return 'windows';}
    if(ua && /mac/.test(ua)){return 'mac';}
    if(ua && /linux/.test(ua)){return 'linux';}
    return 'unknown';
  },

  host:()=>{
    return window.location.hostname;
  },

  element:(id)=>{
    return document.getElementById(id);
  },

  platform:(data)=>{

    if(!data){
      if(window.hasOwnProperty('is_cordova')){
        return 'cordova';
      }
      if(window.hasOwnProperty('is_electron')){
        return 'electron';
      }
      data = 'platform';
    }

    if(data == 'electron'){
      if(window.hasOwnProperty('is_electron')){
        return true;
      } else {
        return false;
      }
    }

    if(data == 'cordova'){
      if(window.hasOwnProperty('is_cordova')){
        return true;
      } else {
        return false;
      }
    }

    // let w = document.body.offsetWidth;
    // let h = Math.max(window.innerHeight, document.body.clientHeight);

    let w = window.innerWidth;
    let h = window.innerHeight;
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
