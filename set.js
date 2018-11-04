const common = require('./common');
const log = false;

module.exports = {

  pageTitle : function(title){

    common.tell('setting pageTitle',log);

    if(typeof(title) !== 'string'){
      return common.error('invalid-title-data_type');
    }

    document.title = title;
    return true;

  }

}
