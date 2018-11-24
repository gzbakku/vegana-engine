const common = require('../common');
const log = false;

function build(type,id,parent,cls){

  common.tell('initiating ' + type,log);

  //security checks
  if(id == null){
    return common.error('not_found-id');
  }
  if(parent == null){
    return common.error('not-found-parent');
  }

  //check parent
  let get = document.getElementById(parent);
  if(get == null){
    return common.error('invalid_parent');
  }

  //make element
  let div = document.createElement("div");
  div.id = id;
  if(cls){
    div.className = cls;
  }
  get.appendChild(div);

  let router = require('../router');

  //update router catalogs here
  if(type == 'page'){
    router.route.push(id);
    router.built.page.push(id);
    router.active.page = id;
  } else if(type == 'cont'){
    router.route.push(id);
    router.built.cont.push(id);
    router.track.cont[parent] = id;
  } else if(type == 'panel'){
    router.route.push(id);
    router.built.panel.push(id);
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
