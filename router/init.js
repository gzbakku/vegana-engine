const common = require('../common');
const log = false;

module.exports = {

  conts : function(parent){

    common.tell('initiating conts router',log);

    if(parent == null){
      return common.error('no_parent_found : ' + parent);
    }

    //check parent
    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent : ' + parent);
    }

    //make router
    let router = document.createElement("div");
    router.id = parent + '-router-cont';
    router.className = 'cont-router';

    //make loader
    let loader = document.createElement("div");
    loader.id = parent + '-loader-cont';
    loader.innerHtml = 'loading cont ...';
    loader.style.display = 'none';
    loader.className = 'cont-loader';

    get.appendChild(router);
    get.appendChild(loader);
    return parent + '-router-cont';

  },

  panels : function(parent){

    common.tell('initiating panels router',log);

    if(parent == null){
      return common.error('no_parent_found : ' + parent);
    }

    //check parent
    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent : ' + parent);
    }

    //make element
    let router = document.createElement("div");
    router.id = parent + '-router-panel';
    router.className = 'panel-router';

    let loader = document.createElement("div");
    loader.id = parent + '-loader-panel';
    loader.innerHtml = 'loading panel ...';
    loader.style.display = 'none';
    loader.className = 'panel-loader';

    get.appendChild(router);
    get.appendChild(loader);

    return parent + '-router-panel';

  }

};
