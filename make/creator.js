
let os,platform,variableChecked;

function extract_translations(read){
  let started = false;
  let index = 0;
  let collect = [];
  let build = '';
  for(let i=0;i<read.length;i++){
      let char = read[i];
      if(started && char !== "]"){
          build += char;
      }
      if(char === "$" && !started){
          if(
              read[i+1] === 'T' && 
              read[i+2] === 'S' && 
              read[i+3] === '['
          ){
              started = true;
              i += 3;
          }
      }
      if(started && char === "]"){
          if(
              read[i+1] === 'T' && 
              read[i+2] === 'S' && 
              read[i+3] === '$'
          ){
              started = false;
              collect.push(build);
              i += 3;
              build = '';
          }
      }
      index++;
  }
  return collect;
}

function translate(options){
  let keys = ['text','value','placeholder','input'];
  for(let key of keys){
    if(options.hasOwnProperty(key)){
      if(typeof(options[key] === "string")){
        if(options[key].includes("$TS[")){
          let value = options[key];
          const translations = extract_translations(options[key]);
          while(value.includes("$TS[")){
            value = value.replace("$TS[","");
          } 
          while(value.includes("]TS$")){
            value = value.replace("]TS$","");
          }
          for(let item of translations){
            if(window.veganaLanguagePack){
              if(window.veganaLanguagePack.dict[item]){
                value = value.replace(item,window.veganaLanguagePack.dict[item]);
              }
            }
          }
          options[key] = value;
        }
      }
    }
  }
  return options;
}

