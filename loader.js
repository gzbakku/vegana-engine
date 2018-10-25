const common = require('./common');
const log = false;
const httpMarker = 'http://';

module.exports = {

  load : {

    page : function(pageName){

      return new Promise((resolve,reject)=>{

        common.tell('loading page module',log);

        let error;

        if(!pageName || typeof(pageName) !== 'string'){
          error = 'invalid/not_found-pageName';
          reject(error);
        }
        if(window.pageList[pageName] == 'onboard'){
          error = 'pageModule-already-loaded';
          reject(error);
        }

        let host = window.location.hostname;
        let port = window.location.port;

        let base;
        if(port){
          base = httpMarker + host + ':' + port;
        } else {
          base = httpMarker + host;
        }

        let path;

        if(baseHref == null){
          path = '/js/pages/' + pageName + '/page.js';
        } else {
          path = '/' + baseHref + '/js/pages/' + pageName + '/page.js';
        }

        let location = base + path;

        let parent = document.getElementsByTagName("head")[0];

        let scp = document.createElement('script');
        scp.type = "text/javascript";
        scp.src = location;

        scp.onload  = function(){
          common.tell('page_loaded',log);
          resolve(true);
        };

        scp.onreadystatechange   = function(){
          common.tell('page_loaded',log);
          resolve(true);
        };

        parent.appendChild(scp);
        window.pageList[pageName] = 'onboard';

      });

    },

    cont : function(pageName,contName){

      return new Promise((resolve,reject)=>{

        let error;

        common.tell('loading cont module',log);


        if(!pageName || typeof(pageName) !== 'string'){
          error = 'invalid/not_found-pageName';
          reject(error);
        }
        if(!contName || typeof(contName) !== 'string'){
          error = 'invalid/not_found-ContName';
          reject(error);
        }
        if(window.pageModules[pageName].contList[contName] == 'onboard'){
          error = 'cont-already-loaded';
          reject(error);
        }

        let host = window.location.hostname;
        let port = window.location.port;

        let base;
        if(port){
          base = httpMarker + host + ':' + port;
        } else {
          base = httpMarker + host;
        }

        let path;

        if(baseHref == null){
          path = '/js/pages/' + pageName + '/conts/' + contName + '/cont.js';
        } else {
          path = '/' + baseHref + '/js/pages/' + pageName + '/conts/' + contName + '/cont.js';
        }

        let location = base + path;

        let parent = document.getElementsByTagName("head")[0];

        let scp = document.createElement('script');
        scp.type = "text/javascript";
        scp.src = location;

        scp.onload  = function(){
          common.tell('cont_loaded',log);
          resolve(true);
        };

        scp.onreadystatechange   = function(){
          common.tell('cont_loaded',log);
          resolve(true);
        };

        parent.appendChild(scp);

      });

    },

    panel : function(pageName,contName,panelName){

      return new Promise((resolve,reject)=>{

        let error;

        common.tell('loading panel module',log);

        if(!pageName || typeof(pageName) !== 'string'){
          error = 'invalid/not_found-pageName';
          reject(error);
        }
        if(!contName || typeof(contName) !== 'string'){
          error = 'invalid/not_found-ContName';
          reject(error);
        }
        if(!panelName || typeof(panelName) !== 'string'){
          error = 'invalid/not_found-panelName';
          reject(error);
        }

        let host = window.location.hostname;
        let port = window.location.port;

        let base;
        if(port){
          base = httpMarker + host + ':' + port;
        } else {
          base = httpMarker + host;
        }

        let path;

        if(baseHref == null){
          path = '/js/pages/' + pageName + '/conts/' + contName + '/panels/' + panelName + '/panel.js';
        } else {
          path = '/' + baseHref + '/js/pages/' + pageName + '/conts/' + contName + '/panels/' + panelName + '/panel.js';
        }

        let location = base + path;

        let parent = document.getElementsByTagName("head")[0];

        let scp = document.createElement('script');
        scp.type = "text/javascript";
        scp.src = location;

        scp.onload  = function(){
          common.tell('panel_loaded',log);
          resolve(true);
        };

        scp.onreadystatechange   = function(){
          common.tell('panel_loaded',log);
          resolve(true);
        };

        parent.appendChild(scp);

      });

    }

  },

  css : function(fileName){

    return new Promise((resolve,reject)=>{

      let error;

      common.tell('loading page module',log);

      if(!fileName || typeof(fileName) !== 'string'){
        error = 'invalid/not_found-css_file_name';
        reject(error);
      }

      let host = window.location.hostname;
      let port = window.location.port;

      let location;

      if(baseHref !== null){
        location = httpMarker + host + ':' + port + '/css/' + fileName + '.css';
      } else {
        location = httpMarker + host + ':' + port + '/' + baseHref + '/css/' + fileName + '.css';
      }

      let parent = document.getElementsByTagName("head")[0];

      let css = document.createElement('link');
      css.rel  = 'stylesheet';
      css.type = 'text/css';
      css.href = location;
      css.media = 'all';
      parent.appendChild(link);

      resolve(true);

    });

  }

};
