"use strict"

module.exports = {

  tabs : function(parent,moduleCont,tabs,clickFunction,activeFunction,idleClass,activeClass,navButtonClass){

    let tab_style = 'float:left;';
    if(engine.get.body.width() <= 640){
      tab_style += 'width:26.66%;';
    }
    if(engine.get.body.width() <= 480){
      tab_style += 'width:40%;';
    }
    if(engine.get.body.width() > 640 && tabs.length <= 6){
      tab_style += 'width:auto;';
    }

    let tab_ids = [],linksCont,nodes,firstTabIndex,nextTabIndex,count = 2,hidden_count = 0,total_nodes,visible;

    const leftButton = engine.make.div({
      parent:parent,
      text:'&#8619;',
      style:'width:10%;float:left;display:none;',
      class:navButtonClass,
      function:()=>{
        if(firstTabIndex > 1){
          engine.view.hide(nodes[nextTabIndex].id);
          firstTabIndex--;
          nextTabIndex--;
          engine.view.show(nodes[firstTabIndex].id);
        }
      }
    });

    for(const tab of tabs){

      if(tab.value && tab.module){

        let tabRef = parent + tab.module.ref;
        let data = null;
        if(tab.data){
          data = tab.data;
        }

        const tabId = engine.make.button({
          parent:parent,
          value:tab.value,
          style:tab_style,
          class:idleClass,
          function:()=>{

            //check for active tab
            if(engine.router.track.tabs[parent]['tab'] == tabId){
              return true;
            }

            //remove active class from active tab
            let activeTab = engine.router.track.tabs[parent]['tab'];
            if(activeClass){
              engine.make.removeClass({id:activeTab,parent:'any',class:activeClass});
              engine.make.addClass({id:tabId,parent:'any',class:activeClass});
            } else {
              engine.make.removeClass({id:activeTab,parent:'any',class:'tab-active'});
              engine.make.addClass({id:tabId,parent:'any',class:'tab-active'});
            }

            clickFunction(tabId,tab.module,data,moduleCont);

            //set comp router tags
            engine.router.track.tabs[parent] = {module:tabRef,tab:tabId};
            engine.router.built.tab.push(tabRef);

          }
        });

        tab_ids.push(tabId);

        //set active tab class here
        if(tab.active){
          if(tab.active == true){
            //set router tabs track catalog here
            engine.router.track.tabs[parent] = {module:tabRef,tab:tabId};
            engine.router.built.tab.push(tabRef);
            if(activeClass){
              engine.make.addClass({id:tabId,parent:'any',class:activeClass});
            } else {
              engine.make.addClass({id:tabId,parent:'any',class:'tab-active'});
            }
            if(activeFunction){
              activeFunction(tabId,tab.module,data,moduleCont);
            }
          }
        }

      }//tab object check

    }//loop ends here

    linksCont = document.getElementById(parent);
    nodes = linksCont.childNodes;
    total_nodes = nodes.length;
    firstTabIndex = 1;
    nextTabIndex = nodes.length - count + 1;

    const rightButton = engine.make.div({
      parent:parent,
      text:'&#8620;',
      style:'width:10%;float:left;display:none;',
      class:navButtonClass,
      function:()=>{
        if(firstTabIndex + visible <= total_nodes - 1){
          nextTabIndex = firstTabIndex + visible;
          if(nodes[nextTabIndex]){
            engine.view.hide(nodes[firstTabIndex].id);
            engine.view.show(nodes[nextTabIndex].id);
            firstTabIndex++;
          }
        }
      }
    });

    if(linksCont.scrollHeight > 50){
      while(linksCont.scrollHeight > 50 && count < nodes.length){
        let hideThisTab = nodes[nodes.length - count];
        engine.view.hide(hideThisTab.id);
        count++;
        hidden_count++;
      }
      engine.view.show(leftButton);
      engine.view.show(rightButton);
    }

    visible = total_nodes - hidden_count - 1;

    return true;

  }

}