module.exports = (tag,options)=>{

  if(!os || !platform){
    os = engine.get.os(),
    platform = engine.get.platform(),
    variableChecked = engine.static.add.js.variableChecked;
  }

  if(
    !tag || typeof(tag) !== "string" || tag.length === 0 ||
    typeof(options) !== 'object' ||
    (
      typeof(options.parent) !== 'string' &&
      typeof(options.p) !== 'string' &&
      typeof(options.parent_tag) !== 'string'
    )
  ){
    console.log(tag,options);
    return engine.common.error('invalid_object/parent_value/tag');
  }

  //****************************************
  //static check
  //****************************************

  if((options.static || options.s) && !is_static){
    return;
  }

  //****************************************
  //get parent
  //****************************************

  let get = document.getElementById(options.parent || options.p);
  if(!get){
    get = document.getElementsByTagName(options.parent || options.p);
    if(get.length > 0){get = get[0];}
  }
  if(!get || get.length === 0){
    return engine.common.error('invalid_parent',options);
  }

  //****************************************
  //make element
  //****************************************

  // if(!options.id){
  //   options.id = engine.uniqid();
  // }
  if(options.translate || options.t){
    options = translate(options);
  }
  let id;
  let get_uid = engine.make.get_uid;
  if(options.only_id && options.id){
    id = options.id;
  } else if(options.id){
    id = `${get_uid()}-${options.id}`;
  } else {
    id = get_uid();
  }

  let object = document.createElement(tag);
  object.id = id;
  
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

  for(var i in options){
    if(
      i !== 'function' &&
      i !== 'functionData' &&
      i !== 'events' &&
      i !== 'event' &&
      i !== 'text' &&
      i !== 'style' &&
      i !== 'data' &&
      i !== 'options' &&
      i !== 'parent' &&
      i !== 'p' &&
      i !== 'tag' &&
      i !== 'list_id' &&
      i !== 'id' &&
      i !== 'touch' &&
      i !== 'timer' &&
      i !== "only_id" &&
      i !== 'draw'
    ){
      if(options[i]){
        object[i] = options[i];
      }
    }
  }

  //****************************************
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

  //****************************************
  //all styles are resolved here
  //****************************************

  let style = {};

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

    style = engine.make.integrate_objects(
      style,
      draw
    );

  }

  if(options.style){
    style = engine.make.integrate_objects(
      style,
      options.style
    );
  }

  if(options.styles){
    style = engine.make.integrate_objects(
      style,
      engine.make.styles.build_styles(options.styles)
    );
  }

  if(style instanceof Object){
    object.style = draw_as_string(style);
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

  //****************************************
  //functions events
  //****************************************

  if(is_static){
    if(options.functionData){
      options.functionData = engine.static.add.js.variable(null,options.functionData);
    }
    if(options.funcData){
      options.functionData = engine.static.add.js.variable(null,options.funcData);
    }
  }

  if(options.function){
    if(is_static){
      options.function = engine.static.add.js.function(null,options.function);
      engine.static.add.js.call(`${get_event_function_id()}(${variableChecked(object.id)},"${tag}",${options.function},${options.functionData},document.getElementById(${variableChecked(object.id)}),"${options.type}")`);
    } else {
      event_function(
        id,tag,options.function,options.funcData || options.functionData,object,options.type,typeof(options.tabIndex) === "string"
      );
    }
  }

  //****************************************
  //custom events and expire

  if(options.event && options.events){
    engine.common.error('invalid_config=>event&&events__cannot_co_exists',options);
  }

  if(options.events && !options.event){
    for(let e of options.events){
      if(
        typeof(e) === 'object' &&
        typeof(e.event) === 'string' &&
        typeof(e.function) === 'function'
      ){
        let n = engine.make.eventName(e.event);
        if(is_static){
          const funcName = engine.static.add.js.function(null,e.function);
          object.addEventListener(n,`(a)=>{
            ${funcName}(${variableChecked(object.id)},${options.functionData},a);
          }`);
        } else {
          object.addEventListener(n,(evt)=>{
            e.function(object.id,options.functionData,evt);
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
      let n = engine.make.eventName(options.event.type);
      if(is_static){
        const funcName = engine.static.add.js.function(null,options.event.function);
        object.addEventListener(n,`(e)=>{
          ${funcName}(${variableChecked(object.id)},${options.functionData},e);
        }`);
      } else {
        object.addEventListener(n,(e)=>{
          options.event.function(object.id,options.functionData,e);
        });
      }
    }
  }

  //****************************************
  //expire functions

  if(options.expire && typeof(options.expire) == 'number' && options.expire > 1000){
    if(is_static){
      let expire_function_id = get_expire_function_id();
      engine.static.add.js.call(`${expire_function_id}(${variableChecked(object.id)},${options.expire})`);
    } else {
      expire_function(
        object.id,options.expire
      );
    }
  }

  //****************************************
  //touch func

  if(options.touch){
    if(is_static){
      const inputFunctionName = engine.static.add.js.function(null,options.touch);
      engine.static.add.js.call(`${get_touch_function_id()}(${variableChecked(object.id)},document.getElementById(${variableChecked(object.id)}),${inputFunctionName},${options.functionData});`);
    } else {
      touch_function(
        object.id,object,options.touch,options.functionData || options.funcData
      );
    }
  }

  //****************************************
  //timer

  if(options.timer){
    if(options.timer.time && options.timer.function){
      if(is_static){
        const inputFunctionName = engine.static.add.js.function(null,options.timer.function);
        engine.static.add.js.call(`${get_timer_function_id()}(${variableChecked(object.id)},document.getElementById(${variableChecked(object.id)}),${options.functionData},${options.timer.time},${inputFunctionName});`);
      } else {
        timer_function(
          object.id,object,options.functionData || options.funcData,
          options.timer.time,options.timer.function
        );
      }
    }
  }

  //****************************************
  //add to document
  //****************************************

  if(options.position){
    get.insertAdjacentElement(options.position,object);
  } else {
    get.appendChild(object);
  }

  return object.id;

}

let timer_function_id;
function get_timer_function_id(){
  if(timer_function_id){return timer_function_id;}
  timer_function_id = engine.static.add.js.function(null,timer_function);
  return timer_function_id;
}

let expire_function_id;
function get_expire_function_id(){
  if(expire_function_id){return expire_function_id;}
  expire_function_id = engine.static.add.js.function(null,expire_function);
  return expire_function_id;
}

let touch_function_id;
function get_touch_function_id(){
  if(touch_function_id){return touch_function_id;}
  touch_function_id = engine.static.add.js.function(null,touch_function);
  return touch_function_id;
}

let event_function_id;
function get_event_function_id(){
  if(event_function_id){return event_function_id;}
  event_function_id = engine.static.add.js.function(null,event_function);
  return event_function_id;
}

function event_function(id,tag,func,funcData,object,type,tabIndex){
  let default_event = 'click';
  if((tag == 'input' || tag == 'textarea') && type !== 'button'){
    default_event = 'input'
  }
  if(tag === "select"){default_event = 'change';}
  if(func && tag !== 'ol' && tag !== 'ul'){
    object.addEventListener(default_event,(eve)=>{
      if(tag !== "input" && tag !== "textarea" && tag !== "select"){
        func(id,funcData,eve);
      } else if(type === "string" || tag === "textarea"){
        func(id,String(object.value),funcData,eve);
      } else if(type === "number"){
        func(id,Number(object.value),funcData,eve);
      } else if(type === "file"){
        func(id,object.files,funcData,eve);
      } else if(type === "checkbox"){
        func(id,object.checked,funcData,eve);
      } else {
        func(id,object.value,funcData,eve);
      }
    });
  }
  if(tabIndex && (
    tag === "div"
    || tag === "image"
    || tag === "span"
    || tag === "button"
  )){
    object.addEventListener("keypress",(eve)=>{
      if(
        eve.keyCode === 13 ||
        eve.charCode === 32
      ){
        func(id,funcData,eve);
      }
    });
  }
}

const expire_function = (id,time)=>{
  setTimeout(()=>{
    engine.view.remove(id);
  }, time);
}

const timer_function = (id,object,data,time,func)=>{
  let timer_started = false,timer_timeout;
  object.addEventListener("mousedown",(eve)=>{
    timer_started = true;
    timer_timeout = setTimeout(function(){
      timer_started = false;
      func(id,data);
    }, time);
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

const touch_function = (id,object,func,data)=>{
  let startTime;
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
    func(id,process,data,eve);
  });
  object.addEventListener("touchend",(eve)=>{
    if(!startX || !startY){startX = lastX,startY = lastY;return;}
    const process = process_move(startX,startY,lastX,lastY,"end",startTime);
    func(id,process,data,eve);
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
    func(id,process,data,eve);
  };
  const end = (eve)=>{
    if(!startX || !startY){startX = lastX,startY = lastY;return;}
    const process = process_move(startX,startY,lastX,lastY,"end",startTime);
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", end);
    func(id,process,data,eve);
  };
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
}
