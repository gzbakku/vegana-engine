const common = require('../common');
const log = false;

function toWorker(app,type,reset,routerId,data){

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
    toId = active.page + '-router-cont' + app.ref;
  } else if(type == 'panel'){
    toId = track.cont[active.page] + app.ref;
  } else if(type == 'comp'){
    toId = routerId + app.ref;
  }

  if(reset == true){
    if(document.getElementById(toId)){
      document.getElementById(toId).remove();
    }
    if(track['comp'][routerId]){
      document.getElementById(track['comp'][routerId]).remove();
    }
    let toIdPos = built[type].indexOf(toId);
    built[type].splice(toIdPos, 1);
  }

  //hide the current app
  if(reset == false){
    if(type == 'page'){
      view.hide(active[type]);
    } else if(type == 'cont'){
      view.hide(track.cont[active.page + '-router-cont']);
    } else if(type == 'panel'){
      let active_cont = track.cont[active.page + '-router-cont'];
      view.hide(track.panel[active_cont]);
    } else if(type == 'comp'){
      view.hide(track['comp'][routerId]);
    }
  }

  //update track catalog with toId
  if(type == 'page'){
    active[type] = toId;
  } else if(type == 'cont'){
    track.cont[active.page + '-router-cont'] = toId;
  } else if(type == 'panel'){
    let active_cont = track.cont[active.page + '-router-cont'];
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
      app.init(data);
    } else if(type == 'cont'){
      app.init(active.page + '-router-cont',data);
    } else if(type == 'panel'){
      app.init(track.cont[active.page],data);
    } else if(type == 'comp'){
      app.init(routerId,data);
    }

    if(type == 'comp'){
      built[type].push(toId);
    }

  }

  route.push(toId);           //push appId to route catalog
  return true;

}

module.exports = {

  to : {
    page : function(app,data){
      return toWorker(app,'page',false,null,data);
    },
    cont : function(app,data){
      return toWorker(app,'cont',false,null,data);
    },
    panel : function(app,data){
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
