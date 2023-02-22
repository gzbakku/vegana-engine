

module.exports = {init:init,str_match:str_match};

function init(data,query){

    let uc = engine.uniqid();
    data.primary = engine.make.div({
        parent:data.parent,
        class:`${uc}`,
    });
    data.class = uc;

    const row_regex = /r:([\w\s]+)/;
    const column_regex = /c:([\w\s]+)/;
    const grid_regex = /g([\d]+)/;
    const id_regex = /#([\d]+)/;
    function parse_key(key){
        let hold = key.split("=");
        let features = {id:null,multiple:false,row:null,column:null};
        for(let feature of hold[0].split("*")){
            if(row_regex.test(feature)){
                feature = feature.replace("r:","");
                features.row = feature; 
            } else if(column_regex.test(feature)){
                feature = feature.replace("c:","");
                features.column = feature; 
            } else if(grid_regex.test(feature)){
                feature = feature.replace("g","");
                features.grid = Number(feature); 
            } else if(id_regex.test(feature)){
                feature = feature.replace("#","");
                features.id = Number(feature); 
            } else if(feature === "m"){
                features.multiple = true;
            }
        }
        return {
            key:key,
            features:features,
            path:parse_path(hold[1])
        };
    }

    let keys = [];
    let keys_log = {};
    function parse_keys(){
        for(let key in query.layout){
            let parsed = parse_key(key);
            keys_log[parsed.features.id] = parsed;
            keys.push(parsed.features.id);
        }
        keys.sort();
    };parse_keys();

    data.find_builder = (full_path)=>{
        for(let key in data.builders){
            if(str_match(full_path,key)){
                return data.builders[key];
            }
        }
        return false;
    }

    data.find_style = (full_path)=>{
        for(let key in query.styles){
            if(str_match(full_path,key)){
                return query.styles[key];
            }
        }
        return false;
    }

    let index = 1;
    let map = {addresses:{},build:{
        children:{}
    }};
    for(let key of keys){
        let full_key = keys_log[key];
        map = build_block(
            full_key,
            query,
            Object.assign({},map),
            data
        );
        if(map instanceof engine.common.Error){
            return map;
        }
        if(index === 10){break}
        index += 1;
    }

    return map;

}

function parse_path(hold){
    let path = [];
    for(let item of hold.split("-")){path.push(item);}
    return path;
}

//matches partial second string to first starting by the right side
function str_match(one,two){
    if(one.length < two.length){return false;}
    let start = one.length - two.length;
    for(let i=0;i<two.length;i++){
        let n = start + i;
        let o = one[n];
        let t = two[i];
        if(o !== t){return false;}
    }
    return true;
}

function build_block(key,query,map,data){

    let build_path = '';
    for(let i=0;i<key.path.length;i++){
        let item = key.path[i];
        let last = i === key.path.length-1 ? true : false;
        map = build_element(
            build_path,
            item,
            last,
            map,
            data,
            key,
            query
        );
        if(map instanceof engine.common.Error){
            console.error("!!! failed build sub path");
            return b;
        }
        build_path += build_path.length > 0 ? `-${item}` : `${item}`;
    }

    for(let item of query.layout[key.key]){
        if(item.includes("-")){
            let local_path = build_path;
            for(let k of item.split("-")){
                map = build_element(
                    local_path,
                    k,
                    null,
                    map,
                    data,
                    key,
                    query
                );
                if(map instanceof engine.common.Error){
                    console.error("!!! failed build sub path");
                    return b;
                }
                local_path += local_path.length > 0 ? `-${k}` : `${k}`;
            }
        } else {
            map = build_element(
                build_path,
                item,
                null,
                map,
                data,
                key,
                query
            );
            if(map instanceof engine.common.Error){
                return b;
            }
        }
    }

    return map;

}

