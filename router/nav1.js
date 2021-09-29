const common = require('../common');
const log = false;

function toWorker(app,type,reset,routerId,data){

  common.tell("navigation initiated",log);
  common.tell("reinitiate module : " + reset,log);

  //other modules
  let router = require('../router');
  let view = require('../view');

  common.tell("router / view localised",log);

  //catalogs
  let active = router.active;
  let built = router.built;
  let route = router.route;
  let track = router.track;
  let mods = router.mods;

  common.tell("router objects localised",log);

  //check if there is a initiated page heres
  if(type == 'page'){
    if(active[type] == null){
      return common.error('no_page_initiated_from_app_starter');
    }
  }

  common.tell("base page intiation validated",log);

  //security checks
  if(app == null || app == undefined){
    return common.error('not_found-app');
  }
  if(app.ref == null || app.ref == undefined){
    return common.error('invalid_app');
  }
  if(type == 'comp'){
    if(!routerId){
      return common.error('not_found-routerId');
    }
  }

  common.tell("module checks completed",log);

  /*
    calculate module div dom element id by combining module refenrce with router id
  */

  let toId;
  if(type === "page"){toId = app.ref;} else
  if(type === "cont"){
    if(!engine.router.routers.conts[engine.router.active.page]){
      return common.error("no-cont_router-initiated_on_page");
    }
    toId = engine.router.routers.conts[engine.router.active.page] + app.ref;
  } else if(type === "panel"){
    if(!engine.router.routers.conts[engine.router.active.page])
    {return common.error("no-panel_router-initiated_on_panel");}
    if(!engine.router.routers.panels[engine.router.active.page][engine.router.active.cont])
    {return common.error("no-panel_router-initiated_on_panel");}
    toId = engine.router.routers.panels[engine.router.active.page][engine.router.active.cont] + app.ref;
  } else if(type == 'comp'){
    toId = routerId + app.ref;
  }

  common.tell("module ref built",log);

  if(reset == true){
    if(document.getElementById(toId)){
      document.getElementById(toId).remove();
      while(built[type].indexOf(toId) >= 0){
        let toIdPos = built[type].indexOf(toId);
        if(toIdPos >= 0){
          built[type].splice(toIdPos, 1);
        }
      }
    }
  }

  common.tell("pre-built module removed",log);

  //remove previous module
  if(type == 'page'){
    view.hide(active.page);
  } else if(type == 'cont'){
    let page = active.page + '-router-cont';
    let cont = track.cont[page];
    view.hide(cont);
  } else if(type == 'panel'){
    let page = active.page + '-router-cont';
    let cont = track.cont[page] + '-router-panel';
    let panel = track.panel[cont];
    view.hide(panel);
  } else if(type == 'comp'){
    view.hide(track['comp'][routerId]);
  }

  common.tell("active module hidden",log);

  //update track catalog with toId
  if(type == 'page'){
    active[type] = toId;
  } else if(type == 'cont'){
    let page = active.page + '-router-cont';
    track.cont[page] = toId;
    active[type] = toId;
  } else if(type == 'panel'){
    let page = active.page + '-router-cont';
    let cont = track.cont[page] + '-router-panel';
    track.panel[cont] = toId;
    active[type] = toId;
  } else if(type == 'comp'){
    track.comp[routerId] = toId;
  }

  common.tell("to-module cataloged",log);

  //navigate here
  let url;
  if(type == 'page'){
    url = exp.url.add.page(toId);
    route.push({type:type,id:toId,url:url,mod:app});
  } else if(type == 'cont'){
    url = exp.url.add.cont(toId);
    route.push({type:type,id:toId,url:url,mod:app});
  } else if(type == 'panel'){
    url = exp.url.add.panel(toId);
    route.push({type:type,id:toId,url:url,mod:app});
  }

  if(app.trackers){
    let trackers = app.trackers;
    if(trackers.title){
      engine.set.pageTitle(trackers.title);
    }
    if(trackers.meta){
      for(var i in trackers.meta){
        engine.meta.update(trackers.meta[i]);
      }
    }
    if(trackers.function){
      if(trackers.function_data){
        trackers.function(trackers.function_data);
      } else {
        trackers.function();
      }
    }
  }//run tracker functions

  //already built the app
  if(built[type].indexOf(toId) >= 0 && document.getElementById(toId)){
    view.show(toId);
    common.tell("to-module view activated",log);
  }

  //app not built yet
  if(built[type].indexOf(toId) < 0 || !document.getElementById(toId)){

    //initiate app
    if(type == 'page'){
      app.init(data);
    } else if(type == 'cont'){
      let router = engine.router.routers.conts[engine.router.active.page];
      app.init(router,data);
    } else if(type == 'panel'){
      if(!engine.router.routers.panels[engine.router.active.page]){
        return common.error("not_found-cont_router");
      }
      if(!engine.router.routers.panels[engine.router.active.page][engine.router.active.cont]){
        return common.error("not_found-panel_router");
      }
      let router = engine.router.routers.panels[engine.router.active.page][engine.router.active.cont];
      app.init(router,data);
    } else if(type == 'comp'){
      app.init(routerId,data);
    }

    if(type == 'comp'){
      built[type].push(toId);
    }

    common.tell("to-module built",log);

  }//app not built

  common.tell("to-module router tags pushed",log);

  return true;

}



