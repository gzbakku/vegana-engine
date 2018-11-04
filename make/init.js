const common = require('../common');
const log = false;
const seprator = false;
const checkBaseOptions = require('./check').check;

module.exports = {

  page : function(id,cls){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    common.tell('initiating page',log);

    if(id == null){
      return common.error('no_id_found : ' + id);
    }
    if(cls == null){
      return common.error('no_class_found : ' + id);
    }

    //check parent
    let get = document.getElementById('page-router');
    if(get == null){
      return common.error('cannot_found_page_router_div');
    }

    //make element
    let div = document.createElement("div");
    div.id = id;
    div.className = cls;
    get.appendChild(div);

    let router = require('../router');
    router.route.page.push(id);
    router.built.page.push(id);
    router.active.page = id;

    return id;

  },

  comp : function(id,parent,cls){

    //console.log(parent);

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    common.tell('initiating comp',log);

    if(id == null){
      return common.error('no_id_found : ' + id);
    }
    if(parent == null){
      return common.error('no_parent_found : ' + id + ' || parent : ' + parent);
    }
    if(cls == null){
      return common.error('no_class_found : ' + id);
    }

    //check parent
    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent : ' + id);
    }

    //make element
    let div = document.createElement("div");
    div.id = id;
    div.className = cls;
    get.appendChild(div);
    return id;

  },

  cont : function(id,parent,cls){

    //console.log(id);

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    common.tell('initiating cont',log);

    if(id == null){
      return common.error('no_id_found : ' + id);
    }
    if(parent == null){
      return common.error('no_parent_found : ' + id + ' || parent : ' + parent);
    }
    if(cls == null){
      return common.error('no_class_found : ' + id);
    }

    //get router
    let router = parent + '-router-cont';

    //check parent
    let get = document.getElementById(router);
    if(get == null){
      return common.error('invalid_parent id : ' + id);
    }

    //make element
    let div = document.createElement("div");
    div.id = id;
    div.className = cls;
    get.appendChild(div);

    let routerApp = require('../router');
    routerApp.route.cont.push(id);
    routerApp.built.cont.push(id);
    routerApp.active.cont = id;
    routerApp.track.cont[parent] = id;

    return id;

  },

  panel : function(id,parent,cls){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    common.tell('initiating panel',log);

    if(id == null){
      return common.error('no_id_found : ' + id);
    }
    if(parent == null){
      return common.error('no_parent_found : ' + id + ' || parent : ' + parent);
    }
    if(cls == null){
      return common.error('no_class_found : ' + cls);
    }

    let router = parent + '-router-panel';

    //check parent
    let get = document.getElementById(router);
    if(get == null){
      return common.error('invalid_parent id : ' + id + ' || parent : ' + parent);
    }

    //make element
    let div = document.createElement("div");
    div.id = id;
    div.className = cls;
    get.appendChild(div);

    let routerApp = require('../router');
    routerApp.route.panel.push(id);
    routerApp.built.panel.push(id);
    routerApp.active.panel = id;
    routerApp.track.panel[parent] = id;

    return id;

  }

}
