

module.exports = {

  add:(options)=>{
    if(!options.name){return engine.common.error('not_found-name-add-meta-engine');}
    if(document.querySelector('meta[name="' + options.name + '"]')){
      return engine.common.error('already_exists-meta_tag-add-meta-engine=>"you might wanna update the meta tag, not set it again."');
    }
    var meta = document.createElement('meta');
    if(options.href){meta.httpEquiv = options.href;}
    meta.content = options.content;
    meta.name = options.name;
    document.getElementsByTagName('head')[0].appendChild(meta);
    return true;
  },

  update:(options)=>{
    let get = document.querySelector('meta[name="' + options.name + '"]');
    if(!get){
      let check = engine.meta.add(options);
      if(!check){
        return engine.common.error('failed-add_meta_tag-update-meta-engine');
      } else {
         get = document.querySelector('meta[name="' + options.name + '"]');
      }
    }
    get.setAttribute("content", options.content);
    return true;
  },

  delete:(name)=>{
    let get = document.querySelector('meta[name="' + name + '"]');
    if(get){
      get.remove();
      return true;
    } else {
      return engine.common.error('not_found-meta_tag-delete-meta-engine');
    }
  }

};
