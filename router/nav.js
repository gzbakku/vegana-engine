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
  let mods = router.mods;

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

  //console.log('1');

  //set ref here
  let toId;
  if(type == 'page'){
    toId = app.ref;
  } else if(type == 'cont'){
    //window.location.replace("&cont=" + app.ref);
    toId = active.page + '-router-cont' + app.ref;
  } else if(type == 'panel'){
    let page = active.page + '-router-cont';
    let cont = track.cont[page];
    toId = cont + '-router-panel' + app.ref;
  } else if(type == 'comp'){
    toId = routerId + app.ref;
  }

  //console.log({toId:toId});

  //console.log('2');

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

  //console.log('3');

  //hide the current app
  if(reset == false){
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
  }

  //console.log('4');

  //update track catalog with toId
  if(type == 'page'){
    active[type] = toId;
  } else if(type == 'cont'){
    let page = active.page + '-router-cont';
    track.cont[page] = toId;
    //console.log({newCont:track.cont[page]});
  } else if(type == 'panel'){
    let page = active.page + '-router-cont';
    let cont = track.cont[page] + '-router-panel';
    track.panel[cont] = toId;
    //console.log({newPanel:track.panel[cont]});
  } else if(type == 'comp'){
    track.comp[routerId] = toId;
  }

  //console.log('5');

  //already built the app
  if(built[type].indexOf(toId) >= 0){
    view.show(toId);
    //console.log('already built : ' + toId);
  }

  //console.log('6');

  //app not built yet
  if(built[type].indexOf(toId) < 0){

    //console.log('building');

    //initiate app
    if(type == 'page'){
      app.init(data);
    } else if(type == 'cont'){
      let page = active.page + '-router-cont';
      app.init(page,data);
    } else if(type == 'panel'){
      let page = active.page + '-router-cont';
      let cont = track.cont[page] + '-router-panel';
      app.init(cont,data);
    } else if(type == 'comp'){
      app.init(routerId,data);
    }

    if(type == 'comp'){
      built[type].push(toId);
    }

  }

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

  //console.log('7');

  return true;

}



let exp = {

  url:{
    add : {
      page:function(id){
        let page;
        if(id){
          page = id;
        } else {
          page = engine.router.active.page;
        }
        let url = "?page=" + page;
        window.history.pushState("object or string", null, url);
        return url;
      },
      cont:function(id){
        let page = engine.router.active.page + '-router-cont';
        let cont;
        if(id){
          cont = id;
        } else {
          cont = engine.router.track.cont[page];
        }
        let url = "?page=" + engine.router.active.page + "&cont=" + cont;
        window.history.pushState("object or string", null, url);
        return url;
      },
      panel:function(id){
        let page = engine.router.active.page + '-router-cont';
        let cont = engine.router.track.cont[page] + '-router-panel';
        let panel;
        if(id){
          panel = id;
        } else {
          panel = engine.router.track.panel[cont];
        }
        let url = "?page=" + engine.router.active.page + "&cont=" + cont + "&panel=" + panel;
        window.history.pushState("object or string", null, url);
        return url;
      }
    }
  },

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

module.exports = exp;
