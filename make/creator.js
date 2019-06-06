const common = require('../common');
const checkBaseOptions = require('./check').check;
const httpMarker = 'http://';
let scollers = {};
let keepScoller = [];
let scoll_direction = 'down';
let last_scroll_position = window.pageYOffset;
let showing = {};
let exit = {};

window.addEventListener('scroll', ()=>{

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
    }

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

  }//loop ends here

  function process_enter(id){
    if(showing[id] == true){return false;}
    showing[id] = true;
    let func = scollers[id]
    if(typeof(func) == 'function'){func(id);}
    if(keepScoller.indexOf(id) < 0 && exit.hasOwnProperty(id) == false){
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
    if(keepScoller.indexOf(id) < 0){
      delete scollers[id];
      delete showing[id];
      delete exit[id];
    }
    return true;
  }

  last_scroll_position = current_scroll_position;

});

module.exports = (tag,options)=>{

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
    if(options.keepScoller && options.keepScoller == true){
      if(keepScoller.indexOf(id) < 0){
        keepScoller.push(id);
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
    if(options.keepScoller && options.keepScoller == true){
      if(keepScoller.indexOf(id) < 0){
        keepScoller.push(id);
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

  if(options.text && typeof(options.text) == 'string'){
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
      i !== 'id'
    ){
      object[i] = options[i];
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
        object.add(option);
      }
    }
  }


  let default_event = 'click';
  if(tag == 'input' && options.type !== 'button'){
    default_event = 'input'
  }
  if(options.function && tag !== 'ol' && tag !== 'ul'){
    object.addEventListener(default_event,(e)=>{
      options.function(object,options.functionData,e);
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
          object.addEventListener(e.event,()=>{
            e.function(object.id)
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
      object.addEventListener(options.event.type,()=>{
        options.event.function(object.id)
      });
    }
  }

  get.appendChild(object);
  return object.id;

}
