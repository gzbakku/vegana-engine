const common = require('./common');
const log = false;

let active = {
  page:null,
  cont:null,
  panel:null
};

let built = {
  page:[],
  cont:[],
  panel:[]
};

let route = {
  page:[],
  cont:[],
  panel:[]
};

let track = {
  cont:{},
  panel:{}
};

module.exports= {

  //nav data

  active:active,
  built:built,
  route:route,
  track:track,

  //functions

  get : {

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

  },

  set : {

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

      if(typeof(url) == 'string'){
        window.baseHref = baseHref;
        return true;
      } else {
        window.baseHref = null;
        return false;
      }

    }

  },

  navigate : {

    page : {

      to : function(app){

        common.tell('*****************************************',log);

        common.tell("navigating page => toId : " + app.ref,log);

        if(app == null || app == undefined){
          return common.error('no_page_module_found');
        }
        if(app.ref == null || app.ref == undefined){
          return common.error('cannot_found_app/ref');
        }

        //get the active cont
        if(active.page == null){
          return common.error('no_page_initiated_from_app_starter');
        }

        let toId = app.ref;

        let view = require('./view');

        //cont already activated
        if(built.page.indexOf(toId) >= 0){
          common.tell('app already initiated',log);
          view.loader.page.start();       //start page loader
          route.page.push(toId);          //push to page route
          view.hide(active.page);
          active.page = toId;             //make toId cont active
          view.show(toId);                //show toId cont
          view.loader.page.stop();        //stop cont loader
          return true;
        }

        //cont has to be initiated
        if(built.cont.indexOf(toId) < 0){
          common.tell('initiating app',log);
          view.loader.page.start();
          view.hide(active.page);
          app.init();
          view.show(app.ref);
          view.loader.page.stop();
          return true;
        }

        return false;

      }

    },

    cont : {

      to : function(app){

        common.tell('*****************************************',log);

        common.tell("navigating cont",log);

        if(app == null || app == undefined){
          return common.error('no_cont_module_found');
        }
        if(app.ref == null || app.ref == undefined){
          return common.error('cannot_found_app/ref');
        }

        //get the active cont
        if(active.page == null){
          return common.error('no_cont_router_found');
        }

        let toId = active.page + app.ref;

        let view = require('./view');

        //cont already activated
        if(built.cont.indexOf(toId) >= 0){
          common.tell('app already initiated',log);
          view.loader.cont.start();           //start cont loader
          view.hide(track.cont[active.page]); //hide the active cont on the active page
          track.cont[active.page] = toId;     //update active in track cont
          route.cont.push(toId);              //push to cont route
          view.show(toId);                    //show toId cont
          view.loader.cont.stop();            //stop cont loader
          return true;
        }

        //cont has to be initiated
        if(built.cont.indexOf(toId) < 0){
          common.tell('initiating app',log);
          view.loader.cont.start();
          view.hide(track.cont[active.page]);
          track.cont[active.page] = toId;
          app.init(active.page);
          view.loader.cont.stop();
          return true;
        }

        return false;

      }

    },

    panel : {

      to : function(app){

        common.tell('*****************************************',log);

        common.tell("navigating panel",log);

        //console.log(app);

        if(app == null || app == undefined){
          return common.error('no_cont_panel_found');
        }
        if(app.ref == null || app.ref == undefined){
          return common.error('cannot_found_app/ref');
        }

        //get the active cont
        if(active.cont == null){
          return common.error('no_panel_router_found');
        }

        let toId = track.cont[active.page] + app.ref;

        common.tell("toId : " + toId,log);

        let view = require('./view');

        //cont already activated
        if(built.panel.indexOf(toId) >= 0){
          common.tell('app already initiated',log);
          view.loader.panel.start();                   //start cont loader
          route.panel.push(toId);                      //push to cont route
          let active_cont = track.cont[active.page];   //get the active cont
          view.hide(track.panel[active_cont]);         //hide the active cont
          track.panel[active_cont] = toId;             //set active panel on the cont in track object
          active.panel = toId;                         //make toId cont active
          view.show(toId);                             //show toId cont
          view.loader.panel.stop();                    //stop cont loader
          return true;
        }

        //cont has to be initiated
        if(built.panel.indexOf(toId) < 0){
          common.tell('initiating panel',log);
          view.loader.panel.start();
          let active_cont = track.cont[active.page];
          view.hide(track.panel[active_cont]);
          track.panel[active_cont] = toId;
          app.init(active_cont);
          view.loader.panel.stop();
          return true;
        }

        return false;

      }

    },

  },

  init : {

    conts : function(parent){

      common.tell('initiating conts router',log);

      if(parent == null){
        return common.error('no_parent_found : ' + parent);
      }

      //check parent
      let get = document.getElementById(parent);
      if(get == null){
        return common.error('invalid_parent : ' + parent);
      }

      //make router
      let router = document.createElement("div");
      router.id = parent + '-router-cont';
      router.className = 'cont-router';

      //make loader
      let loader = document.createElement("div");
      loader.id = parent + '-loader-cont';
      loader.innerHtml = 'loading cont ...';
      loader.style.display = 'none';
      loader.className = 'cont-loader';

      get.appendChild(router);
      get.appendChild(loader);
      return parent + '-router-cont';

    },

    panels : function(parent){

      common.tell('initiating panels router',log);

      if(parent == null){
        return common.error('no_parent_found : ' + parent);
      }

      //check parent
      let get = document.getElementById(parent);
      if(get == null){
        return common.error('invalid_parent : ' + parent);
      }

      //make element
      let router = document.createElement("div");
      router.id = parent + '-router-panel';
      router.className = 'panel-router';

      let loader = document.createElement("div");
      loader.id = parent + '-loader-panel';
      loader.innerHtml = 'loading panel ...';
      loader.style.display = 'none';
      loader.className = 'panel-loader';

      get.appendChild(router);
      get.appendChild(loader);

      return parent + '-router-panel';

    }

  },

};
