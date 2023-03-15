

function toWorker(app,type,reset,routerId,data){

  const log = false;

  //------------------------------
  //catalogs
  //------------------------------
  let active = engine.router.active;
  let built = engine.router.built;
  let route = engine.router.route;
  let track = engine.router.track;
  let mods = engine.router.mods;

  //------------------------------
  //check if there is a initiated page heres
  //------------------------------
  if(type == 'page'){
    if(active[type] == null){
      return new engine.common.Error('no_page_initiated_from_app_starter');
    }
  }

  //------------------------------
  //security checks
  //------------------------------
  if(app == null || app == undefined){
    return new engine.common.Error('not_found-app');
  }
  if(app.ref == null || app.ref == undefined){
    return new engine.common.Error('invalid_app');
  }
  if(type == 'comp'){
    if(!routerId){
      return new engine.common.Error('not_found-routerId');
    }
  }

  //------------------------------
  //calculate module div dom element id by combining module refenrce with router id
  //------------------------------
  let toId;
  if(type === "page"){toId = app.ref;} else
  if(type === "cont"){
    if(!engine.router.routers.conts[engine.router.active.page]){
      return new engine.common.Error("no-cont_router-initiated_on_page");
    }
    toId = engine.router.routers.conts[engine.router.active.page] + app.ref;
  } else if(type === "panel"){
    if(!engine.router.routers.conts[engine.router.active.page])
    {return new engine.common.Error("no-panel_router-initiated_on_panel");}
    if(!engine.router.routers.panels[engine.router.active.page][engine.router.active.cont])
    {return new engine.common.Error("no-panel_router-initiated_on_panel");}
    toId = engine.router.routers.panels[engine.router.active.page][engine.router.active.cont] + app.ref;
  } else if(type == 'comp'){
    toId = routerId + app.ref;
  }

  //------------------------------
  //remove prebuilt module
  //------------------------------
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

  //------------------------------
  //remove previous module
  //------------------------------
  if(type == 'page'){
    engine.view.hide(active.page);
  } else if(type == 'cont'){
    let page = active.page + '-router-cont';
    let cont = track.cont[page];
    engine.view.hide(cont);
  } else if(type == 'panel'){
    let page = active.page + '-router-cont';
    let cont = track.cont[page] + '-router-panel';
    let panel = track.panel[cont];
    engine.view.hide(panel);
  } else if(type == 'comp'){
    engine.view.hide(track['comp'][routerId]);
  }

  //------------------------------
  //update track catalog with toId
  //------------------------------
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

  //------------------------------
  //navigate here
  //------------------------------
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

  //------------------------------
  //run tracnkers
  //------------------------------
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

  //------------------------------
  //already built the app
  //------------------------------
  if(built[type].indexOf(toId) >= 0 && document.getElementById(toId)){
    engine.view.show(toId);
  }

  //------------------------------
  //app not built yet
  //------------------------------
  if(built[type].indexOf(toId) < 0 || !document.getElementById(toId)){

    //initiate app
    if(type == 'page'){
      app.init(data);
    } else if(type == 'cont'){
      let router = engine.router.routers.conts[engine.router.active.page];
      app.init(router,data);
    } else if(type == 'panel'){
      if(!engine.router.routers.panels[engine.router.active.page]){
        return new engine.common.Error("not_found-cont_router");
      }
      if(!engine.router.routers.panels[engine.router.active.page][engine.router.active.cont]){
        return new engine.common.Error("not_found-panel_router");
      }
      let router = engine.router.routers.panels[engine.router.active.page][engine.router.active.cont];
      app.init(router,data);
    } else if(type == 'comp'){
      app.init(routerId,data);
    }

    if(type == 'comp'){
      built[type].push(toId);
    }

  }//app not built

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
    page : function(app,data,returnError){
      if(engine.router.active.page == app.ref){
        return true;
      }
      let run = toWorker(app,'page',false,null,data);
      if(run instanceof engine.common.Error){
        if(returnError){return run;} else {
          run.log();
          return false;
        }
      } else {return run;}
    },
    cont : function(app,data,returnError){
      let parse = engine.router.active.page + '-router-cont' + app.ref;
      if(engine.router.active.cont == parse){
        return true;
      }
      let run = toWorker(app,'cont',false,null,data);
      if(run instanceof engine.common.Error){
        if(returnError){return run;} else {
          run.log();
          return false;
        }
      } else {return run;}
    },
    panel : function(app,data,returnError){
      let parse = engine.router.active.cont + '-router-panel' + app.ref;
      if(engine.router.active.panel == parse){
        return true;
      }
      let run = toWorker(app,'panel',false,null,data);
      if(run instanceof engine.common.Error){
        if(returnError){return run;} else {
          run.log();
          return false;
        }
      } else {return run;}
    },
    comp : function(app,data,routerId,returnError){
      let run = toWorker(app,'comp',false,routerId,data);
      if(run instanceof engine.common.Error){
        if(returnError){return run;} else {
          run.log();
          return false;
        }
      } else {return run;}
    }
  },

  new : {
    page : function(app,data){
      let run = toWorker(app,'page',true,null,data);
      if(run instanceof engine.common.Error){
        if(returnError){return run;} else {
          run.log();
          return false;
        }
      } else {return run;}
    },
    cont : function(app,data){
      let run = toWorker(app,'cont',true,null,data);
      if(run instanceof engine.common.Error){
        if(returnError){return run;} else {
          run.log();
          return false;
        }
      } else {return run;}
    },
    panel : function(app,data){
      let run = toWorker(app,'panel',true,null,data);
      if(run instanceof engine.common.Error){
        if(returnError){return run;} else {
          run.log();
          return false;
        }
      } else {return run;}
    },
    comp : function(app,data,routerId){
      let run = toWorker(app,'comp',true,routerId,data);
      if(run instanceof engine.common.Error){
        if(returnError){return run;} else {
          run.log();
          return false;
        }
      } else {return run;}
    }
  }

}

module.exports = exp;

function clean_page(c){
  if(!c || c.length === 0){
    return new engine.common.Error('invalid-url-clean_page-navigate-router');
  }
  let index_of_page = c.indexOf("page-");
  if(index_of_page.length < 0){
    return new engine.common.Error('not_found-page-router');
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
    return new engine.common.Error('invalid-url-clean_cont-navigate-router');
  }
  let index_of_cont = c.indexOf("router-cont-cont-");
  if(index_of_cont.length < 0){
    return new engine.common.Error('not_found-page-router');
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
    return new engine.common.Error('invalid-url-clean_panel-navigate-router');
  }
  let index_of_panel = c.indexOf("-router-panel-panel-");
  if(index_of_panel.length < 0){
    return new engine.common.Error('not_found-page-router');
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
  return collect_panel;
}
