const common = require('../common');
const checkBaseOptions = require('./check').check;
const httpMarker = 'http://';
const body = document.getElementsByTagName("BODY")[0];
let scollers = {};
let keepScroller = [];
let scoll_direction = 'down';
let last_scroll_position = window.pageYOffset;
let showing = {};
let exit = {};
let os,platform;

window.addEventListener('scroll', scrollFunction);

function scrollFunction(){

  let keys = Object.keys(scollers);
  let windowHeight = window.innerHeight;

  let current_scroll_position = window.pageYOffset;
  if(current_scroll_position < last_scroll_position){
    scoll_direction = 'up';
  } else {
    scoll_direction = 'down';
  }
  let view_count = windowHeight + current_scroll_position;

  for(var id in scollers){

    let e = document.getElementById(id);
    if(!e){
      delete scollers[id];
    } else {

      if(!showing.hasOwnProperty(id)){
        showing[id] = false;
      }

      let positionFromBottom = e.getBoundingClientRect().bottom;
      let positionFromTop = e.getBoundingClientRect().top;

      let bottom_diff = windowHeight - positionFromBottom;
      let top_diff = windowHeight - positionFromTop;

      if(scoll_direction == 'up'){
        if(positionFromBottom >= 0 && bottom_diff >= 0 && showing[id] == false){
          process_enter(id);
        }
        if(top_diff < 0){
          process_exit(id);
        }
      }

      if(scoll_direction == 'down'){
        if(top_diff >= 0 && positionFromBottom >= 0 && showing[id] == false){
          process_enter(id);
        }
        if(positionFromBottom <= 0){
          process_exit(id);
        }
      }

    }



  }//loop ends here

  function process_enter(id){
    if(showing[id] == true){return false;}
    showing[id] = true;
    let func = scollers[id]
    if(typeof(func) == 'function'){func(id);}
    if(keepScroller.indexOf(id) < 0 && exit.hasOwnProperty(id) == false){
      delete scollers[id];
      delete showing[id];
    }
    return true;
  }

  function process_exit(id){
    if(showing[id] == false){return false;}
    showing[id] = false;
    let func = exit[id]
    if(typeof(func) == 'function'){func(id);}
    if(keepScroller.indexOf(id) < 0){
      delete scollers[id];
      delete showing[id];
      delete exit[id];
    }
    return true;
  }

  last_scroll_position = current_scroll_position;

};

