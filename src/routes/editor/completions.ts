// class, constant, enum, function, interface, keyword, method, namespace, property, text, type, and variable.

const boostable = ['translate'];
function generate_completions_list(list : string[][], type : string, section : string, boost : number = 0) {
    return list.map((item) => {
        if (boostable.includes(item[0])) boost = 99;
        return {label: item[0], type: type, detail: item[1], section: section, boost : boost}
    });
}

export const dg_completions = [
    dg_completions_Diagram_method, dg_completions_func, 
    dg_completions_int, dg_completions_mod, dg_completions_geom,
    dg_completions_annot
];

function dg_completions_func(context : any) {
    let cl_shapes    = generate_completions_list(list_shapes, "function", "shapes");
    let cl_alignment = generate_completions_list(list_alignment, "function", "alignment");
    let cl_utils     = generate_completions_list(list_utils, "function", "utils");
    let cl_plot      = generate_completions_list(list_plot, "function", "plot");
    let completions_list = cl_shapes.concat(cl_alignment).concat(cl_utils).concat(cl_plot);
    let before = context.matchBefore(/\w+/)
    let is_method = context.matchBefore(/[\w\(\)]+\.(\w+)$/)
    // If completion wasn't explicitly started and there
    // is no word before the cursor, don't open completions.
    if (!context.explicit && (!before || is_method)) return null
    return {
        from: before ? before.from : context.pos,
        options: completions_list,
        validFor: /^\w*$/
    }
}

function dg_completions_Diagram_method(context : any) {
    let cl_transform = generate_completions_list(list_transform, "method", "transformation");
    let cl_style     = generate_completions_list(list_style, "method", "style");
    let cl_points    = generate_completions_list(list_points, "method", "points");
    let completions_list = cl_transform.concat(cl_style).concat(cl_points);
    let before = context.matchBefore(/\w+/)
    // let is_method = context.matchBefore(/\w+\.(\w+)$/)
    let is_method = context.matchBefore(/[\w\(\)]+\.(\w+)$/)
    if (!context.explicit && !is_method) return null
    return {
        from: before ? before.from : context.pos,
        options: completions_list,
        validFor: /^\w*$/
    }
}

function dg_completions_int(context : any) {
    let completions_list = generate_completions_list(list_interactive, "method", "interactive");
    let before = context.matchBefore(/\w+/)
    let is_int_method = context.matchBefore(/int\.\w+$/)
    // If completion wasn't explicitly started and there
    // is no word before the cursor, don't open completions.
    if (!context.explicit && !is_int_method) return null
    return {
        from: before ? before.from : context.pos,
        options: completions_list,
        validFor: /^\w*$/
    }
}

function dg_completions_mod(context : any) {
    let completions_list = generate_completions_list(list_mod, "method", "modifier");
    let before = context.matchBefore(/\w+/)
    let is_mod_method = context.matchBefore(/mod\.\w+$/)
    // If completion wasn't explicitly started and there
    // is no word before the cursor, don't open completions.
    if (!context.explicit && !is_mod_method) return null
    return {
        from: before ? before.from : context.pos,
        options: completions_list,
        validFor: /^\w*$/
    }
}

function dg_completions_geom(context : any) {
    let completions_list = generate_completions_list(list_geom, "method", "geometry");
    let before = context.matchBefore(/\w+/)
    let is_geom_method = context.matchBefore(/geometry\.\w+$/)
    // If completion wasn't explicitly started and there
    // is no word before the cursor, don't open completions.
    if (!context.explicit && !is_geom_method) return null
    return {
        from: before ? before.from : context.pos,
        options: completions_list,
        validFor: /^\w*$/
    }
}

function dg_completions_annot(context : any) {
    let completions_list = generate_completions_list(list_annot, "method", "annotation");
    let before = context.matchBefore(/\w+/)
    let is_annot_method = context.matchBefore(/annotation\.\w+$/)
    // If completion wasn't explicitly started and there
    // is no word before the cursor, don't open completions.
    if (!context.explicit && !is_annot_method) return null
    return {
        from: before ? before.from : context.pos,
        options: completions_list,
        validFor: /^\w*$/
    }
}


