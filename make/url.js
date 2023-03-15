

module.exports = {

    page:null,
    cont:null,
    panel:null,

    custom_native:[],
    params:{},

    reset:(type)=>{
        let url = engine.make.url;
        function r(){url.params = {};url.custom_native = [];}
        if(type === "page"){url.page = null;r();}
        if(type === "page" || type === "cont"){url.cont = null;r();}
        if(type === "page" || type === "cont" || type === "panel"){url.panel = null;r();}
        if(type === "custom_native"){url.custom_native = [];}
        if(type === "params"){url.params = {};}
    },

    replace:(url)=>{
        window.history.replaceState("object or string", null, url);
    },

    push_to_url:(url,a)=>{
        // console.log({push_to_url:url,a:a});
        engine.router.closeures.push(url);
        window.history.pushState("object or string", null, url);
        set();
    },

    push:()=>{
        let build = build_url_string(true);
        engine.make.url.push_to_url(build,"b");
    },

    update:(type,data,push)=>{
        // console.log({url_update_push:push});
        let url = engine.make.url;
        function checked(v,c){return v.includes(c) ? v.replace(c,'') : v;}
        if(type === "page"){url.reset("page");url.page = checked(data,"Page");}
        if(type === "cont"){url.reset("cont");url.cont = checked(data,"Cont");}
        if(type === "panel"){url.reset("panel");url.panel = checked(data,"Panel");}
        if(type === "custom_native"){url.custom_native.push(data);}
        if(type === "params"){url.params[data.key] = data.value;}
        if(push){
            url.push_to_url(build_url_string(),"a");
        } else {
            url.replace(build_url_string());
        }
    },

    build_url_string:build_url_string,

    update_from_string:update_from_string,

    parse:parse,

    set:set,

    get:get,

    url_for_mod:{},

};

function update_from_string(url_string,push_url,replace_url){
    let url = engine.make.url;
    let parsed = url.parse(url_string);
    if(parsed.page){url.update("page",parsed.page);}
    if(parsed.cont){url.update("cont",parsed.cont);}
    if(parsed.panel){url.update("panel",parsed.panel);}
    if(parsed.custom_native){url.custom_native = parsed.custom_native;}
    if(parsed.params){url.params = parsed.params;}
    if(push_url){url.push_to_url(url_string);} else 
    if(replace_url){url.replace(url_string);}
}

function get(id){
    // console.log("------------------\nget\n");
    // console.log({i:id});
    return engine.make.url.url_for_mod[id];
}

function set(){
    // console.log("set");
    // console.log("------------------\nset\n");
    let url = engine.make.url;
    let url_string = build_url_string();
    let nav = engine.router.navigate;
    let active = engine.router.active;
    let url_for_mod = url.url_for_mod;
    function add_checked(type){
        let router_id = nav.get_router_id(type);
        if(router_id){
            let active_id = active.routers[router_id];
            // console.log({r:router_id,a:active_id,t:type,s:url_string});
            if(active_id){url_for_mod[active_id] = url_string;}
        }
    }
    if(url.page){add_checked("page");}
    if(url.cont){add_checked("cont");}
    if(url.panel){add_checked("panel");}
}

function parse(url){

    if(!url){url = engine.get.url();}

    // console.log({url:url,w:window.location?true:false});

    function remove(item){
        if(!item || item.length === 0){return;}
        while(url.includes(item)){
            url = url.replace(item,'')
        }
    }
    let location = window.location;
    remove(location.protocol);
    remove(location.hostname);
    remove(location.port);
    remove("//");
    remove(":");

    console.log({url1:url});

    let params = {};
    if(url.includes("?")){
        let hold = url.split("?");
        url = url.replace(`?${hold[1]}`,"");
        hold = hold[1].split("&");
        for(let item of hold){
            if(item.includes("=")){
                let here = item.split("=");
                params[here[0]] = here[1];
            }
        }
    }

    let hold = url.split("/");
    let primary = [];
    let secondary = [];
    let primary_ended = false;
    for(let item of hold){
        if(item.length > 0){
            if(item === "c+"){
                primary_ended = true;
            } else {
                if(primary_ended){
                    secondary.push(item);
                } else {
                    primary.push(item);
                }
            }
        }
    }

    let page = null,cont=null,panel=null;
    function add_checked(a,b){return a.includes(b) ? a : `${a}${b}`}
    if(primary.length > 0){
        page = add_checked(primary[0],"Page");
        if(primary.length >= 2){
            cont = add_checked(primary[1],"Cont");
        }
        if(primary.length >= 3){
            panel = add_checked(primary[2],"Panel");
        }
    }

    let build = {
        page:page,cont:cont,panel:panel,
        custom_native:secondary,params:params
    };

    return build;

}

function build_url_string(log){
    let url = engine.make.url;
    let build = ``;
    if(url.page){build += `/${url.page}`;}
    if(url.cont){build += `/${url.cont}`;}
    if(url.panel){build += `/${url.panel}`;}
    if(url.custom_native.length > 0){
        build += `/c+`;
        for(let item of url.custom_native){
            build += `/${item}`;
        }
    }
    if(Object.keys(url.params).length > 0){
        let params = ``;
        for(let key in url.params){
            if(params.length > 0){params += `&`;}
            params += `${key}=${url.params[key]}`;
        }
        build += `?${params}`;
    }
    return build;
}