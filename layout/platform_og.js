

module.exports = {
    build_css_media_queries:build_css_media_queries,
    extract_platforms:extract_platforms
};

function build_css_media_queries(data){

    let extracted_platform = extract_platforms({
        build_all:data.build_all,
        styles:data.styles,
        layouts:data.layouts
    });

    console.log(extracted_platform[0]);

    let sizes = engine.get.platform("size");
    let built_media_queries = [];

    for(let item of extracted_platform){

        //check if layout has a orientation type
        let is_layout_type = false;
        if((item.layout instanceof Object)){
            if((
                !item.layout.hasOwnProperty("landscape") &&
                !item.layout.hasOwnProperty("portrait")
            )){
                for(let key in item.layout){
                    if(engine.make.platform.parse_viewport(key)){
                        is_layout_type = true;
                        break;
                    }
                }
            } else {
                is_layout_type = true;
            }
        }

        //get default device viewport size
        if(!sizes[item.type]){

            if(!is_layout_type){
                //no orientation or device type is given so dont make media query
                let media_query = build_media_query_without_size(item.type);
                built_media_queries.push({
                    "media":media_query,
                    layout:item.layout,
                    styles:item.styles
                });
            } else {
                //only orientation is given no device type is given
                for(let key in item.layout){
                    let media_query = build_media_query_without_size(key);
                    built_media_queries.push({
                        "media":media_query,
                        layout:item.layout[key],
                        styles:item.styles[key]
                    });
                }
            }

        } else {

            let size = sizes[item.type];
            if(!is_layout_type){
                //no orientation is provided so we assume default orientation is used to provide styles
                let media_query = build_media_query(size.orientation,size);
                built_media_queries.push({
                    "media":media_query,
                    layout:item.layout,
                    styles:item.styles
                });
            } else {
                //orientation layout is present and the size is customized to given orientation or viewport
                for(let key in item.layout){
                    let media_query = build_media_query(key,size);
                    built_media_queries.push({
                        "media":media_query,
                        layout:item.layout[key],
                        styles:item.styles[key]
                    });
                }
            }//check if layout object is orientation type

        }

    }

    return built_media_queries;

}

function build_media_query_without_size(key){

    let build = '@media screen ';
    if(key === "any"){return false;} else
    if(key === "landscape"){
        build += `and (orientation:landscape) `;
    } else if(key === "portrait"){
        build += `and (orientation:portrait) `;
    } else {

        const parsed = engine.make.platform.parse_viewport(key);
        if(!parsed){
            console.error("parse-failed");
            return new engine.common.Error(`invalid viewport valid is heightxwidth ie 1200x800 1200 height and 800 width => ${key}`);
        }

        if(parsed.orientation === "landscape"){
            build += `and (orientation:landscape) `;
            build += `and (min-height:${parsed.height}px) `;
            build += `and (min-width:${parsed.width}px) `;
        } else {
            build += `and (orientation:portrait) `;
            build += `and (min-height:${parsed.height}px) `;
            build += `and (min-width:${parsed.width}px) `;
        }

    }

    return build;

}

//#returns Error, media_query_string
function build_media_query(key,size){

    let build = '@media screen ';
    
    if(key === "landscape"){

        build += `and (orientation:landscape) `;
        if(size.both_min){
            build += `and (min-height:${size.both_min}px) `;
            build += `and (min-width:${size.both_min}px) `;
        }
        if(size.some_min){
            build += `and `;
            build += `(min-height:${size.some_min}px), `;
            build += `(min-width:${size.some_min}px) `;
        }
        if(size.smallest_max){
            build += `and (max-height:${size.smallest_max}px) `;
        }
        if(size.biggest_max){
            build += `and (max-width:${size.biggest_max}px) `;
        }

    } else if(key === "portrait"){

        build += `and (orientation:portrait) `;
        if(size.both_min){
            build += `and (min-height:${size.both_min}px) `;
            build += `and (min-width:${size.both_min}px) `;
        }
        if(size.some_min){
            build += `and `;
            build += `(min-height:${size.some_min}px), `;
            build += `(min-width:${size.some_min}px) `;
        }
        if(size.smallest_max){
            build += `and (max-width:${size.smallest_max}px) `;
        }
        if(size.biggest_max){
            build += `and (max-height:${size.biggest_max}px) `;
        }

    } else {

        const parsed = engine.make.platform.parse_viewport(key);
        if(!parsed){
            console.error("parse-failed");
            return new engine.common.Error(`invalid viewport valid is heightxwidth ie 1200x800 1200 height and 800 width => ${key}`);
        }

        let error;
        if(size.both_min){if(parsed.smallest <= size.both_min){error = 'both viewport subceeded size';}}
        if(size.some_min){if(parsed.biggest <= size.some_min){error = 'some viewport subceeded size';}}
        if(size.smallest_max){if(parsed.smallest >= size.smallest_max){error = 'biggest viewport exceeded size';}}
        if(size.biggest_max){if(parsed.biggest >= size.biggest_max){error = 'smallest viewport exceeded size';}}
        if(error){
            return new engine.common.Error(`${error} => ${key}`).log();
        }

        if(parsed.orientation === "landscape"){
            build += `and (orientation:landscape) `;
            build += `and (min-height:${parsed.height}px) `;
            build += `and (min-width:${parsed.width}px) `;
            if(size.smallest_max){
                build += `and (max-height:${size.smallest_max}px) `;
            }
            if(size.biggest_max){
                build += `and (max-width:${size.biggest_max}px) `;
            }
        } else {
            build += `and (orientation:portrait) `;
            build += `and (min-height:${parsed.height}px) `;
            build += `and (min-width:${parsed.width}px) `;
            if(size.smallest_max){
                build += `and (max-width:${size.smallest_max}px) `;
            }
            if(size.biggest_max){
                build += `and (max-height:${size.biggest_max}px) `;
            }
        }

    }

    return build;

}

