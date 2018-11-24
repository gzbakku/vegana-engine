const common = require('./common');
const log = false;

const initWorker = require('./router/init');
const navWorker = require('./router/nav');
const getWorker = require('./router/get');
const setWorker = require('./router/set');

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

let route = [];

let track = {
  cont:{},
  panel:{},
  tabs:{},
  comp:{}
};

module.exports= {

  //nav data
  active:active,
  built:built,
  route:route,
  track:track,

  //functions
  get : getWorker,
  set : setWorker,
  navigate : navWorker,
  init : initWorker

};
