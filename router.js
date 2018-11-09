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
  tab:[]
};

let route = {
  page:[],
  cont:[],
  panel:[]
};

let track = {
  cont:{},
  panel:{},
  tabs:{}
};

module.exports= {

  //nav data
  active:active,
  built:built,
  route:route,
  track:track,

  //functions

  get : {
    pageModule : getWorker.pageModule,
    contModule : getWorker.contModule,
    panelModule : getWorker.panelModule,
    baseHref : getWorker.panelModule
  },

  set : {
    pageModule : setWorker.pageModule,
    contModule : setWorker.contModule,
    panelModule : setWorker.panelModule,
    baseHref : setWorker.baseHref
  },

  navigate : {
    to : navWorker.to,
    new: navWorker.new
  },

  init : {
    conts : initWorker.conts,
    panels : initWorker.panels
  }

};
