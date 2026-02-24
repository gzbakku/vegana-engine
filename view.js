


function doo(id,what){
  let get = document.getElementById(id);
  if(get == null){
    return false;
  }
  let og = get.style.display;
  if(what == 'show'){
    let og_view = get.ogDisplayValue;
    if(typeof(og_view) === "string" && og_view.length > 0){
      get.style.display = og_view;
    } 
    else {
      get.style.display = 'block';
    }
  } else if (what == 'hide'){
    if(typeof(og) === "string" && og.length > 0){
      get.ogDisplayValue = og;
    }
    get.style.display = 'none';
  } else if (what == 'remove'){
    get.remove();
  }
  return id;
}

module.exports= {

  hide : (id)=>{
    return doo(id,'hide');
  },
  show : (id)=>{
    return doo(id,'show');
  },
  remove : (id)=>{
    return doo(id,'remove');
  },
  
  to:(id)=>{
    return engine.scrollTo(id);
  },

};