const list_shapes = [
    [
        "polygon",
        "(points : Vector2[]) : Diagram"
    ],
    [
        "curve",
        "(points : Vector2[]) : Diagram"
    ],
    [
        "text",
        "(str : string) : Diagram"
    ],
    [
        "image",
        "(src : string, width : number, height : number) : Diagram"
    ],
    [
        "rectangle",
        "(width : number, height : number) : Diagram"
    ],
    [
        "square",
        "(sidelength : number=1) : Diagram"
    ],
    [
        "rectangle_corner",
        "(bottomleft : Vector2, topright : Vector2) : Diagram"
    ],
    [
        "regular_polygon",
        "(sides : number, radius : number) : Diagram"
    ],
    [
        "regular_polygon_side",
        "(sides : number, sidelength : number) : Diagram"
    ],
    [
        "circle",
        "(radius : number=1) : Diagram"
    ],
    [
        "line",
        "(start : Vector2, end : Vector2) : Diagram"
    ],
    [
        "arc",
        "(radius : number=1, angle : number) : Diagram"
    ],
    [
        "arrow",
        "(vector : Vector2, headsize : number=1) : Diagram"
    ],
    [
        "arrow1",
        "(start : Vector2, end : Vector2, headsize : number=1) : Diagram"
    ],
    [
        "arrow2",
        "(start : Vector2, end : Vector2, headsize : number=1) : Diagram"
    ],
    [
        "textvar",
        "(str : string) : Diagram"
    ],
    [
        "diagram_combine",
        "(...diagrams : Diagram[]) : Diagram"
    ],
    [
        "Diagram.combine",
        "(...diagrams : Diagram[]) : Diagram"
    ]
]
const list_alignment = [
    [
        "align_vertical",
        "(diagrams : Diagram[], alignment : 'top'|'center'|'bottom') : Diagram[]"
    ],
    [
        "align_horizontal",
        "(diagrams : Diagram[], alignment : 'left'|'center'|'right') : Diagram[]"
    ],
    [
        "distribute_horizontal",
        "(diagrams : Diagram[], space : number=0) : Diagram[]"
    ],
    [
        "distribute_vertical",
        "(diagrams : Diagram[], space : number=0) : Diagram[]"
    ],
    [
        "distribute_horizontal_and_align",
        "(diagrams : Diagram[], horizontal_space : number, alignment : 'top'|'center'|'bottom') : Diagram[]"
    ],
    [
        "distribute_vertical_and_align",
        "(diagrams : Diagram[], vertical_space : number, alignment : 'left'|'center'|'right') : Diagram[]"
    ],
    [
        "align_vertical_c",
        "(diagrams : Diagram[], alignment : 'top'|'center'|'bottom') : Diagram[]"
    ],
    [
        "align_horizontal_c",
        "(diagrams : Diagram[], alignment : 'left'|'center'|'right') : Diagram[]"
    ],
    [
        "distribute_horizontal_c",
        "(diagrams : Diagram[], space : number=0) : Diagram[]"
    ],
    [
        "distribute_vertical_c",
        "(diagrams : Diagram[], space : number=0) : Diagram[]"
    ],
    [
        "distribute_horizontal_and_align_c",
        "(diagrams : Diagram[], horizontal_space : number, alignment : 'top'|'center'|'bottom') : Diagram[]"
    ],
    [
        "distribute_vertical_and_align_c",
        "(diagrams : Diagram[], vertical_space : number, alignment : 'left'|'center'|'right') : Diagram[]"
    ]
]
const list_utils = [
    [
        "to_degree",
        "(angle : number)"
    ],
    [
        "to_radian",
        "(angle : number)"
    ],
    [
        "array_repeat",
        "(arr : T[], len : number) : T[]"
    ],
    [
        "linspace",
        "(start : number, end : number, n : number=100) : number[]"
    ],
    [
        "linspace_exc",
        "(start : number, end : number, n : number=100) : number[]"
    ],
    [
        "range",
        "(start : number, end : number, step : number=1) : number[]"
    ],
    [
        "range_inc",
        "(start : number, end : number, step : number=1) : number[]"
    ]
]
const list_plot = [
    [
        "plotv",
        "(data : Vector2[], axes_options? : Partial<axes_options>) : Diagram"
    ],
    [
        "plot",
        "(xdata : number[], ydata : number[], axes_options? : Partial<axes_options>) : Diagram"
    ],
    [
        "plotf",
        "(f : (x:number)=>number, axes_options? : Partial<axes_options>) : Diagram"
    ],
    [
        "axes_empty",
        "(axes_options? : Partial<axes_options>) : Diagram"
    ],
    [
        "axes_corner_empty",
        "(axes_options? : Partial<axes_options>) : Diagram"
    ],
    [
        "xyaxes",
        "(axes_options? : Partial<axes_options>) : Diagram"
    ],
    [
        "xycorneraxes",
        "(axes_options? : Partial<axes_options>) : Diagram"
    ],
    [
        "xygrid",
        "(axes_options? : Partial<axes_options>) : Diagram"
    ],
    [
        "xtickmark",
        "(x : number, y : number, str : string, axes_options? : Partial<axes_options>) : Diagram"
    ],
    [
        "ytickmark",
        "(y : number, x : number, str : string, axes_options? : Partial<axes_options>) : Diagram"
    ],
    [
        "axes_transform",
        "(opt : axes_options) : (v:Vector2)=>Vector2"
    ]
]
const list_transform = [
    [
        "translate",
        "(v : Vector2) : Diagram"
    ],
    [
        "position",
        "(v : Vector2) : Diagram"
    ],
    [
        "rotate",
        "(angle : number, pivot? : Vector2) : Diagram"
    ],
    [
        "scale",
        "(scale : Vector2|number, origin? : Vector2) : Diagram"
    ],
    [
        "skewX",
        "(angle : number, base? : Vector2) : Diagram"
    ],
    [
        "skewY",
        "(angle : number, base? : Vector2) : Diagram"
    ],
    [
        "vflip",
        "(a? : number) : Diagram"
    ],
    [
        "hflip",
        "(a? : number) : Diagram"
    ],
    [
        "reflect",
        "(p1? : Vector2, p2? : Vector2) : Diagram"
    ],
    [
        "reflect_over_point",
        "(p : Vector2) : Diagram"
    ],
    [
        "reflect_over_line",
        "(p1 : Vector2, p2 : Vector2) : Diagram"
    ],
    [
        "transform",
        "(transform_function : (p:Vector2)=>Vector2) : Diagram"
    ],
    [
        "apply",
        "(modifier_function : (d:Diagram)=>Diagram) : Diagram"
    ],
]
const list_style = [
    [
        "fill",
        "(color : string) : Diagram"
    ],
    [
        "stroke",
        "(color : string) : Diagram"
    ],
    [
        "opacity",
        "(opacity : number) : Diagram"
    ],
    [
        "strokewidth",
        "(width : number) : Diagram"
    ],
    [
        "strokelinecap",
        "(linecap : 'butt'|'round'|'square') : Diagram"
    ],
    [
        "strokelinejoin",
        "(linejoin : 'miter'|'round'|'bevel') : Diagram"
    ],
    [
        "strokedasharray",
        "(dasharray : number[]) : Diagram"
    ],
    [
        "vectoreffect",
        "(vectoreffect : 'none'|'non-scaling-stroke') : Diagram"
    ],
    [
        "fontfamily",
        "(fontfamily : string) : Diagram"
    ],
    [
        "fontsize",
        "(fontsize : number) : Diagram"
    ],
    [
        "fontweight",
        "(fontweight : 'normal'|'bold'|'bolder'|'lighter'|number) : Diagram"
    ],
    [
        "move_origin_text",
        "(anchor : string) : Diagram"
    ],
    [
        "textangle",
        "(angle : number) : Diagram"
    ],
    [
        "textfill",
        "(color : string) : Diagram"
    ],
    [
        "textstroke",
        "(color : string) : Diagram"
    ],
    [
        "textstrokewidth",
        "(width : number) : Diagram"
    ],
    [
        "text_tovar",
        "() : Diagram"
    ],
    [
        "text_totext",
        "() : Diagram"
    ],
    [
        "apply",
        "(func : (d:Diagram)=>Diagram) : Diagram"
    ],
    [
        "diagram_combine",
        "(...diagrams : Diagram[]) : Diagram"
    ],
]
const list_points = [
    [
        "debug",
        "(show_index : boolean=true) : Diagram"
    ],
    [
        "get_anchor",
        "(anchor : string) : Diagram"
    ],
    [
        "bounding_box",
        "() : [Vector2,Vector2]"
    ],
    [
        "move_origin",
        "(pos : Vector2|string) : Diagram"
    ],
    [
        "parametric_point",
        "(t : number, segment_index? : number) : Vector2"
    ],
    [
        "add_points",
        "(points : Vector2[]) : Diagram"
    ]
]
const list_interactive = [
    [
        "slider",
        "(variable_name : string, min : number, max : number, value : number, step? : number, time? : number)"
    ],
    [
        "locator",
        "(variable_name : string, value : Vector2, radius : number, color? : string, track_diagram? : Diagram)"
    ],
    [
        "label",
        "(variable_name : string, value : any)"
    ],
    ['set', '(variable_name : string, value : any)'],
    ['get', '(variable_name : string) : any'],
    ['draw_function', ''],
    ['draw', '()'],
]
const list_mod = [
    [
        "subdivide",
        "(n : number) : modifierFunction"
    ],
    [
        "resample",
        "(n : number) : modifierFunction"
    ],
    [
        "round_corner",
        "(radius : number|number[], point_indices? : number[]) : modifierFunction"
    ]
]
const list_geom = [
    [
        "circle_radius",
        "(circle : Diagram) : number"
    ],
    [
        "circle_tangent_point_from_point",
        "(point : Vector2, circle : Diagram) : [Vector2,Vector2]"
    ],
    [
        "line_extend",
        "(l : Diagram, len1 : number, len2 : number) : Diagram"
    ]
]
const list_annot = [
    [
        "vector",
        "(v : Vector2, str? : string, text_offset? : Vector2, arrow_head_size? : number) : Diagram"
    ],
    [
        "angle",
        "(p : [Vector2,Vector2,Vector2], str? : string, radius : number=1, text_offset? : Vector2|number) : Diagram"
    ],
    [
        "angle_smaller",
        "(p : [Vector2,Vector2,Vector2], str? : string, radius : number=1, text_offset? : Vector2|number) : Diagram"
    ],
    [
        "length",
        "(p1 : Vector2, p2 : Vector2, str : string, offset : number,     tablength? : number, textoffset? : number, tabsymmetric : boolean=true) : Diagram"
    ]
]


// ============================ scraper
// let titles  = document.getElementsByClassName("example-title");
// let strings = [...titles].map(title => {
//     let subtitle = title.nextElementSibling;
//     if (!subtitle.classList.contains("example-subtitle")) subtitle = subtitle.nextElementSibling;
//     let name = title.textContent;
//     if (name.startsWith("Diagram.")) name = name.slice(8);
//     else if (name.startsWith("mod.")) name = name.slice(4);
//     else if (name.startsWith("Interactive.")) name = name.slice(12);
//     else if (name.startsWith("geometry.")) name = name.slice(9);
//     else if (name.startsWith("annotation.")) name = name.slice(11);
//     let args = subtitle.textContent;
//     args = args.replace(/[\n\t]/g, "");
//     // replace multiple spaces with single space
//     args = args.replace(/ +(?=)/g,'');
//     return [name, args];
// }).filter((e) => e[0]);
// console.log(strings);
// ============================ scraper

