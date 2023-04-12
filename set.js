
let root;

module.exports = {

  css_var:(key,value)=>{
    if(!root){
      root = document.querySelector(':root').style;
    }
    root.setProperty(key,value);
    // root[key] = value;
  },

  icon:(location,is_url)=>{
    // return;
    if(!is_url){location = engine.loader.process_location(location);}
    if(is_static){return builder.add.icon(location);}
    let elements = document.getElementsByTagName("link");
    for(let item of elements){
      if(item.rel === "icon"){
        item.href = location;
        return;
      }
    }
    engine.make.element({
      tag:'link',
      rel:"icon",
      type:"image/x-icon",
      href:location,
      parent:"head"
    });
  },

  pageTitle : function(title){

    if(typeof(title) !== 'string'){
      return engine.common.error('invalid-title-data_type');
    }

    document.title = title;
    return true;

  },

  cssVar:(key,val)=>{
    let root = document.querySelector(':root');
    if(!root){return false;}
    root.style.setProperty(key, val);
    return true;
  },

  input : {

    value : function(id,value){
      let get = document.getElementById(id);
      if(get == null){
        return engine.common.error('invalid-parent');
      }
      get.value = value;
      return true;
    }

  },

  style: style,

  styles: (id,styles)=>{
    let resolve_styles = engine.make.styles.build_styles(styles);
    let elem = engine.get.element(id);
    for(let key in resolve_styles){
      elem.style[key] = resolve_styles[key];
    }
  },

  div : {

    text : function(id,value){
      let get = document.getElementById(id);
      if(get == null){
        return engine.common.error('invalid-parent');
      }
      get.innerHTML = value;
      return true;
    },

    style: style,

  }

}

function style(id,styles){
  if(!id || !styles){return engine.common.error("not_found-id/styles");}
  let object = engine.get.element(id);
  if(!object){return engine.common.error('invalid-parent');}
  for(let key in styles){
    object.style[key] = styles[key];
  }
}