function extract_platforms(data){

    let to_build = [];
    let styles = Object.assign({},data.styles);
    let layouts = data.layouts;

    //ensure styles
    if(!data.styles){data.styles = {};}
    
    if(!styles.web){styles.web = {};}
    if(!styles.all){styles.all = {};}

    if(styles.all.portrait || styles.all.landscape){styles.web.all = styles.all;}
    // if(styles.portrait || styles.landscape){styles.web.all = styles;}

    if(!styles.web.mobile && styles.all.mobile){styles.web.mobile = styles.all.mobile;}
    if(!styles.web.tablet && styles.all.tablet){styles.web.tablet = styles.all.tablet;}
    if(!styles.web.pc && styles.all.pc){styles.web.pc = styles.all.pc;}

    if(!styles.web.mobile && !styles.all.mobile && styles.mobile){styles.web.mobile = styles.mobile;}
    if(!styles.web.tablet && !styles.all.tablet && styles.tablet){styles.web.tablet = styles.tablet;}
    if(!styles.web.pc && !styles.all.pc && styles.pc){styles.web.pc = styles.pc;}

    if(engine.get.platform("static") || data.build_all){

        if(layouts.web){
            if(layouts.web.mobile){to_build.push({type:"mobile",layout:layouts.web.mobile,styles:styles.web.mobile});}
            if(layouts.web.tablet){to_build.push({type:"tablet",layout:layouts.web.tablet,styles:styles.web.tablet});}
            if(layouts.web.pc){to_build.push({type:"pc",layout:layouts.web.pc,styles:styles.web.pc});}
            if(layouts.all){
                if(!layouts.web.mobile && layouts.all.mobile){
                    to_build.push({type:"mobile",layout:layouts.all.mobile,styles:styles.web.mobile});
                }
                if(!layouts.web.tablet && layouts.all.tablet){
                    to_build.push({type:"tablet",layout:layouts.all.tablet,styles:styles.web.tablet});
                }
                if(!layouts.web.pc && layouts.all.pc){
                    to_build.push({type:"pc",layout:layouts.all.pc,styles:styles.web.pc});
                }
                if(!layouts.web.mobile && !layouts.all.mobile && layouts.mobile){
                    to_build.push({type:"mobile",layout:layouts.mobile,styles:styles.web.mobile});
                }
                if(!layouts.web.tablet && !layouts.all.tablet && layouts.tablet){
                    to_build.push({type:"tablet",layout:layouts.tablet,styles:styles.web.tablet});
                }
                if(!layouts.web.pc && !layouts.all.pc && layouts.pc){
                    to_build.push({type:"pc",layout:layouts.pc,styles:styles.web.pc});
                }
            }
            if(!layouts.all){
                if(!layouts.web.mobile && layouts.mobile){
                    to_build.push({type:"mobile",layout:layouts.mobile,styles:styles.web.mobile});
                }
                if(!layouts.web.tablet && layouts.tablet){
                    to_build.push({type:"tablet",layout:layouts.tablet,styles:styles.web.tablet});
                }
                if(!layouts.web.pc && layouts.pc){
                    to_build.push({type:"pc",layout:layouts.pc,styles:styles.web.pc});
                }
            }
        } else 
        if(layouts.all){
            // if(layouts.all.mobile || layouts.all.tablet || layouts.all.pc){

            // } else {

            // }
            if(layouts.all.mobile){
                to_build.push({type:"mobile",layout:layouts.all.mobile,styles:styles.web.mobile});
            }
            if(layouts.all.tablet){
                to_build.push({type:"tablet",layout:layouts.all.tablet,styles:styles.web.tablet});
            }
            if(layouts.all.pc){
                to_build.push({type:"pc",layout:layouts.all.pc,styles:styles.web.pc});
            }
            if(!layouts.all.mobile && layouts.mobile){
                to_build.push({type:"mobile",layout:layouts.mobile,styles:styles.web.mobile});
            }
            if(!layouts.all.tablet && layouts.tablet){
                to_build.push({type:"tablet",layout:layouts.tablet,styles:styles.web.tablet});
            }
            if(!layouts.all.pc && layouts.pc){
                to_build.push({type:"pc",layout:layouts.pc,styles:styles.web.pc});
            }
            if(layouts.all.portrait || layouts.all.landscape){
                to_build.push({type:"any",layout:layouts.all,styles:styles.web.all || styles});
            }
        } else {
            if(layouts.mobile){
                to_build.push({type:"mobile",layout:layouts.mobile,styles:styles.web.mobile});
            }
            if(layouts.tablet){
                to_build.push({type:"tablet",layout:layouts.tablet,styles:styles.web.tablet});
            }
            if(layouts.pc){
                to_build.push({type:"pc",layout:layouts.pc,styles:styles.web.pc});
            }
        }
        if(to_build.length === 0){
            to_build.push({type:"any",layout:layouts,styles:styles.web.all || styles});
        }
    } else {
        let local_layout = engine.make.platform.resolve(layouts,"orientation");
        let local_styles = engine.make.platform.resolve(data.styles,"orientation");
        to_build.push({type:"any",layout:local_layout,styles:local_styles});
    }

    return to_build;

}