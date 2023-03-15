

function toWorker(mod,type,reset,routerId,data,dont_update_url,push_url,dont_run_trackers){

  const log = false;

  //------------------------------
  //catalogs
  //------------------------------
  let active = engine.router.active;
  let built = engine.router.built;
  let routers = engine.router.routers;
  let url = engine.make.url;
  // let mods = engine.router.mods;

  //------------------------------
  //check if there is a initiated page heres
  //------------------------------
  let Error = engine.common.Error;
  if(type == 'page'){
    //active[type] == null
    if(!active.routers["page-router"]){
      let e = 'no_page_initiated_from_mod_starter => please init on a page before using router';
      console.error(e);
      return new Error(e);
    }
  }

  //------------------------------
  //security checks
  //------------------------------
  if(!mod){
    return new Error('not_found-mod');
  }
  if(!mod.ref){
    return new Error('invalid_mod');
  }
  if(type == 'comp' && !routerId){
    return new Error('not_found-routerId');
  }

  //get the active modules
  let router_id = get_router_id(type,routerId);
  let to_id = type === "page" ? mod.ref : router_id + mod.ref;
  let active_id = active.routers[router_id];

  if(to_id === active_id && !reset){
    return true;
  }
  if(to_id === active_id && reset){
    engine.view.remove(to_id);
  }
  if(to_id !== active_id){
    engine.view.hide(active_id);
  }
  if(built[to_id]){
    engine.view.show(to_id);
  }
  
  // console.log({
  //   t:type,
  //   tid:to_id,
  //   aid:active_id,
  //   r:router_id,
  //   ab:built[active_id] ? true : false,
  //   tb:built[to_id] ? true : false,
  // });
  
  if(type === "page"){active.page = to_id;}
  active.routers[router_id] = to_id;
  if(!dont_update_url){
    let already_set_url_string = url.get(to_id);
    // console.log({already_set_url_string:already_set_url_string});
    if(already_set_url_string){
      url.update_from_string(already_set_url_string,true,false);
    } else {
      if(type === "page"){url.update("page",mod.name.replace("Page",""),push_url);} else
      if(type === "cont"){url.update("cont",mod.contName.replace("Cont",""),push_url);} else
      if(type === "panel"){url.update("panel",mod.panelName.replace("Panel",""),push_url);}
    }
  }

  if(!built[to_id]){
    mod.init(router_id,data);
    built[to_id] = router_id;
  }

  if(mod.trackers && !dont_run_trackers){
    engine.router.navigate.run_trackers(mod,dont_update_url,data);
  }

  return true;

}

function get_router_id(type,routerId){
  let active = engine.router.active;
  let routers = engine.router.routers;
  let router_id;
  if(type === "page"){
    router_id = "page-router";
  } else if(type === "cont"){
    router_id = routers.conts[active.page];
  } else if(type === "panel"){
    let cont_router = routers.conts[active.page];
    let active_cont = active.routers[cont_router];
    router_id = routers.panels[active_cont];
  } else if(type === "comp"){
    router_id = routerId;
  }
  return router_id;
}

function returnChecked(run,returnError){
  if(run instanceof engine.common.Error){
    if(returnError){return run;} else {
      run.log();
      return false;
    }
  } else {return run;}
}

let exp = {

  get_router_id:get_router_id,

  toWorker:toWorker,

  run_trackers:(mod,dont_update_url,data)=>{
    if(mod.trackers){
      let trackers = mod.trackers;
      if(trackers.onRoute && !dont_update_url){trackers.onRoute(data);}
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
    }
  },

  to : {
    page : function(app,data,returnError,push_url){
      let run = toWorker(app,'page',false,null,data,false,push_url);
      return returnChecked(run,returnError);
    },
    cont : function(app,data,returnError,push_url){
      let run = toWorker(app,'cont',false,null,data,false,push_url);
      return returnChecked(run,returnError);
    },
    panel : function(app,data,returnError,push_url){
      let run = toWorker(app,'panel',false,null,data,false,push_url);
      return returnChecked(run,returnError);
    },
    comp : function(app,data,routerId,returnError,push_url){
      let run = toWorker(app,'comp',false,routerId,data,false,push_url);
      return returnChecked(run,returnError);
    }
  },

  new : {
    page : function(app,data,returnError,push_url){
      let run = toWorker(app,'page',true,null,data,false,push_url);
      return returnChecked(run,returnError);
    },
    cont : function(app,data,returnError,push_url){
      let run = toWorker(app,'cont',true,null,data,false,push_url);
      return returnChecked(run,returnError);
    },
    panel : function(app,data,returnError,push_url){
      let run = toWorker(app,'panel',true,null,data,false,push_url);
      return returnChecked(run,returnError);
    },
    comp : function(app,data,routerId,returnError,push_url){
      let run = toWorker(app,'comp',true,routerId,data,false,push_url);
      return returnChecked(run,returnError);
    }
  }

}

module.exports = exp;
