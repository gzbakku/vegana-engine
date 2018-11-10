const common = require('../common');
const log = false;

function toWorker(app,type){

  common.tell("navigating " + type,log);

  let active = require('../router').active;
  let built = require('../router').built;
  let route = require('../router').route;
  let track = require('../router').track;
  let view = require('../view');

  //get the active cont
  if(type == 'page'){
    if(active[type] == null){
      return common.error('no_page_initiated_from_app_starter');
    }
  }

  //security checks
  if(type == 'page'){
    if(app == null || app == undefined){
      return common.error('no_page_module_found');
    }
    if(app.ref == null || app.ref == undefined){
      return common.error('cannot_found_app/ref');
    }
  } else if(type == 'cont'){
    if(app == null || app == undefined){
      return common.error('no_cont_module_found');
    }
    if(app.ref == null || app.ref == undefined){
      return common.error('cannot_found_app/ref');
    }
  } else if(type == 'panel'){
    if(app == null || app == undefined){
      return common.error('no_page_module_found');
    }
    if(app.ref == null || app.ref == undefined){
      return common.error('cannot_found_app/ref');
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
  }

  //cont already activated
  if(built[type].indexOf(toId) >= 0){

    common.tell('app already initiated',log);
    view.loader[type].start();       //start page loader
    route[type].push(toId);          //push to app to route object

    //hide the current app
    if(type == 'page'){
      view.hide(active[type]);
    } else if(type == 'cont'){
      view.hide(track.cont[active.page]);
    } else if(type == 'panel'){
      let active_cont = track.cont[active.page];
      view.hide(track.panel[active_cont]);
    }

    //set app route tags
    if(type == 'page'){
      active.page = toId;
    } else if(type == 'cont'){
      track.cont[active.page] = toId;
    } else if(type == 'panel'){
      let active_cont = track.cont[active.page];
      track.panel[active_cont] = toId;
    }

    view.show(toId);
    view.loader[type].stop();        //stop cont loader
    return true;

  }

  //cont has to be initiated
  if(built[type].indexOf(toId) < 0){

    common.tell('initiating app',log);
    //view.loader[type].start();

    //hide the current app
    if(type == 'page'){
      view.hide(active[type]);
    } else if(type == 'cont'){
      view.hide(track.cont[active.page]);
    } else if(type == 'panel'){
      let active_cont = track.cont[active.page];
      view.hide(track.panel[active_cont]);
    }

    //set app route tags
    if(type == 'page'){
      active[type] = toId;
    } else if(type == 'cont'){
      track.cont[active.page] = toId;
    } else if(type == 'panel'){
      let active_cont = track.cont[active.page];
      track.panel[active_cont] = toId;
    }

    //initiate app
    if(type == 'page'){
      app.init();
    } else if(type == 'cont'){
      app.init(active.page);
    } else if(type == 'panel'){
      let active_cont = track.cont[active.page];
      app.init(active_cont);
    }

    view.loader[type].stop();
    return true;

  }

  return false;

}

function newWorker(app,type){

  common.tell("rebuilding " + type,log);

  let active = require('../router').active;
  let built = require('../router').built;
  let route = require('../router').route;
  let track = require('../router').track;
  let view = require('../view');

  //get the active cont
  if(active[type] == null){
    return common.error('no_page_initiated_from_app_starter');
  }

  //security checks
  if(type == 'page'){
    if(app == null || app == undefined){
      return common.error('no_page_module_found');
    }
    if(app.ref == null || app.ref == undefined){
      return common.error('cannot_found_app/ref');
    }
  } else if(type == 'cont'){
    if(app == null || app == undefined){
      return common.error('no_cont_module_found');
    }
    if(app.ref == null || app.ref == undefined){
      return common.error('cannot_found_app/ref');
    }
  } else if(type == 'panel'){
    if(app == null || app == undefined){
      return common.error('no_page_module_found');
    }
    if(app.ref == null || app.ref == undefined){
      return common.error('cannot_found_app/ref');
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
  }

  view.loader[type].start();

  //hide the current app
  if(type == 'page'){
    view.hide(active[type]);
  } else if(type == 'cont'){
    view.hide(track.cont[active.page]);
  } else if(type == 'panel'){
    let active_cont = track.cont[active.page];
    view.hide(track.panel[active_cont]);
  }

  //set app route tags
  if(type == 'page'){
    active[type] = toId;
  } else if(type == 'cont'){
    track.cont[active.page] = toId;
  } else if(type == 'panel'){
    let active_cont = track.cont[active.page];
    track.panel[active_cont] = toId;
  }

  app.init();
  view.loader[type].stop();
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
    }
  },

  new : {
    page : function(app){
      return newWorker(app,'page');
    },
    cont : function(app){
      return newWorker(app,'cont');
    },
    panel : function(app){
      return newWorker(app,'panel');
    }
  }

}
