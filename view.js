


function doo(id,what){
  let get = document.getElementById(id);
  if(get == null){
    return false;
  }
  if(what == 'show'){
    get.style.display = 'block';
  } else if (what == 'hide'){
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
