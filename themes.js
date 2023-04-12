

module.exports = {
    load:load
};

async function load(name){

    let path = `js/themes/${name}.json`;

    let load = await engine.loader.load.json(path);

    console.log(load);

    let root = document.querySelector(':root');

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
            }
        }
    }

    for(let color_name in load.colors){
        let color = load.colors[color_name];
        console.log(color);
        if(color instanceof Object){
            if(color.css_var_name && color.value){
                engine.set.css_var(color.css_var_name,color.value);
                engine.layout.colors.add(color_name,`${color.value}`);
            } else 
            if(color.css_var_name){
                engine.layout.colors.add(color_name,`var(${color.css_var_name})`);
            }
        }
    }

}