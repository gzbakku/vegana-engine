

module.exports = {
    delete:deleteCookie,
    set:setCookie,
    get:getCookie,
    get_all:getCookies
};

function deleteCookie(key){
    let build = `${key}=_; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    if(is_static){
        return engine.static.add.js.call(`document.cookie = "${build}"`);
    }
    document.cookie = build;
}

function setCookie(key,value,expire,path,SameSite){
    let build = `${key}=${value};`;
    if(expire){
        let d = new Date();
        d.setTime(d.getTime() + (expire));
        let expires = "expires="+ d.toUTCString();
        build += `${expires};`;
    }
    if(!SameSite){SameSite = 'Lax';}
    build += `SameSite=${SameSite};`;
    if(path){
        build += `path=${path}`;
    } else {
        build += `path=/`;
    }
    if(is_static){
        return engine.static.add.js.call(`document.cookie = "${build}"`);
    }
    document.cookie = build;
}

function getCookie(key){
    let all = getCookies();
    return all[key];
}

function getCookies(){
    let collect = {};
    for(let item of document.cookie.split(";")){
        let hold = item.split("=");
        let key = hold[0];
        if(key[0] === " "){key = key.trim();}
        collect[key] = hold[1];
    }
    return collect;
}