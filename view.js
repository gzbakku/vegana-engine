const common = require('./common');
const log = false;
const router = require('./router');
const loaders = require('./view/loader_index');

function hide(id){
  common.tell('hiding_div : ' + id,log);
  let get = document.getElementById(id);
  if(get == null){
    return common.error('div_not_found');
  }
  get.style.display = 'none';
  return id;
}

function show(id){
  common.tell('showing div : ' + id,log);
  let get = document.getElementById(id);
  if(get == null){
    return common.error('div_not_found');
  }
  get.style.display = 'block';
  return id;
}

module.exports= {

  hide : hide,
  show : show,

  loader : {
    page:{
      start:loaders.page.start,
      stop:loaders.page.stop
    },
    cont:{
      start:loaders.cont.start,
      stop:loaders.cont.stop
    },
    panel:{
      start:loaders.panel.start,
      stop:loaders.panel.stop
    },
  }

};
