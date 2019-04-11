const common = require('../../common');
const checkBaseOptions = require('../check').check;
const view = require('../../view');
const router = require('../../router');
const gets = require('../../get');
const log = false;
const viewers = require('../viewers');

module.exports = reduce;

function reduce(parent,navButtonClass){

  common.tell('reducing tabs',log);

  //check parent
  let linksCont = document.getElementById(parent);
  if(linksCont == null){
    return common.error('invalid_parent');
  }
  let linksContId = linksCont.id;

  if(!linksCont.length){
    if(linksCont.length == 0){
      return common.error('invalid_length-linksCont');
    }
  }

  let nodes = linksCont.childNodes;
  let lastNode = nodes[nodes.length - 1];

  //left button
  let leftButton = document.createElement('div');
  leftButton.id = linksContId + '-button-left';
  leftButton.style.float = 'left';
  leftButton.style.width = '10%';
  if(navButtonClass){
    leftButton.className = navButtonClass;
  }
  if(gets.body.width() > 640){
    leftButton.style.display = 'none';
  }
  leftButton.innerHTML = '&#8619;';
  linksCont.insertBefore(leftButton,nodes[0]);

  //right button
  let rightButton = document.createElement('div');
  rightButton.id = linksContId + '-button-right';
  rightButton.style.float = 'left';
  rightButton.style.width = '10%';
  if(navButtonClass){
    rightButton.className = navButtonClass;
  }
  if(gets.body.width() > 640){
    rightButton.style.display = 'none';
  }
  rightButton.innerHTML = '&#8620;';
  linksCont.appendChild(rightButton);

  if(linksCont.scrollHeight > 50){

    rightButton.style.display = 'block';
    leftButton.style.display = 'block';

    //while loop counter
    let count = 2;

    //remove the excess tabs
    while(linksCont.scrollHeight > 50 && count < nodes.length){
      let hideThisTab = nodes[nodes.length - count];
      view.hide(hideThisTab.id);
      count++;
    }

    function tabSlide(hide,show){
      view.hide(hide);
      view.show(show);
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
  //if statement ends here

  return true;

}
