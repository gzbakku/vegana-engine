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

    let w = window.innerWidth,h = window.innerHeight,ans;

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

    if(!pageName){
      return engine.common.error('not_found-pageModule-pageName');
    }

    if(window.pageModules[pageName]){
      return window.pageModules[pageName];
    } else {
      return null;
    }

  },

  contModule : function(pageName,contName){

    if(!pageName || !contName){
      return engine.common.error('not_found-panelModule-pageName/contName');
    }

    let pool = window.pageModules[pageName].contModules;

    if(pool[contName]){
      return pool[contName];
    } else {
      return false;
    }

  },

  panelModule : function(pageName,contName,panelName){

    if(!pageName || !contName || !panelName){
      return engine.common.error('not_found-panelModule-pageName/contName/panelName');
    }

    let pool = window.pageModules[pageName].contModules[contName].panelModules[panelName];

    if(pool){
      return pool;
    } else {
      return false;
    }

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
