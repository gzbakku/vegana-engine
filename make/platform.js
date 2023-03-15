

module.exports = {
    is_platform_type:is_platform_type,
    resolve:resolve,
    parse_viewport:parse_viewport
};

function parse_viewport(key){
    let regex = /(\d+)x(\d+)/;
    let hold = regex.test(key);
    if(!hold){return false;}
    hold = key.split("x");
    let h = Number(hold[0]);
    let w = Number(hold[1]);
    let b = h > w ? h : w;
    let s = h > w? w : h; 
    let o = h > w? "portrait" : "landscape";
    return {height:h,width:w,biggest:b,smallest:s,orientation:o};
}

function resolve(data){

    let os = engine.get.os();
    let device = engine.get.platform("device");
    let native = engine.get.platform("native");
    let web = !native && !is_static;
    let cordova = engine.get.platform("cordova");
    let electron = engine.get.platform("electron");

    let children = data;
    let path = [];

    let native_found = false;
    if(native && children.native){
        path.push("native");
        children = children.native;
        if(cordova && children.cordova){children = children.cordova;path.push("cordova");}
        if(electron && children.electron){children = children.electron;path.push("electron");}
        if(children[os]){children = children[os];path.push(os);}
        if(children[device]){children = children[device];path.push(device);} else 
        if(children.all){children = children.all;path.push("all");}
        native_found = true;
    }
    
    let web_found = false;
    if(web && children.web){
        path.push("web");
        children = children.web;
        if(children[device]){children = children[device];path.push(device);}
        web_found = true;
    }

    if(
        ((native && !native_found) || (web && !web_found)) && children.all
    ){
        path.push("all");
        children = children.all;
        if(children[device]){children = children[device];path.push(device);}
    }

    return {
        data:children,
        path:path
    };

}

function is_platform_type(data){
    if(
        data.all instanceof Object ||
        data.mobile instanceof Object ||
        data.tablet instanceof Object ||
        data.pc instanceof Object ||
        data.native instanceof Object ||
        data.web instanceof Object
    ){
        return true;
    } else {
        return false;
    }
}