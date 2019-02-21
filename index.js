const make = require('./make');
const view = require('./view');
const router = require('./router');
const common = require('./common');
const binder = require('./binder');
const loader = require('./loader');
const session = require('./session');
const request = require('./request');
const get = require('./get');
const wet = require('./wet');
const validate = require('./validate');
const set = require('./set');
const add = require('./add');
const data = require('./data');
const time = require('./time');
const params = require('./params');

const md5 = require('md5');
const uniqid = require('uniqid');

//common.tell('one');

module.exports = {
  add:add,
  binder:binder,
  make:make,
  view:view,
  router:router,
  common:common,
  loader:loader,
  session:session,
  request:request.send,
  validate:validate,
  get:get,
  wet:wet,
  set:set,
  data:data,
  time:time,
  params:params,
  global:{
    function:{},
    comp:{},
    object:{}
  },
  md5:md5,
  uniqid:uniqid,
  app_version:null
};
