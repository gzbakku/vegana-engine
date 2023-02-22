

module.exports = {

  pageModule : function(pageName,controller){

    if(!pageName || !controller){
      return new engine.common.Error('not_found-inputs');
    }
    if(typeof(controller) !== 'object'){
      return new engine.common.Error('invalid-controller');
    }

    window.pageModules[pageName] = controller;
    window.pageList[pageName] = 'onboard';

    return true;

  },

  contModule : function(pageName,contName,controller){

    if(!pageName || !contName || !controller){
      return new engine.common.Error('not_found-inputs');
    }
    if(typeof(controller) !== 'object'){
      return new engine.common.Error('invalid-controller');
    }

    window.pageModules[pageName].contModules[contName] = controller;
    window.pageModules[pageName].contList[contName] = 'onboard';

    return true;

  },

  panelModule : function(pageName,contName,panelName,controller){

    if(!pageName || !contName || !panelName || !controller){
      return new engine.common.Error('not_found-inputs');
    }
    if(typeof(controller) !== 'object'){
      return new engine.common.Error('invalid-controller');
    }

    window.pageModules[pageName].contModules[contName].panelModules[panelName] = controller;
    window.pageModules[pageName].contModules[contName].panelList[panelName] = 'onboard';

    return true;

  },

  baseHref : function(url,only_url){

    if(only_url){
      window.baseHref = url;
      return true;
    }

    let location;
    let protocol = window.location.protocol;
    let host = window.location.hostname;
    let port = window.location.port;

    let hold = '';
    if(protocol && protocol !== 'file:'){
      hold += protocol + '//';
    }
    if(host){
      hold += host;
    }
    if(port){
      hold += ':' + port;
    }
    if(url && url !== '/'){
      hold += '/' + url;
    }

    window.baseHref = hold;

    return true;

  }

};
