const common = require('./common');
const log = false;
const seprator = false;


module.exports = {

  init : {

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

      let router = require('./router');
      router.route.page.push(id);
      router.built.page.push(id);
      router.active.page = id;

      return id;

    },

    comp : function(id,parent,cls){

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
      let get = document.getElementById('router');
      if(get == null){
        return common.error('invalid_parent id : ' + id);
      }

      //make element
      let div = document.createElement("div");
      div.id = id;
      div.className = cls;
      get.appendChild(div);

      let routerApp = require('./router');
      routerApp.route.cont.push(id);
      routerApp.built.cont.push(id);
      routerApp.active.cont = id;

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

      let routerApp = require('./router');
      routerApp.route.panel.push(id);
      routerApp.built.panel.push(id);
      routerApp.active.panel = id;

      return id;

    }

  },

  div : function(id,parent,cls){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //initaite
    common.tell('+++ div => id ' + id,log);

    //checks
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

  text : function(parent,text){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //initiate
    common.tell('+++ text',log);

    //checks
    if(parent == null){
      return common.error('no_parent_found');
    }
    if(text == null){
      return common.error('no_text_found');
    }

    //check parent
    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent || parent : ' + parent);
    }

    //set text
    get.innerHTML = text;
    return parent;

  },

  button : function(id,parent,cls,value){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ button',log);

    //checks
    if(id == null){
      return common.error('no_id_found : ' + id);
    }
    if(parent == null){
      return common.error('no_parent_found : ' + id + ' || parent : ' + parent);
    }
    if(cls == null){
      return common.error('no_class_found : ' + id);
    }
    if(value == null){
      return common.error('no_value_found : ' + id);
    }

    //get parent
    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //make button
    let div = document.createElement("button");
    div.type = 'button';
    div.id = id;
    div.className = cls;
    div.innerHTML = value;
    get.appendChild(div);
    return id;

  },

  input : function(id,parent,cls,type,placeholder){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ input',log);

    //checks
    if(id == null){
      return common.error('no_id_found : ' + id);
    }
    if(parent == null){
      return common.error('no_parent_found : ' + id + ' || parent : ' + parent);
    }
    if(cls == null){
      return common.error('no_class_found : ' + id);
    }
    if(type == null){
      return common.error('no_type_found : ' + id);
    }

    //get parent
    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //make button
    let div = document.createElement("input");
    div.id = id;
    div.className = cls;
    div.type = type;

    if(placeholder){
      div.placeholder = placeholder;
    }

    get.appendChild(div);
    return id;

  },

  image : function(id,parent,cls,location){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ image',log);

    //checks
    if(id == null){
      return common.error('no_id_found : ' + id);
    }
    if(parent == null){
      return common.error('no_parent_found : ' + id + ' || parent : ' + parent);
    }
    if(cls == null){
      return common.error('no_class_found : ' + id);
    }

    //get parent
    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //make image
    let div = document.createElement("img");
    div.id = id;
    div.className = cls;
    div.src = location;
    get.appendChild(div);
    return id;

  },

  select : function(id,parent,cls,options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ select',log);

    //checks
    if(id == null){
      return common.error('no_id_found : ' + id);
    }
    if(parent == null){
      return common.error('no_parent_found : ' + id + ' || parent : ' + parent);
    }
    if(cls == null){
      return common.error('no_class_found : ' + id);
    }
    if(options.length == 0 || options.length == undefined || options == null){
      return common.error('no_options_found');
    }

    //get parent
    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //make select
    let div = document.createElement("select");
    div.id = id;
    div.className = cls;

    //add options
    for(var i=0;i<options.length;i++){
      let data = options[i];
      if(data.text && data.value){
        let option = document.createElement("option");
        option.text("data.text");
        option.value("data.value");
        div.add(option);
      }
    }

    //append select
    get.appendChild(div);
    return id;

  },

  element : function(id,parent,cls,type,ats){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ custom_element',log);

    //security checks
    if(id == null){
      return common.error('no_id_found : ' + id);
    }
    if(parent == null){
      return common.error('no_parent_found : ' + id + ' || parent : ' + parent);
    }
    if(cls == null){
      return common.error('no_class_found : ' + id);
    }
    if(options.length == 0 || options.length == undefined || options == null){
      return common.error('no_options_found');
    }

    //get parent
    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //make select
    let div = document.createElement(type);
    div.id = id;
    div.className = cls;

    let keys = Object.keys(ats);

    if(keys == null || keys.length == undefined || keys.length == 0){
      return common.error('no_valid_attributes_found');
    }

    //add ats
    for(var i=0;i<keys.length;i++){
      div[keys[i]] = ats[keys];
    }

    //append select
    get.appendChild(div);
    return id;

  }

};
