const common = require('../../common');
const checkBaseOptions = require('../check').check;
const view = require('../../view');
const router = require('../../router');
const gets = require('../../get');
const log = false;
const viewers = require('../viewers');

module.exports = {

  tabs : function(parent,tabs,clickFunction,activeFunction,idleClass,activeClass){

    common.tell('+++ making tabs',log);

    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    for(var i=0;i<tabs.length;i++){

      let tab = tabs[i];

      if(
        tab.hasOwnProperty('value') == true &&
        tab.hasOwnProperty('module') == true
      ){

        let tabId = parent + '-tab-' + tab.value.toLowerCase();
        let tabObject = document.createElement('div');
        tabObject.id = tabId;
        tabObject.innerHTML = tab.value;
        tabObject.style.float = 'left';

        if(idleClass){
          tabObject.className = idleClass;
        }

        if(gets.body.width() > 640 && tabs.length <= 6){
          tabObject.style.width = 'auto';
        }

        get.appendChild(tabObject);

        //set active tab class here
        if(tab.active){
          if(tab.active == true){
            if(activeClass){
              viewers.addClass({id:tabId,parent:'any',class:activeClass});
            }
            if(activeFunction){
              activeFunction(tabId,tab.module);
            }
          }
        }

        //set tab width to fit page size
        if(gets.body.width() <= 640){
          tabObject.style.width = '26.66%';
        }
        if(gets.body.width() <= 480){
          tabObject.style.width = '40%';
        }

        //set tab function here
        if(clickFunction){
          tabObject.addEventListener('click',()=>{
            clickFunction(tabId,tab.module);
          });
        }

      }
    }
    //loop ends here

    return true;

  },

  cont : function(parent,type,cls){

    common.tell('+++ making cont : ' + type,log);

    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }
    if(!type){
      return common.error('not_found-cont_type');
    }

    let contId = parent + '-' + type + '-cont';
    let contObject = document.createElement('div');
    contObject.id = contId;
    if(cls){
      contObject.className = cls;
    }
    get.appendChild(contObject);

    return contId;

  },

}
