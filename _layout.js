

module.exports = {
    build:build,
    colors:{
        add:(key,value)=>{veganaLayoutColors[key] = value;},
        get:(key)=>{return veganaLayoutColors[key];},
    },
    style:{
        add:(key,value)=>{veganaLayoutStyles[key] = value;},
        get:(key)=>{return veganaLayoutStyles[key];},
    },
};

function build(data){

    let blocks = build_blocks(data);

    if(false){
        for(let block of blocks){
            for(let flow of block.flows){
                let name = '';
                for(let item of flow){
                    if(item.builder instanceof Array){
                        for(let k of item.builder){
                            // console.log(k);
                            name += `-${k.builder}`;
                        }
                    } else {
                        // console.log(item.builder);
                        name += `-${item.builder}`;
                    }
                }
                console.log(name);
                // break;
            }
            // break;
        }
        return false;
    }

    let grids = {};
    for(let block of blocks){
        if(block.grid){
            grids[block.name] = block.grid;
        }
    }

    console.log({grids:grids});

    let map = generate_map(blocks);

    // console.log(blocks);

    return build_map(data,map,grids);

}

function build_map(data,map,grids){

    // let class_uid = engine.uniqid();
    const main = engine.make.div({
        parent:data.parent,
        // class:class_uid
    });
    // make_css_grid(class_uid,grids.primary);

    engine.layout.style.add("tmi",{
        border:"5px solid red",
        "padding":"10px"
    });

    function build_item(parent,child,custom_data){

        let builder = {};

        if(data.builders[child.name]){
            builder = Object.assign({},data.builders[child.name]);
            if(custom_data){
                for(let key in builder){
                    let value = builder[key];
                    if(typeof(value) === 'string'){
                        if(value.includes("_data_=")){
                            value = value.replace("_data_=","");
                            if(custom_data[value]){
                                builder[key] = custom_data[value];
                            }
                        }
                    }
                }   
            }
        }

        //customize builder
        builder.parent = parent;
        if(!builder.styles){builder.styles = [];}
        builder.styles.push(`grid-area=${child.builder}`);
        if(data.styles[child.name]){
            builder.styles = [...data.styles[child.name],...builder.styles];
        }
        if(grids[child.name]){
            // console.log(`grid found : ${child.name}`);
            builder.class = engine.uniqid();
            make_css_grid(builder.class,grids[child.name]);
        }
        //custom editing
        // if(true){builder.styles.push("tmi");}
        // if(!builder.text){builder.text = child.name;}

        //build flow item
        let built_as;
        if(builder.tag){
            built_as = engine.make.element(builder);
        } else {
            built_as = engine.make.div(builder);
        }
        if(typeof(builder) === 'function'){
            data.builders[child.name](built_as);
        }
        if(!built[child.name] && !custom_data){
            built[child.name] = built_as;
        }

        //build children
        for(let item in child.children){
            process_item(built_as,child.children[item],custom_data);
        }

    }//build_item

    let built = {};
    function process_item(parent,child,custom_data){

        // console.log({name:child.name});

        if(child.multi){
            if(custom_data){engine.common.error("multi_layout_elements_cannot_be_nested");}
            built[child.name] = (data)=>{
                build_item(parent,child,data);
            };
        }

        if(!child.multi){
            build_item(parent,child,custom_data);
        }

    }//process_item

    // for(let child in map.children){
    //     process_item(main,map.children[child],null);
    // }

    process_item(main,map,null);

    // build_item(main,map);

    built.build = (name,data)=>{
        if(typeof(built[name]) !== 'function'){
            return;
        }
        if(data instanceof Array){
            for(let item of data){
                if(item instanceof Object){
                    built[name](item);
                }
            }
        } else if(data instanceof Object){
            built[name](data);
        }
    }

    return built;

}

function make_css_grid(className,grid){

    if(!grid){return;}

    let build = ``;
    for(let row of grid){
        let row_text = "";
        for(let item of row){
            if(row_text.length > 0){row_text += " ";}
            row_text += `${item}`;
        }
        if(build.length > 0){build += " ";}
        build += `"${row_text}"`;
    }

    build = `\n\n.${className}{
        grid-template-areas:${build};
        display:grid;
    }\n\n`;

    // build = `\n\n.${className}{
    //     background-color:green
    // }\n\n`;

    console.log(build);

    let sheet = window.document.styleSheets[0];

    sheet.insertRule(build, sheet.cssRules.length);

    // console.log(sheet);

}

