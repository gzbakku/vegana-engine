

module.exports = {

  add:(options,unbase)=>{
    if(is_static && !unbase){return builder.add.meta(options);}
    var meta = document.createElement('meta');
    for(let key in options){
      let key_name = key;
      if(key_name === "httpEquiv"){key_name = "href";}
      meta[key_name] = options[key];
    }
    document.getElementsByTagName('head')[0].appendChild(meta);
    return true;
  },

  update:(options)=>{
    if(is_static){return builder.add.meta(options);}
    if(options.name){
      let get = document.querySelector('meta[name="' + options.name + '"]');
      if(get){
        get.setAttribute("content", options.content);
        return true;
      }
    }
    return engine.meta.add(options,true);
  },

  delete:(name)=>{
    if(is_static){return builder.remove.meta(name);}
    let get = document.querySelector('meta[name="' + name + '"]');
    if(get){
      get.remove();
      return true;
    } else {
      return false;
    }
  }

};
