

window.veganaLayoutStyles = {};
window.veganaLayoutColors = {};

module.exports = {
    add:{
        style:add_style,
        color:add_color
    },
    resolve:build_styles,
    build_styles:build_styles,
    resolve_style:resolve_style,
    random_color:color,
    transform_key:transform_key,
    transform_value:transform_value,
    transform_key_value:transform_key_value
};

function add_style(key,value){window.veganaLayoutStyles[key] = value;}
function add_color(key,value){window.veganaLayoutColors[key] = value;}

function build_styles(styles){
    let style = {};
    if(styles instanceof Array){
        // console.log(styles);
        for(let key of styles){
            if(window.veganaLayoutStyles.hasOwnProperty(key)){
                // console.log("veganaLayoutStyles : " + window.veganaLayoutStyles[key]);
                style = engine.make.integrate_objects(style,window.veganaLayoutStyles[key]);
                // console.log(style);
            } else {
                style = engine.make.integrate_objects(style,resolve_style(key));
            }
        }
    }
    return style;
}

function resolve_style(data){

    //primary rules
    if(data[0] === "!"){return null;} else
    if(
        data === "inline" ||
        data === "inline-block" ||
        data === "block"
    ){
        return {"display":data};
    } else
    if(data === "pointer"){return {"cursor":"pointer"};} else
    if(data === "content-middle"){return {'display':'grid','place-items':'center'};}
    if(data === "border-test" || data === "tbr"){return {'border':`5px solid ${color()}`};}

    let key,value;
    function is_setter_type(){
        if (data.indexOf("=") < 0){
            return false;
        }
        let hold = data.split("=");
        key = hold[0];
        value = hold[1];
        return true;
    }

    if(!is_setter_type()){return {};}
    return transform_key_value(key,value);

}

function transform_key_value(key,value){
    if(key[0] === "!"){return {};}
    let dont_transform = key[0] === "#";
    if(dont_transform){key = key.replace('#','');}
    if(!dont_transform){
        let og_key = key;
        key = transform_key(key);
        value = transform_value(value,og_key);
    }
    let build = {};
    if(!dont_transform){
        build = additional_attributes_from_key(key);
    }
    build[key] = value;
    return build;
}

function additional_attributes_from_key(key){
    let build = {}; 
    if(
        key === "grid-template-areas" ||
        key === "grid-template-rows" ||
        key === "grid-template-columns"
    ){build.display = "grid";}
    return build;
}

function transform_value(value,orignal_key){
    if(window.veganaLayoutColors.hasOwnProperty(value)){//color
        value = window.veganaLayoutColors[value];
    } else
    if(engine.layout.fonts.get(value)){//font
        value = engine.layout.fonts.get(value);
    } else
    if(value.indexOf("reduceHeight_") >= 0){
        value = `${engine.get.body.height() - Number(value.split("_")[1])}px`;
    } else
    if(value.indexOf("reduceWidth_") >= 0){
        value = `${engine.get.body.width() - Number(value.split("_")[1])}px`;
    }
    if(orignal_key === "tbr"){
        value = `5px solid ${value}`;
    }
    return value;
}

function transform_key(key){
    if(key === "tbr"){key = "border";} else
    if(key === "bd"){key = "border";} else
    if(key === "font"){key = "font-family";} else
    if(key === "br"){key = "border-radius";} else
    if(key === "bg"){key = "background-color";} else
    if(key === "text" || key === "align"){key = "text-align";}
    if(key === "grid-rows"){key = "grid-template-rows";} else
    if(key === "grid-areas"){key = "grid-template-areas";} else
    if(key === "grid-columns"){key = "grid-template-columns";}
    return key;
}

let cl = "red";
function color(){
    let colors = ["red","green","yellow","pink","blue","brown","purple","cyan"];
    for(let i=0;i<colors.length;i++){
        let color = colors[i];
        if(cl === color){
            if(i === colors.length-1){
                cl = colors[0];
                return colors[colors.length-1];
            } else {
                cl = colors[i+1];
                return colors[i];
            }
        }
    }
}