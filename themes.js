

module.exports = {
    load:load,
    values:{},
    value:{
        get:(key)=>{
            return engine.themes.values[key];
        }
    }
};

async function load(name){

    let path = `js/themes/${name}.json`;

    let load = await engine.loader.load.json(path);

    // let root = document.querySelector(':root');

    if(load.fonts instanceof Object){
        for(let font_name in load.fonts){
            let font = load.fonts[font_name];
            if(font instanceof Object){
                if(font.location){
                    engine.layout.fonts.add(
                        font_name,
                        font_name,
                        font.location,
                        null,
                        false
                    );
                }
                if(font.css_var_name){
                    engine.set.css_var(font.css_var_name,font_name);
                    engine.themes.values[font_name] = `var(${font.css_var_name})`;
                }
            }
        }
    }

    if(load.colors instanceof Object){
        for(let color_name in load.colors){
            let color = load.colors[color_name];
            if(color instanceof Object){
                if(color.css_var_name && color.value){
                    engine.set.css_var(color.css_var_name,color.value);
                    engine.layout.colors.add(color_name,`${color.value}`);
                    engine.themes.values[color_name] = `var(${color.css_var_name})`;
                } else 
                if(color.css_var_name){
                    engine.layout.colors.add(color_name,`var(${color.css_var_name})`);
                }
            }
        }
    }

    if(load.custom instanceof Object){
        // console.log(load.custom);
        for(let name in load.custom){
            let value = load.custom[name];
            if(value instanceof Object){
                if(value.css_var_name && value.value){
                    engine.set.css_var(value.css_var_name,value.value);
                    engine.themes.values[name] = value.value;
                }
            }
        }
    }

    

}