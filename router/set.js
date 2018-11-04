const common = require('../common');
const log = false;

module.exports = {

  pageModule : function(pageName,controller){

    common.tell('activating pageModule : ' + controller.pageName,log);

    if(!pageName || !controller){
      return common.error('not_found-inputs');
    }
    if(typeof(controller) !== 'object'){
      return common.error('invalid-controller');
    }

    window.pageModules[pageName] = controller;
    window.pageList[pageName] = 'onboard';

    return true;

  },

  contModule : function(pageName,contName,controller){

    common.tell('activating contModule : ' + controller.contName,log);

    if(!pageName || !contName || !controller){
      return common.error('not_found-inputs');
    }
    if(typeof(controller) !== 'object'){
      return common.error('invalid-controller');
    }

    window.pageModules[pageName].contModules[contName] = controller;
    window.pageModules[pageName].contList[contName] = 'onboard';

    return true;

  },

  panelModule : function(pageName,contName,panelName,controller){

    common.tell('activating panelModule : ' + panelName,log);

    if(!pageName || !contName || !panelName || !controller){
      return common.error('not_found-inputs');
    }
    if(typeof(controller) !== 'object'){
      return common.error('invalid-controller');
    }

    window.pageModules[pageName].contModules[contName].panelModules[panelName] = controller;
    window.pageModules[pageName].contModules[contName].panelList[panelName] = 'onboard';

    return true;

  },

  baseHref : function(url){

    common.tell('activating baseHref',log);

    let location;
    let protocol = window.location.protocol;
    let host = window.location.hostname;
    let port = window.location.port;

    if(typeof(url) == 'string'){
      if(port){
        location = protocol + '//' + host + ':' + port + '/' + url;
      } else {
        location = protocol + '//' + host + '/' + url;
      }
    } else {
      if(port){
        location = protocol + '//' + host + ':' + port + '/';
      } else {
        location = protocol + '//' + host + '/';
      }
    }

    window.baseHref = location;

    return true;

  }

};
