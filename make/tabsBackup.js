const common = require('../common');
const checkBaseOptions = require('./check').check;
const view = require('../view');
const router = require('../router');
const log = true;
const viewers = require('./viewers');
let gets = require('../get');

module.exports = {

  init : function(options){

    common.tell('+++ tabs',log);

    /*
      {
        ..
        tabsContClass:tabsCont,
        linksContClass:linksCont,
          tabClass:idleTab,
          activeTabClass:activeTab,
          navButtonClass:navButton,
        moduleContClass:viewerCont,
        tabs:[
          {value:value0,module,module0,active:true},
          {value:value1,module,module1}
        ]
      }
    */

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options');
    }
    if(!options.tabs || !options.tabs.length || options.tabs.length == 0){
      return common.error('not_found-tabs');
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make tabsCont
    let tabsContId = options.parent + '-tabs-cont-' + options.id;
    let tabsCont = document.createElement('div');
    tabsCont.id = tabsContId;
    if(options.tabsContClass){
      tabsCont.className = options.tabsContClass;
    }
    get.appendChild(tabsCont);

    //make linksCont
    let linksContId = tabsContId + '-links-cont';
    let linksCont = document.createElement('div');
    linksCont.id = linksContId;
    if(options.linksContClass){
      linksCont.className = options.linksContClass;
    }
    tabsCont.appendChild(linksCont);

    //make viewerCont
    let moduleContId = tabsContId + '-viewer-cont';
    let moduleCont = document.createElement('div');
    moduleCont.id = moduleContId;
    if(options.moduleContClass){
      moduleCont.className = options.moduleContClass;
    }
    tabsCont.appendChild(moduleCont);

    let tabs = options.tabs;
    let activated = false;

    for(var i=0;i<tabs.length;i++){

      let tab = tabs[i];

      if(
        tab.hasOwnProperty('value') == true &&
        tab.hasOwnProperty('module') == true
      ){
        //make tab object here
        let tabId = linksContId + '-tab-' + tab.value.toLowerCase();
        let tabRef = moduleContId + tab.module.ref;
        let tabObject = document.createElement('div');
        tabObject.id = tabId;
        tabObject.innerHTML = tab.value;
        if(options.tabClass){
          tabObject.className = options.tabClass;
        }
        tabObject.style.float = 'left';
        if(gets.body.width > 640 && options.tabs.length <= 6){
          tabObject.style.width = 'auto';
        }
        linksCont.appendChild(tabObject);

        //set tab class here
        if(tab.active){
          if(tab.active == true){
            //set tab router track tab here
            activated = true;
            //set active tab class here
            if(options.activeTabClass){
              viewers.addClass({id:tabId,parent:'any',class:options.activeTabClass});
            }
            //init the tab module
            router.track.tabs[tabsContId] = {module:tabRef,tab:tabId};
            router.built.tab.push(tabRef);
            tab.module.init(moduleContId);
          }
        }

        if(gets.body.width() <= 640){
          tabObject.style.width = '26.66%';
        }
        if(gets.body.width() <= 480){
          tabObject.style.width = '40%';
        }

        //set tab function here
        tabObject.addEventListener('click',()=>{

          //check for active tab
          if(router.track.tabs[tabsContId]['tab'] == tabId){
            return true;
          }

          //remove active class from active tab
          let activeTab = router.track.tabs[tabsContId]['tab'];
          if(options.activeTabClass){
            viewers.removeClass({id:activeTab,parent:'any',class:options.activeTabClass});
            viewers.addClass({id:tabId,parent:'any',class:options.activeTabClass});
          }

          //hide the active tab
          view.hide(router.track.tabs[tabsContId].module);

          //check if tab was buolt previously
          if(router.built.tab.indexOf(tabRef) >= 0){
            router.track.tabs[tabsContId]['module'] = tabRef;
            router.track.tabs[tabsContId]['tab'] = tabId;
            view.show(tabRef);
            return true;
          } else {
            tab.module.init(moduleContId);
          }

          //set comp router tags
          router.track.tabs[tabsContId] = {module:tabRef,tab:tabId};
          router.built.tab.push(tabRef);

        });

        //add tab to linsk cont here


      }
    }
    //for loop ends here

    let nodes = linksCont.childNodes;
    let lastNode = nodes[nodes.length - 1];

    //left button
    let leftButton = document.createElement('div');
    leftButton.id = linksContId + '-button-left';
    leftButton.style.float = 'left';
    leftButton.style.width = '10%';
    if(options.navButtonClass){
      leftButton.className = options.navButtonClass;
    }
    if(gets.body.width() > 640){
      leftButton.style.display = 'none';
    }
    leftButton.innerHTML = '<i class="material-icons">keyboard_arrow_left</i>';
    linksCont.insertBefore(leftButton,nodes[0]);

    //right button
    let rightButton = document.createElement('div');
    rightButton.id = linksContId + '-button-right';
    rightButton.style.float = 'left';
    rightButton.style.width = '10%';
    if(options.navButtonClass){
      rightButton.className = options.navButtonClass;
    }
    if(gets.body.width() > 640){
      rightButton.style.display = 'none';
    }
    rightButton.innerHTML = '<i class="material-icons">keyboard_arrow_right</i>';
    linksCont.appendChild(rightButton);

    //display
    if(linksCont.scrollHeight > 50){

      rightButton.style.display = 'block';
      leftButton.style.display = 'block';

      //while loop counter
      let count = 2;

      //remove the excess tabs
      while(linksCont.scrollHeight > 50 && count <= 10){
        let hideThisTab = nodes[nodes.length - count];
        view.hide(hideThisTab.id);
        count++;
      }

      let firstTabIndex = 1;
      let nextTabIndex = nodes.length - count + 1;

      rightButton.addEventListener('click',()=>{
        if(nextTabIndex < nodes.length - 1){
          tabSlide(nodes[firstTabIndex].id,nodes[nextTabIndex].id);
          firstTabIndex++,nextTabIndex++;
        }
      });

      leftButton.addEventListener('click',()=>{
        if(firstTabIndex >= 2){
          firstTabIndex--,nextTabIndex--;
          tabSlide(nodes[nextTabIndex].id,nodes[firstTabIndex].id);
        }
      });

    }

    function tabSlide(hide,show){
      view.hide(hide);
      view.show(show);
    }

    if(activated == false){
      return common.error('no_found-active_tab');
    } else {
      return tabsContId;
    }

  }

};