let exp = {

  url:{
    add : {
      page:function(id){
        let page;
        if(id){page = id;} else {
          page = engine.router.active.page;
        }
        let url = "/" + clean_page(page);
        let platform = engine.get.platform();
        if(platform == "cordova" || platform == "electron"){
          return url;
        }
        if(window.hasOwnProperty('vegana_do_not_route_with_url')){
          if(window.vegana_do_not_route_with_url === true){
            return url;
          }
        }
        window.history.pushState("object or string", null, url);
        return url;
      },
      cont:function(id){
        let page = engine.router.active.page,cont;
        if(id){cont = id;} else {
          cont = engine.router.track.cont[page];
        }
        let url = "/" + clean_page(page) + "/" + clean_cont(cont);
        let platform = engine.get.platform();
        if(platform == "cordova" || platform == "electron"){
          return url;
        }
        if(window.hasOwnProperty('vegana_do_not_route_with_url')){
          if(window.vegana_do_not_route_with_url === true){
            return url;
          }
        }
        window.history.pushState("object or string", null, url);
        return url;
      },
      panel:function(id){
        let page = engine.router.active.page;
        let cont = engine.router.track.cont[page + '-router-cont'];
        let panel;
        if(id){panel = id;} else {
          panel = engine.router.track.panel[cont];
        }
        let url = "/" + clean_page(page) + "/" + clean_cont(cont) + "/" + clean_panel(panel);
        let platform = engine.get.platform();
        if(platform == "cordova" || platform == "electron"){
          return url;
        }
        if(window.hasOwnProperty('vegana_do_not_route_with_url')){
          if(window.vegana_do_not_route_with_url === true){
            return url;
          }
        }
        window.history.pushState("object or string", null, url);
        return url;
      }
    }
  },

  to : {
    page : function(app,data){
      if(engine.router.active.page == app.ref){
        return true;
      }
      return toWorker(app,'page',false,null,data);
    },
    cont : function(app,data){
      let parse = engine.router.active.page + '-router-cont' + app.ref;
      if(engine.router.active.cont == parse){
        return true;
      }
      return toWorker(app,'cont',false,null,data);
    },
    panel : function(app,data){
      let parse = engine.router.active.cont + '-router-panel' + app.ref;
      if(engine.router.active.panel == parse){
        return true;
      }
      return toWorker(app,'panel',false,null,data);
    },
    comp : function(app,data,routerId){
      return toWorker(app,'comp',false,routerId,data);
    }
  },

  new : {
    page : function(app,data){
      return toWorker(app,'page',true,null,data);
    },
    cont : function(app,data){
      return toWorker(app,'cont',true,null,data);
    },
    panel : function(app,data){
      return toWorker(app,'panel',true,null,data);
    },
    comp : function(app,data,routerId){
      return toWorker(app,'comp',true,routerId,data);
    }
  }

}

module.exports = exp;

function clean_page(c){
  if(!c || c.length === 0){
    return engine.common.error('invalid-url-clean_page-navigate-router');
  }
  let index_of_page = c.indexOf("page-");
  if(index_of_page.length < 0){
    return engine.common.error('not_found-page-router');
  }
  index_of_page += "page-".length;
  let collect_page = '';
  while(true){
    if(index_of_page === c.length){break;}
    if(c[index_of_page] === "-"){break;}
    if(c[index_of_page] === "?"){break;}
    collect_page += c[index_of_page];
    index_of_page++;
  }
  return collect_page;
}

function clean_cont(c){
  if(!c || c.length === 0){
    return engine.common.error('invalid-url-clean_cont-navigate-router');
  }
  let index_of_cont = c.indexOf("router-cont-cont-");
  if(index_of_cont.length < 0){
    return engine.common.error('not_found-page-router');
  }
  index_of_cont += "router-cont-cont-".length;
  let collect_cont = '';
  while(true){
    if(index_of_cont === c.length){break;}
    if(c[index_of_cont] === "-"){break;}
    if(c[index_of_cont] === "?"){break;}
    collect_cont += c[index_of_cont];
    index_of_cont++;
  }

  return collect_cont;

}

function clean_panel(c){
  if(!c || c.length === 0){
    return engine.common.error('invalid-url-clean_panel-navigate-router');
  }
  let index_of_panel = c.indexOf("-router-panel-panel-");
  if(index_of_panel.length < 0){
    return engine.common.error('not_found-page-router');
  }
  index_of_panel += "-router-panel-panel-".length;
  let collect_panel = '';
  while(true){
    if(index_of_panel === c.length){break;}
    if(c[index_of_panel] === "-"){break;}
    if(c[index_of_panel] === "?"){break;}
    collect_panel += c[index_of_panel];
    index_of_panel++;
  }
}