function generate_map(blocks){

    let map = {builder:"primary",children:{},name:'primary'};

    for(let block of blocks){
        for(let flow of block.flows){
            let local_hold = map;
            let name = 'primary';
            for(let item of flow){
                if(item.builder !== "primary"){
                    if(typeof(item.builder) === 'string'){
                        if(!local_hold.children.hasOwnProperty(item.builder)){
                            local_hold.children[item.builder] = {builder:item.builder,children:{}};
                        }
                        if(item.multi){local_hold.children[item.builder].multi = true;}
                        name += `-${item.builder}`;
                        local_hold.children[item.builder].name = name;
                        local_hold.children[item.builder].chain = item.chain;
                        local_hold = local_hold.children[item.builder];
                    } else if(item.builder instanceof Array){
                        for(let k of item.builder){
                            if(!local_hold.children.hasOwnProperty(k.builder)){
                                local_hold.children[k.builder] = {builder:k.builder,children:[]};
                            }
                            // name += `-${k.builder}`;
                            let local_name = `${name}-${k.builder}`;
                            local_hold.children[k.builder].name = local_name;
                            local_hold.children[k.builder].chain = k.chain;
                            if(k.multi){local_hold.children[k.builder].multi = true;}
                        }
                    } else {
                        return new engine.common.Error("invalid_item_builder");
                    }
                }
            }
        }
    }

    // console.log(map);

    // console.log(
    //     map.children.
    //     side_menu.children.buttons.children.
    //     button.children
    // );

    return map;

}

function build_blocks(data){

    let primary_block = build_block(
        data,
        data.layouts.primary,
        ["primary"],
        [{builder:"primary",chain:[]}],
        "primary"
    );

    let blocks = [primary_block];
    for(let key of Object.keys(data.layouts)){
        if(key !== "primary"){
            let flow = parse_flow(
                key,
                ["primary"],
                [{builder:"primary",chain:[]}],
                true
            );
            let built_block = build_block(
                data,
                data.layouts[key],
                flow.chain,
                flow.flow,
                key
            );
            blocks.push(built_block);
        }
    }

    return blocks;

}

function build_block(data,block,chain,flow,name){

    //cluster blocks
    let all = [];
    let local = [];
    for(let item of block){
        if(local.length === data.count){
            all.push(local);
            local = [item];
        } else {
            local.push(item);
        }
    }
    all.push(local);

    let flows = [];
    let grid_area_rows = [];
    for(let row of all){
        let grid_area_row = [];
        for(let item of row){
            let build_flow = parse_flow(
                item,
                Object.assign([],chain),
                Object.assign([],flow),
                false
            );
            grid_area_row.push(build_flow[1].builder);
            flows.push(build_flow);
        }
        grid_area_rows.push(grid_area_row);
    }

    console.log(grid_area_rows);

    let grid_is_valid = false;
    let previous;
    for(let rows of grid_area_rows){
        for(let item of rows){
            if(!previous){previous = item;} else {
                if(item !== previous){grid_is_valid = true;break;}
            }
        }
        if(grid_is_valid){break;}
    }
    if(!grid_is_valid){grid_area_rows = null;}

    return {
        name:name,
        grid:grid_area_rows,
        flows:flows
    };

}

function parse_flow(flow_string,chain,flow,return_chained){

    // let flow = [];
    let expanded = false;
    for(let item of flow_string.split("-")){
        if(item.includes(",")){
            if(expanded){return false;} else {expanded = true;}
            let local_hold = item.split(",");
            let local_build = [];
            for(let i of local_hold){
                local_build.push({builder:i,chain:Object.assign([],chain)});
            }
            flow.push({builder:local_build,chain:Object.assign([],chain)});
        } else
        if(item.includes("_+")){
            item = item.replace("_+","");
            flow.push({builder:item,chain:Object.assign([],chain),multi:true});
            chain.push(item);
        } else {
            flow.push({builder:item,chain:Object.assign([],chain)});
            chain.push(item);
        }
    }

    if(return_chained){
        return {
            flow:flow,
            chain:chain
        };
    }

    return flow;

}




