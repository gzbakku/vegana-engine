const common = require('../common');
const log = false;

function toWorker(app,type,reset,routerId){

  //other modules
  let router = require('../router');
  let view = require('../view');

  //catalogs
  let active = router.active;
  let built = router.built;
  let route = router.route;
  let track = router.track;

  //check if there is a initiated page heres
  if(type == 'page'){
    if(active[type] == null){
      return common.error('no_page_initiated_from_app_starter');
    }
  }

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

  //set ref here
  let toId;
  if(type == 'page'){
    toId = app.ref;
  } else if(type == 'cont'){
    toId = active.page + app.ref;
  } else if(type == 'panel'){
    toId = track.cont[active.page] + app.ref;
  } else if(type == 'comp'){
    toId = routerId + app.ref;
  }

  if(reset == true){
    if(document.getElementById(toId)){

      //delete the toId div
      if(type == 'page'){
        document.getElementById(active[type]).remove();
      } else if(type == 'cont'){
        document.getElementById(track.cont[active.page]).remove();
      } else if(type == 'panel'){
        let active_cont = track.cont[active.page];
        document.getElementById(track.panel[active_cont]).remove();
      } else if(type == 'comp'){
        document.getElementById(track.comp[routerId]).remove();
      }

      //remove toId from built catalog
      let toIdPos = built.indexOf(toId);
      built = built.splice(toIdPos, 1);

    }
  }

  //hide the current app
  if(type == 'page'){
    view.hide(active[type]);
  } else if(type == 'cont'){
    view.hide(track.cont[active.page]);
  } else if(type == 'panel'){
    let active_cont = track.cont[active.page];
    view.hide(track.panel[active_cont]);
  } else if(type == 'comp'){
    view.hide(track['comp'][routerId]);
  }

  //update track catalog with toId
  if(type == 'page'){
    active[type] = toId;
  } else if(type == 'cont'){
    track.cont[active.page] = toId;
  } else if(type == 'panel'){
    let active_cont = track.cont[active.page];
    track.panel[active_cont] = toId;
  } else if(type == 'comp'){
    track.comp[routerId] = toId;
  }

  //already built the app
  if(built[type].indexOf(toId) >= 0){
    view.show(toId);
  }

  //app not built yet
  if(built[type].indexOf(toId) < 0){

    //initiate app
    if(type == 'page'){
      app.init();
    } else if(type == 'cont'){
      app.init(active.page);
    } else if(type == 'panel'){
      app.init(track.cont[active.page]);
    } else if(type == 'comp'){
      app.init(routerId);
    }

    built[type].push(toId);   //add appId to built catalog

  }

  route.push(toId);           //push appId to route catalog
  return true;

}

module.exports = {

  to : {
    page : function(app){
      return toWorker(app,'page');
    },
    cont : function(app){
      return toWorker(app,'cont');
    },
    panel : function(app){
      return toWorker(app,'panel');
    },
    comp : function(app,routerId){
      return toWorker(app,'comp',false,routerId);
    }
  },

  new : {
    page : function(app){
      return toWorker(app,'page',true);
    },
    cont : function(app){
      return toWorker(app,'cont',true);
    },
    panel : function(app){
      return toWorker(app,'panel',true);
    },
    comp : function(app,routerId){
      return toWorker(app,'comp',true,routerId);
    }
  }

}
