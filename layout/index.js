

// const platform = require("./platform_og");
const platform = require("./platform_new");
const mapper = require("./mapper");
const builder = require("./builder");
const fonts = require("./fonts");

window.veganaLayoutColors = {};
window.veganaLayoutStyles = {};

module.exports = {
    build:build,
    colors:{
        add:(key,value)=>{window.veganaLayoutColors[key] = value;},
        get:(key)=>{return window.veganaLayoutColors[key];},
    },
    style:{
        add:(key,value)=>{
            let re_build = {};
            for(let key in value){
                let transform = engine.make.styles.transform_key_value(key,value[key]);
                for(let item in transform){
                    re_build[item] = transform[item];
                }
            }
            window.veganaLayoutStyles[key] = re_build;
        },
        get:(key)=>{return window.veganaLayoutStyles[key];},
    },
    fonts:fonts,
};

function build(data){

    let media_queries = platform.build_css_media_queries({
        build_all:data.build_all,
        styles:data.styles,
        layouts:data.layouts
    });

    // console.log(media_queries);

    let elements = {};
    for(let query of media_queries){
        let map = mapper.init(data,query);
        if(map instanceof engine.common.Error){
            return map;
        }
        let build = builder.init(map,data,query.media);
        if(build instanceof engine.common.Error){
            return build;
        } else {
            for(let key in build){
                if(!elements.hasOwnProperty(key)){elements[key] = [];}
                elements[key].push(build[key]);
            }
        }
        // break;
    }

    let build = {};
    build.elements = elements;
    build.build = (key,data)=>{

        let parents = [];
        for(let element in elements){
            if(mapper.str_match(element,key)){
                parents.push(elements[element]);
            }
        }

        if(!parents){
            return new engine.common.Error("no_parent_found");
        }
        
        function local_run(data){
            let local_elements = {};
            for(let parent of parents){
                for(let child of parent){
                    if(typeof(child) === 'function'){
                        let build = child(data);
                        for(let key in build){
                            if(!local_elements.hasOwnProperty(key)){local_elements[key] = [];}
                            local_elements[key].push(build[key]);
                        }
                    }
                }
            }
            return local_elements;
        }

        if(data instanceof Array){
            let elements = [];
            for(let item of data){
                let hold = local_run(item);
                for(let key in hold){
                    if(!elements.hasOwnProperty(key)){elements[key] = [];}
                    elements[key].push(hold[key]);
                }
            }
            return elements;
        } else
        if(data instanceof Object){
            return local_run(data);
        }
        
        return new engine.common.Error("data input for multiple builders can only be a array or a json object.");

    }

    return build;

}

// function build(){}

