

async function build(type,id,parent,cls){

  //security checks
  if(id == null){
    return engine.common.error('not_found-id');
  }
  if(parent == null){
    return engine.common.error('not-found-parent');
  }

  //check parent
  let get = document.getElementById(parent);
  if(get == null){
    return engine.common.error('invalid_parent');
  }

  //make element
  let div = document.createElement("div");
  div.id = id;
  if(cls){
    div.className = cls;
  }
  get.appendChild(div);

  let router = require('../router');

  if(type == 'page' && !engine.router.active.page){
    let pageName = id.split('-')[1] + 'Page';
    let mod = engine.get.pageModule(pageName);
    engine.router.route.push({
      url:window.baseHref,
      mod:mod,
      type:'page'
    });
  }

  if(type == 'page' && !engine.router.active.page){
    let hold = id.split('-')[1] + 'Page';
    let app = engine.get.pageModule(hold);
    if(app){
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
      }
    }
  }

  //update router catalogs here
  if(type == 'page'){
    //router.route.push(id);
    router.built.page.push(id);
    router.active.page = id;
    router.navigate.url.add.page(id);
  } else if(type == 'cont'){
    //router.route.push(id);
    router.built.cont.push(id);
    router.active.cont = id;
    router.track.cont[parent] = id;
  } else if(type == 'panel'){
    //router.route.push(id);
    router.built.panel.push(id);
    router.active.panel = id;
    router.track.panel[parent] = id;
  }

  //page-router



  return id;

}

module.exports = {

  page : function(id,cls){
    return build('page',id,'page-router',cls);
  },

  comp : function(id,parent,cls){
    return build('comp',id,parent,cls);
  },

  cont : function(id,parent,cls){
    return build('cont',id,parent,cls);
  },

  panel : function(id,parent,cls){
    return build('panel',id,parent,cls);
  }

}
