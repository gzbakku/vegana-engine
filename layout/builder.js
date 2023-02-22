

module.exports = {init:init};

function init(map,data,media_rule){

    let local_cls = engine.uniqid();
    const main = engine.make.div({
        parent:data.parent,
        class:typeof(data.parent_class) === 'string' ? `${data.parent_class} ${local_cls}` : `${local_cls}`,
    });

   if(media_rule){
        make_css_media_rule(media_rule,local_cls);
   }

    let elements = {};
    for(let child in map.build.children){
        let child_elements = build_child(
            '',
            main,
            map.build.children[child],
            null,
            data.names
        );
        elements = engine.make.integrate_objects(elements,child_elements);
    }

    return elements;

}

function make_css_media_rule(media_rule,cls){
    let base_class = `.${cls}{display:none !important;}`;
    let media_class = `${media_rule}{.${cls}{display:block !important;}}`;
    engine.make.raw_css(base_class);
    engine.make.raw_css(media_class);
}

function build_child(path,parent,child,data,make_names,is_grid_child){

    let my_path = path + (path.length > 0 ? `-${child.name}` : `${child.name}`);
    if(child.multiple){
        let elements = {};
        elements[my_path] = (local_data)=>{
            return build_element(local_data,parent,child,my_path,make_names,is_grid_child);
        };
        return elements;
    } else {
        return build_element(data,parent,child,my_path,make_names,is_grid_child);
    }

}

function build_element(data,parent,child,my_path,make_names,is_grid_child){

    let elements = {};
    let builder = {};
    if(child.builder instanceof Object){builder = Object.assign({},child.builder)}
    if(child.style instanceof Array){builder.styles = Object.assign([],child.style)}

    if(data){
        for(let key in builder){
            let value = builder[key];
            if(typeof(value) === 'string'){
                if(value.includes("_data_=")){
                    let data_key = value.replace('_data_=','');
                    if(data.hasOwnProperty(data_key)){
                        builder[key] = data[data_key];
                    }
                }
            }
        }
    }

    builder.parent = parent;
    if(!(builder.styles instanceof Array)){builder.styles = [];}
    if(is_grid_child){
        builder.styles.push(`grid-area=${child.name}`);
    }
    let child_are_grid_types = typeof(child.grid_class) === 'string' ? true : false;
    if(child.grid_class){
        if(!builder.class){builder.class = '';}
        builder.class += builder.class.elngth === 0 ? `${child.grid_class}` : ` ${child.grid_class}`;
    }
    if(child.row){
        builder.styles.push(`display=grid`);
        builder.styles.push(`grid-template-rows=${child.row}`);
    }
    if(child.column){
        builder.styles.push(`display=grid`);
        builder.styles.push(`grid-template-columns=${child.column}`);
    }
    builder.name = child.name;
    
    
    //this is test builder property disable it
    if(make_names === 1 || make_names === 2){
        if(builder.text){
            builder.text = `${builder.text} => ${child.name}`;
        } else {
            builder.text = child.name;
        }
    }
    if(make_names === 2 || make_names === 3){
        builder.styles.push(`border=5px solid ${engine.make.styles.random_color()}`);
    }

    let id = builder.tag ? engine.make.element(builder) : engine.make.div(builder);
    elements[my_path] = id;
    for(let key in child.children){
        let child_elements = build_child(
            my_path,
            id,
            child.children[key],
            data,
            make_names,
            child_are_grid_types
        );
        elements = engine.make.integrate_objects(elements,child_elements);
    }

    return elements;

}