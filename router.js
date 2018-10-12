const common = require("./common");
const log = false;

let active = {
  page  : null,
  cont  : null,
  panel : null
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

module.exports= {

  //nav data

  active:active,
  built:built,
  route:route,

  //functions

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
          view.loader.page.start();       //start cont loader
          route.cont.push(toId);          //push to cont route
          view.hide(active.page);         //hide the active cont
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
          view.hide(active.cont);
          view.hide(active.panel);
          view.hide(active.page + '-router-cont');
          view.hide(active.cont + '-router-panel');
          view.hide(active.page + '-loader-cont');
          view.hide(active.cont + '-loader-panel');
          app.init();
          //view.show(app.ref);
          view.loader.page.stop();
          return true;
        }

        return false;

      },

      back: function(){

        common.tell("navigating to previous page",log);

        if(
          route.page.length == 0 ||
          route.page.length == undefined ||
          route.page.length == null
        ){
          return common.error('corrupted_built_page_record');
        }

        if(route.page.length == 1){
          return true;
        }

        if(route.page.length > 1){
          view.loader.start();
          let size = route.page.length;
          let last = route.page[size - 1];
          let secondLast = route.page[size - 2];
          view.hide(last);
          view.show(secondLast);
          route.page.pop();
          view.loader.stop();
        }

        return true;

      }

    },

    cont : {

      to : function(app){

        common.tell('*****************************************',log);

        common.tell("navigating cont => toId : " + app.ref,log);

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
          view.loader.cont.start();       //start cont loader
          route.cont.push(toId);          //push to cont route
          view.hide(active.cont);         //hide the active cont
          active.cont = toId;             //make toId cont active
          view.show(toId);                //show toId cont
          view.loader.cont.stop();        //stop cont loader
          return true;
        }

        //cont has to be initiated
        if(built.cont.indexOf(toId) < 0){
          common.tell('initiating app',log);
          view.loader.cont.start();
          view.hide(active.cont);
          app.init(active.page);
          view.loader.cont.stop();
          return true;
        }

        return false;

      },

      back: function(){

        common.tell("navigating to previous cont",log);

        if(
          route.cont.length == 0 ||
          route.cont.length == undefined ||
          route.cont.length == null
        ){
          return common.error('corrupted_built_page_record');
        }

        if(route.cont.length == 1){
          return true;
        }

        if(route.cont.length > 1){
          view.loader.start();
          let size = route.cont.length;
          let last = route.cont[size - 1];
          let secondLast = route.cont[size - 2];
          view.hide(last);
          view.show(secondLast);
          route.cont.pop();
          view.loader.stop();
        }

        return true;

      }

    },

    panel : {

      to : function(app){

        common.tell('*****************************************',log);

        common.tell("navigating panel => toId : " + app.ref,log);

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

        let toId = active.cont + app.ref;

        let view = require('./view');

        //cont already activated
        if(built.panel.indexOf(toId) >= 0){
          common.tell('app already initiated',log);
          view.loader.panel.start();       //start cont loader
          route.panel.push(toId);          //push to cont route
          view.hide(active.panel);         //hide the active cont
          active.panel = toId;             //make toId cont active
          view.show(toId);                //show toId cont
          view.loader.panel.stop();        //stop cont loader
          return true;
        }

        //cont has to be initiated
        if(built.panel.indexOf(toId) < 0){
          common.tell('initiating panel',log);
          view.loader.panel.start();
          view.hide(active.panel);
          app.init(active.cont);
          view.loader.panel.stop();
          return true;
        }

        return false;

      },

      back: function(){

        common.tell("navigating to previous panel",log);

        if(
          route.panel.length == 0 ||
          route.panel.length == undefined ||
          route.panel.length == null
        ){
          return common.error('corrupted_built_page_record');
        }

        if(route.panel.length == 1){
          return true;
        }

        if(route.panel.length > 1){
          view.loader.start();
          let size = route.panel.length;
          let last = route.panel[size - 1];
          let secondLast = route.panel[size - 2];
          view.hide(last);
          view.show(secondLast);
          route.panel.pop();
          view.loader.stop();
        }

        return true;

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

      //make element
      let router = document.createElement("div");
      router.id = parent + '-router-cont';

      //make element
      let loader = document.createElement("div");
      loader.id = parent + '-loader-cont';
      loader.innerHtml = 'loading cont ...';
      loader.style.display = 'none';
      loader.className = 'panel-loader';

      get.appendChild(router);
      get.appendChild(loader);
      return true;

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

      let loader = document.createElement("div");
      loader.id = parent + '-loader-panel';
      loader.innerHtml = 'loading panel ...';
      loader.style.display = 'none';
      loader.className = 'panel-loader';

      get.appendChild(router);
      get.appendChild(loader);

      return true;

    }

  },

};
