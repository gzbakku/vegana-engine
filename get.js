module.exports = {

  url:()=>{return document.URL},

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

  elementPosition:(id)=>{
    let e = engine.get.element(id);
    if(!e){return false;}
    return e.getBoundingClientRect();
  },

  platform:(data)=>{

    if(!data){
      if(window.is_cordova){
        return 'cordova';
      }
      if(window.is_electron){
        return 'electron';
      }
      if(window.is_static){
        return 'static';
      }
      data = 'platform';
    }

    if(data == 'static'){
      if(window.is_static){
        return true;
      } else {
        return false;
      }
    }

    if(data == 'electron'){
      if(window.is_electron){
        return true;
      } else {
        return false;
      }
    }

    if(data == 'cordova'){
      if(window.is_cordova){
        return true;
      } else {
        return false;
      }
    }

    if(data == 'web'){
      if(
        !window.is_static &&
        !window.is_electron &&
        !window.is_cordova &&
        !window.is_static_web &&
        !window.is_native
      ){
        return true;
      } else {
        return false;
      }
    }

    if(data == 'native'){
      if(
        window.is_cordova ||
        window.is_native ||
        window.is_electron
      ){
        return true;
      } else {
        return false;
      }
    }

    // let w = window.innerWidth,h = window.innerHeight,ans;
    let w = engine.get.body.width(),h = engine.get.body.height(),ans;

    if(data === "mobile"){
      if(w < 500 || h < 500){
        return true;
      } else {
        return false;
      }
    }
    if(data === "tablet"){
      if(w <= 1080 || h <= 1080){
        return true;
      } else {
        return false;
      }
    }
    if(data === "pc"){
      if(w > 1080 || h > 1080){
        return true;
      } else {
        return false;
      }
    }

    if(data == "platform" || data == "device"){
      // console.log({w:w,h:h});
      if(w <= 500 || h <= 500){ans = "mobile";} else
      if(w <= 1080 || h <= 1080){ans = "tablet";} else
      if(w > 1080 || h > 1080){ans = "pc";}
    }

    if(data === 'size'){
      return {
        mobile:{smallest_max:501,orientation:'portrait'},
        tablet:{biggest_max:1080,both_min:500,orientation:'landscape'},
        pc:{some_min:1081,orientation:'landscape'}
      };
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
      //old document.body.offsetWidth;
      const width = window.innerWidth || document.documentElement.clientWidth || 
      document.body.clientWidth;
      return width;
    },

    height : function(){
      //old document.body.offsetHeight;
      const height = window.innerHeight|| document.documentElement.clientHeight|| 
      document.body.clientHeight;
      return height;
    }

  },

};
