const make = require('./make');
const view = require('./view');
const router = require('./router');
const common = require('./common');
const binder = require('./binder');
const loader = require('./loader');
const get = require('./get');

//common.tell('one');

module.exports = {
  binder:binder,
  make:make,
  view:view,
  router:router,
  common:common,
  loader:loader,
  get:get
};
