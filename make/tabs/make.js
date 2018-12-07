"use strict"

const common = require('../../common');
const checkBaseOptions = require('../check').check;
const view = require('../../view');
const router = require('../../router');
const gets = require('../../get');
const log = false;
const viewers = require('../viewers');

module.exports = {

  tabs : function(parent,moduleCont,tabs,clickFunction,activeFunction,idleClass,activeClass){

    common.tell('+++ making tabs',log);

    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    for(var j=0;j<tabs.length;j++){

      let tab = tabs[j];

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
        } else {
          tabObject.className = 'tab-idle';
        }

        if(gets.body.width() > 640 && tabs.length <= 6){
          tabObject.style.width = 'auto';
        }

        get.appendChild(tabObject);

        let tabRef = parent + tab.module.ref;
        let data = null;
        if(tab.data){
          data = tab.data;
        }

        //set active tab class here
        if(tab.active){
          if(tab.active == true){

            //set router tabs track catalog here
            router.track.tabs[parent] = {module:tabRef,tab:tabId};
            router.built.tab.push(tabRef);

            if(activeClass){
              viewers.addClass({id:tabId,parent:'any',class:activeClass});
            } else {
              viewers.addClass({id:tabId,parent:'any',class:'tab-active'});
            }
            if(activeFunction){
              activeFunction(tabId,tab.module,data,moduleCont);
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

            //check for active tab
            if(router.track.tabs[parent]['tab'] == tabId){
              return true;
            }

            //remove active class from active tab
            let activeTab = router.track.tabs[parent]['tab'];
            if(activeClass){
              viewers.removeClass({id:activeTab,parent:'any',class:activeClass});
              viewers.addClass({id:tabId,parent:'any',class:activeClass});
            } else {
              viewers.removeClass({id:activeTab,parent:'any',class:'tab-active'});
              viewers.addClass({id:tabId,parent:'any',class:'tab-active'});
            }

            //hide the active tab
            /*
            if(moduleCont){

              view.hide(router.track.tabs[parent].module);

              //check if tab was buolt previously
              if(router.built.tab.indexOf(tabRef) >= 0){
                router.track.tabs[parent] = {module:tabRef,tab:tabId};
                view.show(tabRef);
                return true;
              } else {
                tab.module.init(moduleCont,data);
              }

            }
            */

            clickFunction(tabId,tab.module,data,moduleCont);

            //set comp router tags
            router.track.tabs[parent] = {module:tabRef,tab:tabId};
            router.built.tab.push(tabRef);

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
