
module.exports = (stylesheet)=>{

    if(stylesheet.colors instanceof Object){
        for(let color_name in stylesheet.colors){
            let color = stylesheet.colors[color_name];
            if(color instanceof Object){
                if(color.value){
                    engine.layout.colors.add(color_name,color.value);
                } else if(color.css_var_name){
                    engine.layout.colors.add(color_name,`var(${color.css_var_name})`);
                }
            }
        }
    }
    if((stylesheet.fonts instanceof Object) && !is_static_web){
        for(let font_name in stylesheet.fonts){
            let font = stylesheet.fonts[font_name];
            if(font instanceof Object && font.location){
                engine.layout.fonts.add(
                    font_name,
                    font_name,
                    font.location,
                    null,
                    false
                );
            } else
            if(font instanceof Object && font.css_var_name){
                window.veganaLayoutFonts[font_name] = `var(${font.css_var_name})`;
            }
        }
    }

}