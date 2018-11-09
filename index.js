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

//common.tell('one');

module.exports = {
  add:add.init,
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
  set:set
};
