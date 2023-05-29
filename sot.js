

module.exports = {
    new:new_sot
};

function new_sot(){

    let object = {};
    let functions = [];

    function update(){
        for(let func of functions){
            if(typeof(func) === "function"){func();}
        }
    }

    return {
        listen:(func)=>{
            if(typeof(func) === "function"){functions.push(func);return true;} 
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
        }
    };

}