function build_element(path,self,last,map,data,key,query){

    // console.log({s:self});

    //find address
    let parent = null;
    let parent_key = null;
    if(!map.addresses.hasOwnProperty(path)){
        if(path.length > 0){
            for(let address in map.addresses){
                if(str_match(address,path)){
                    parent = map.addresses[address];
                    parent_key = address;
                    break;
                }
            }
        } else {
            if(path.length > 0){
                let check = `${path}-${self}`;
                for(let address in map.addresses){
                    if(str_match(address,check)){
                        parent = map.addresses[address];
                        parent_key = address;
                        break;
                    }
                }
            }
            if(!parent){
                let check = `-${self}`;
                for(let address in map.addresses){
                    if(str_match(address,check)){
                        parent = map.addresses[address];
                        parent_key = address;
                        break;
                    }
                }
            }
        }
    } else {
        parent = map.addresses[path];
        parent_key = path;
    }
    if(!parent && path.length > 0){
        return new engine.common.Error(`invalid_path-no_parent_found => ${path} ${self} ${JSON.stringify(key)}`);
    }
    if(!parent && path.length === 0){
        parent_key = '';
    }

    let hold = map.build;
    if(parent){
        for(let item of parent){
            if(!hold.children[item]){
                console.log("failed-parent_not_found");
                return new engine.common.Error(`invalid_path => ${path} ${self} ${JSON.stringify(key)}`);
            }
            hold = hold.children[item];
        }
    }

    //checking if parent already have this child built
    if(parent && path.length === 0 || hold.children.hasOwnProperty(self)){
        if(typeof(key.features.grid) === 'number'){
            hold.grid_class = make_css_grid(
                query.layout[key.key],
                key.features.grid
            );
        }
        if(key.features.row && last){
            hold.row = key.features.row;
        }
        if(key.features.column && last){
            hold.column = key.features.column;
        }
        if(typeof(key.features.grid) === 'number'){
            hold.grid_class = make_css_grid(
                query.layout[key.key],
                key.features.grid
            );
        }
        return map;
    }

    let full_path = parent_key + (parent_key.length > 0 ? `-${self}` : `${self}`);
    let builder = data.find_builder(full_path);
    let style = data.find_style(full_path);
    let built = {
        name:self,
        builder:builder,
        style:style,
        multiple:last ? key.features.multiple : false,
        children:{}
    };
    if(last){
        if(key.features.row){
            built.row = key.features.row;
        }
        if(key.features.column){
            built.column = key.features.column;
        }
        if(typeof(key.features.grid) === 'number'){
            built.grid_class = make_css_grid(
                query.layout[key.key],
                key.features.grid
            );
        }
    }

    hold.children[self] = built;
    map.addresses[full_path] = parse_path(full_path);

    return map;

}

function make_css_grid(grid,len){

    const className = engine.uniqid();

    function first_base_item(item){
        if(!item.includes('-')){return item;}
        return item.split("-")[0];
    }

    let count = 1;
    let row = '';
    let build = '';
    for(let item of grid){
        row += `${row.length > 0 ? ' ' : ''}${first_base_item(item)}`;
        if(count === len){
            build += `"${row}"`; 
            row = '';
            count = 1;
        } else {
            count += 1;
        }
    }

    build = `\n\n.${className}{
        grid-template-areas:${build};
        display:grid;
    }\n\n`;
    engine.make.raw_css(build);
    // let sheet = window.document.styleSheets[0];
    // sheet.insertRule(build, sheet.cssRules.length);

    return className;

}

// function log_main(path,data){
//     let hold = data;
//     let collect = '';
//     for(let item of path){
//         if(!hold.hasOwnProperty(item)){
//             break;
//         }
//         let val = hold[item];
//         if(val.name){
//             collect += collect.length === 0 ? `${val.name}` : `-${val.name}`;
//         }
//         hold = hold[item];
//         if(hold.children){hold = hold.children;} else {
//             break;
//         }
//     }
//     let h = {};
//     h[collect] = hold;
//     console.log([collect,Object.keys(hold)]);
// }