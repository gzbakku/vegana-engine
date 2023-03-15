const log = false;
const initWorker = require('./router/init');
const navWorker = require('./router/nav');
const getWorker = require('./router/get');
const setWorker = require('./router/set');
const back = require('./router/back');

window.onpopstate = function(){
  back.nav_back();
}

let active = {
  page:null,
  cont:null,
  panel:null
};

let built = {
  page:[],
  cont:[],
  panel:[],
  tab:[],
  comp:[]
};

let route = [],closeures = [];

let track = {
  cont:{},
  panel:{},
  tabs:{},
  comp:{}
};

let mods = {
  page:{},
  cont:{},
  panel:{}
};

let routers = {
  conts:{},
  panels:{}
};

module.exports = {

  //nav data
  closeures:closeures,
  active:active,
  built:built,
  route:route,
  track:track,
  mods:mods,
  back:back,
  routers:routers,

  //functions
  get : getWorker,
  set : setWorker,
  navigate : navWorker,
  init : initWorker

};
