

module.exports = {
    new:new_sot,
    id:()=>{
        let id = engine.uniqid();
        if(!engine.sote_events){
            engine.sote_events = {};
        }
        engine.sote_events[id] = build();
        return id;
    },
    get:(id)=>{
        return engine.sote_events[id];
    }
};

function new_sot(){
    let id = engine.uniqid();
    if(!engine.sote_events){
        engine.sote_events = {};
    }
    engine.sote_events[id] = build();
    return engine.sote_events[id];
}

function build(){

    if(!engine.sote_events){
        engine.sote_events = {};
        // engine.sote_events_data = {};
    }

    let object = {};
    let functions = [];
    
    function update(){
        for(let func of functions){
            if(typeof(func) === "function"){func();}
        }
    }

    let builder = {
        listen:(func)=>{
            if(typeof(func) === "function"){
                functions.push(func);
                return true;
            } 
            return false;
        },
        get:(key)=>{
            return object[key];
        },
        set:(key,value)=>{
            object[key] = value;
            update();
        },
        update:(value)=>{
            if(!(value instanceof Object)){return false;}
            object = value;
            update();
            return true;
        },
        delete:()=>{
            delete engine.sote_events[id];
        }
    };

    return builder;

}