module.exports = (tag,options)=>{

  if(!os || !platform){
    os = engine.get.os(),platform = engine.get.platform();
  }

  //check options object
  let check = checkBaseOptions(options);
  if(check == false){
    return common.error('invalid_options',options);
  }

  if(!options.id){
    options.id = engine.uniqid();
  }

  //check parent
  let get = document.getElementById(options.parent);
  if(get == null){
    return common.error('invalid_parent',options);
  }

  //make element
  let id = options.parent + '-' + tag + '-' + options.id;
  let object = document.createElement(tag);
  object.id = id;

  if(options.enter){
    if(!scollers.hasOwnProperty(id)){
      scollers[id] = options.enter;
    }
    if(options.keepScroller && options.keepScroller == true){
      if(keepScroller.indexOf(id) < 0){
        keepScroller.push(id);
      }
    }
  }

  if(options.exit){
    if(!scollers.hasOwnProperty(id)){
      if(!options.enter){
        scollers[id] = null;
      }
    }
    if(exit.hasOwnProperty(id) == false){
      exit[id] = options.exit;
    }
    if(options.keepScroller && options.keepScroller == true){
      if(keepScroller.indexOf(id) < 0){
        keepScroller.push(id);
      }
    }
  }

  if(options.class){
    object.className = options.class;
  } else {
    if(tag == 'input' && options.type !== 'button'){
      object.className = 'form-input';
    }
    if(tag == 'select'){
      object.className = 'form-select';
    }
    if(tag == 'checkbox'){
      object.className = 'form-checkbox';
    }
    if(tag == 'input' && options.type == 'button'){
      object.className = 'form-button';
    }
  }

  if(options.hasOwnProperty('text') && options.text !== undefined && options.text !== null){
    object.innerHTML = options.text;
  }
  if(options.style){
    object.style = options.style;
  }

  for(var i in options){
    if(
      i !== 'function' &&
      i !== 'events' &&
      i !== 'event' &&
      i !== 'text' &&
      i !== 'style' &&
      i !== 'class' &&
      i !== 'parent' &&
      i !== 'tag' &&
      i !== 'list_id' &&
      i !== 'id' &&
      i !== 'draw'
    ){
      if(options[i]){
        object[i] = options[i];
      }
    }
  }

  //select items
  if(options.options && typeof(options.options) == 'object' && options.options.length > 0){
    for(var i=0;i<options.options.length;i++){
      let data = options.options[i];
      if(data.text && data.value !== 'undefined'){
        let option = document.createElement("option");
        option.text = data.text;
        option.value = data.value;
        if(data.class){
          option.className = data.class;
        } else {
          option.className = 'form-select-item';
        }
        if(options.value !== undefined){
          if(options.value == data.value){
            option.selected = true;
          }
        }
        if(!data.hasOwnProperty('value') || data.disabled){
          option.disabled = true;
        }
        object.add(option);
      }
    }
  }


  let default_event = 'click';
  if((tag == 'input' || tag == 'textarea') && options.type !== 'button'){
    default_event = 'input'
  }
  if(options.function && tag !== 'ol' && tag !== 'ul'){
    object.addEventListener(default_event,(eve)=>{
      options.function(object,options.functionData,eve);
    });
  }

  if(options.event && options.events){
    common.error('invalid_config=>event&&events__cannot_co_exists',options);
  }

  if(options.events && !options.event){
    for(var i in options.events){
      let e = options.events[i];
      if(e.event && e.function){
        if(
          typeof(e.event) == 'string' &&
          typeof(e.function) == 'function'
        ){
          object.addEventListener(e.event,(eve)=>{
            e.function(object.id,eve)
          });
        }
      }
    }

  }

  if(options.event){
    if(
      typeof(options.event.type) == 'string' &&
      typeof(options.event.function) == 'function'
    ){
      object.addEventListener(options.event.type,(eve)=>{
        options.event.function(object.id,eve)
      });
    }
  }

  if(options.expire && typeof(options.expire) == 'number' && options.expire > 1000){
    setTimeout(function(){
      engine.view.remove(object.id);
      scrollFunction();
    }, options.expire);
  }

  if(options.position){
    get.insertAdjacentElement(options.position,object);
  } else {
    get.appendChild(object);
  }

  //***************************
  //draw here

  if(options.draw){

    let draw;
    if(options.draw.all){
      draw = options.draw.all;
    }
    if(platform === "pc" && options.draw.browser){
      if(options.draw.browser.pc){
        reduce_draw(draw,options.draw.browser.pc);
      }
    }
    if(platform === "mobile" && options.draw.browser){
      if(options.draw.browser.mobile){
        reduce_draw(draw,options.draw.browser.mobile);
      }
    }
    if(platform === "cordova" && options.draw.cordova){
      if(options.draw.cordova.all){
        reduce_draw(draw,options.draw.cordova.all);
      }
      if(os==="ios" && options.draw.cordova.ios){
        reduce_draw(draw,options.draw.cordova.ios);
      }
      if(os==="android" && options.draw.cordova.android){
        reduce_draw(draw,options.draw.cordova.android);
      }
    }
    if(platform === "electron" && options.draw.electron){
      if(options.draw.electron.all){
        reduce_draw(draw,options.draw.electron.all);
      }
      if(os==="windows" && options.draw.electron.windows){
        reduce_draw(draw,options.draw.electron.windows);
      }
      if(os==="linux" && options.draw.electron.linux){
        reduce_draw(draw,options.draw.electron.linux);
      }
      if(os==="mac" && options.draw.electron.mac){
        reduce_draw(draw,options.draw.electron.mac);
      }
    }

    object.style = draw_as_string(draw);

  }

  function reduce_draw(base,next){
    for(let k in next){
      if(next[k] === false){delete base[k];} else if(typeof(next[k]) === "string"){base[k] = next[k];}
    }
  }
  function draw_as_string(final){
    let collect = '';
    for(let k in final){
      collect += k + ":" + final[k] + ";"
    }
    return collect;
  }

  //***************************
  //touch func

  let startTime;

  if(options.hasOwnProperty("touch")){
    if(typeof(options.touch) == "function"){
      let startX,startY,lastX,lastY;
      object.addEventListener("touchstart",(eve)=>{
        x = eve.touches[0].clientX,y = eve.touches[0].clientY;
        startX = x;startY = y;
        startTime = new Date().getTime();
      });
      object.addEventListener("touchmove",(eve)=>{
        eve.preventDefault();
        x = eve.touches[0].clientX,y = eve.touches[0].clientY;
        if(!lastX || !lastY){lastX = x,lastY = y;return;}
        const process = process_move(startX,startY,x,y,"continue",startTime);
        lastX = process.posX,lastY = process.posY;
        options.touch(object.id,process,eve);
      });
      object.addEventListener("touchend",(eve)=>{
        if(!startX || !startY){startX = lastX,startY = lastY;return;}
        const process = process_move(startX,startY,lastX,lastY,"end",startTime);
        options.touch(object.id,process,eve);
      });
      object.addEventListener("mousedown",(eve)=>{
        startX = eve.clientX;startY = eve.clientY;
        startTime = new Date().getTime();
        document.addEventListener("mousemove",move);
        document.addEventListener("mouseup",end);
      });
      const move = (eve)=>{
        x = eve.clientX,y = eve.clientY;
        if(!lastX || !lastY){lastX = x,lastY = y;return;}
        const process = process_move(startX,startY,x,y,"continue",startTime);
        lastX = process.posX,lastY = process.posY;
        options.touch(object.id,process,eve);
      };
      const end = (eve)=>{
        if(!startX || !startY){startX = lastX,startY = lastY;return;}
        const process = process_move(startX,startY,lastX,lastY,"end",startTime);
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", end);
        options.touch(object.id,process,eve);
      };
    }
  }

  //****************************************
  //timer

  if(options.timer){
    if(options.timer.time && options.timer.function){
      let timer_started = false,timer_timeout;
      object.addEventListener("mousedown",(eve)=>{
        timer_started = true;
        timer_timeout = setTimeout(function () {
          timer_started = false;
          options.timer.function();
        }, options.timer.time);
      });
      object.addEventListener("mouseout",(eve)=>{
        if(!timer_started){return;} else {
          clearTimeout(timer_timeout);
        }
      });
      object.addEventListener("mouseup",(eve)=>{
        if(!timer_started){return;} else {
          clearTimeout(timer_timeout);
        }
      });
    }
  }

  scrollFunction();

  return object.id;

}

function process_move(lastX,lastY,x,y,type,startTime){
  let dirX = 'left',dirY = 'up',
  diffX = x - lastX,diffY = y - lastY,
  perc_x = Math.ceil((Math.abs(diffX) / screen.width) * 100),
  perc_y = Math.ceil((Math.abs(diffY) / screen.height) * 100);
  if(diffY === 0){dirY = 'none';}
  if(diffY > 0){dirY = 'down';}
  if(diffY < 0){dirY = 'up';}
  if(diffX === 0){dirX = 'none';}
  if(diffX > 0){dirX = 'right';}
  if(diffX < 0){dirX = 'left';}
  let now = new Date().getTime();
  let time_diff = now - startTime;
  let collect = {
    type:type,
    dirX:dirX,dirY:dirY,
    moveX:Math.abs(diffX),moveY:Math.abs(diffY),
    posX:x,posY:y,
    basePosX:lastX,
    basePosY:lastY,
    percX:perc_x,percY:perc_y,
    time:time_diff
  };
  return collect;
}
