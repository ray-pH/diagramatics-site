import { base } from '$app/paths';
let docsbase = 'https://photon-ray.xyz/diagramatics'

export let known_dg_object = [ 'mod', 'geometry', 'annotation',  'int', 'bar', 'table', 'boolean'];
export function generate_guiderefs() : {[key : string] : string} {
    const guiderefs : {[key : string] : string} = {
        'draw'    : `${base}/guides/usage#draw`,
        'draw_to_svg' : `${docsbase}/functions/draw_to_svg`,
        'combine' : `${base}/guides/shapes#Diagram.combine`,
    }

    let f_shapes = [
        'polygon', 'curve', 'text', 'image',
        'rectangle', 'square', 'rectangle_corner',
        'regular_polygon', 'regular_polygon_side', 'circle',  'line', 'arc', 'arrow', 'textvar',
        'diagram_combine',
    ];
    for (let shape of f_shapes) {
        guiderefs[shape] = `${base}/guides/shapes#${shape}`;
    }

    let m_transformation = [
        'translate',  'position', 'rotate', 'scale', 
        'skewX', 'skewY', 'vflip', 'hflip',
        'reflect', 'reflect_over_point', 'reflect_over_line', 'transform'
    ]
    for (let transformation of m_transformation) {
        guiderefs[transformation] = `${base}/guides/transformation#Diagram.${transformation}`;
    }

    let m_style = [
        'fill', 'stroke', 'opacity', 'strokewidth',
        'strokelinecap', 'strokelinejoin', 'strokedasharray', 'vectoreffect',
        // 'apply' defined in modifier
        'fontfamily', 'fontsize', 'fontweight', 'fontstyle', 'move_origin_text', 'textangle',
        'text_totext', 'text_tovar', 'textfill', 'textstroke', 'textstrokewidth',
        'fontscale',
    ]
    for (let style of m_style) {
        guiderefs[style] = `${base}/guides/style#Diagram.${style}`;
    }

    let m_points = [
        'debug', 'get_anchor', 'move_origin', 'parametric_point', 
        'add_points', 'bounding_box',
    ]
    for (let point of m_points) {
        guiderefs[point] = `${base}/guides/points#Diagram.${point}`;
    }

    let f_plot = [
        'plotv', 'plot', 'plotf',
        'axes_empty', 'axes_corner_empty',
        'xyaxes', 'xycorneraxes', 'xygrid',
        'xtickmark', 'ytickmark', 'axes_transform',
    ]
    for (let plot of f_plot) {
        guiderefs[plot] = `${base}/guides/plot#${plot}`;
    }

    let f_alignment = [
        'align_vertical', 'align_horizontal',
        'distribute_horizontal', 'distribute_vertical',
        'distribute_horizontal_and_align', 'distribute_vertical_and_align',
        'distribute_grid_row',
    ]
    for (let alignment of f_alignment) {
        guiderefs[alignment] = `${base}/guides/alignment#${alignment}`;
    }

    let m_interactivity = [
        'slider', 'locator', 'label', 'button_toggle', 'button_click', 'custom_object',
        'dnd_container', 'dnd_draggable', 'get_dnd_data'

    ]
    for (let interactivity of m_interactivity) {
        guiderefs[`int.${interactivity}`] = `${base}/guides/interactivity#Interactive.${interactivity}`;
    }
        guiderefs['int.locator_draw'] = `${base}/guides/interactivity#Interactive.locator`;
        guiderefs['int.locator_initial_draw'] = `${base}/guides/interactivity#Interactive.locator`;
        guiderefs['int.drag_and_drop_initial_draw'] = `${base}/guides/interactivity#Interactive.dnd_container`;
        guiderefs['int.dnd_initial_draw'] = `${base}/guides/interactivity#Interactive.dnd_container`;
        guiderefs['int.set'] = `${base}/guides/interactivity#custom_external`;
        guiderefs['int.get'] = `${base}/guides/interactivity#custom_external`;

    let m_modifier = [
        'subdivide', 'resample', 'round_corner', 'add_arrow', 'arrowhead_replace'
    ]
    for (let modifier of m_modifier) {
        guiderefs[`mod.${modifier}`] = `${base}/guides/modifier#mod.${modifier}`;
    }
    guiderefs['apply'] = `${base}/guides/modifier#Diagram.apply`;

    let f_utilities = [
        'to_radian', 'to_degree', 'array_repeat', 'linspace', 'linspace_exc', 'range', 'range_inc'
    ]
    for (let utility of f_utilities) {
        guiderefs[utility] = `${base}/guides/utilities#${utility}`;
    }
    guiderefs['V2'] = `${base}/guides/utilities#Vector2`;
    guiderefs['Vector2'] = `${base}/guides/utilities#Vector2`;
    guiderefs['Vdir'] = `${base}/guides/utilities#Vector2`;

    let m_geometry = [
        'circle_radius', 'circle_tangent_point_from_point', 'line_extend',
    ]
    for (let geometry of m_geometry) {
        guiderefs[`geometry.${geometry}`] = `${base}/guides/geometry#geometry.${geometry}`;
    }

    let m_annotation = [
        'vector', 'angle', 'angle_smaller', 'length',
    ]
    for (let annotation of m_annotation) {
        guiderefs[`annotation.${annotation}`] = `${base}/guides/annotation#annotation.${annotation}`;
    }

    let m_technical = [
        'mut', 'immut', 'copy'
    ]
    for (let technical of m_technical) {
        guiderefs[technical] = `${base}/guides/technical#Diagram.${technical}`;
    }

    let m_bar = [
        'plot', 'xaxes', 'yaxes',
    ]
    for (let bar of m_bar) {
        guiderefs[`bar.${bar}`] = `${base}/guides/bar#bar.${bar}`;
    }
    
    let m_table = [
        'table'
    ]
    for (let table of m_table) {
        guiderefs[`table.${table}`] = `${base}/guides/table#table.${table}`;
    }
    
    let m_boolean = [
        'union', 'difference', 'intersect', 'xor'
    ]
    for (let boolean of m_boolean) {
        guiderefs[`boolean.${boolean}`] = `${base}/guides/boolean#boolean.${boolean}`;
    }
    
    let m_tags = [
        'append_tags',  'remove_tags', 'reset_tags', 'contain_tag', 'contain_all_tags', 
        'apply_to_tagged_recursive', 'get_tagged_elements'
    ]
    for (let tags of m_tags) {
        guiderefs[tags] = `${base}/guides/tags#Diagram.${tags}`;
    }

    return guiderefs;
}
