import { base } from '$app/paths';

export function generate_guiderefs() : {[key : string] : string} {
	const guiderefs : {[key : string] : string} = {
		'draw'    : `${base}/guides/usage#draw`,
	}

	let f_shapes = [
		'polygon', 'curve', 'text',
		'rectangle', 'square', 'regular_polygon', 'regular_polygon_side', 'circle', 'arc', 'arrow', 'textvar',
	];
	for (let shape of f_shapes) {
		guiderefs[shape] = `${base}/guides/shapes#${shape}`;
	}

	let m_transformation = [
		'translate',  'position', 'rotate', 'scale', 
		'vflip', 'hflip',
		'reflect', 'reflect_over_point', 'reflect_over_line', 'transform'
	]
	for (let transformation of m_transformation) {
		guiderefs[transformation] = `${base}/guides/transformation#Diagram.${transformation}`;
	}

	let m_style = [
		'fill', 'stroke', 'opacity', 'strokewidth',
		'strokelinecap', 'strokelinejoin', 'strokedasharray', 'vectoreffect',
		// 'apply' defined in modifier
	]
	for (let style of m_style) {
		guiderefs[style] = `${base}/guides/style#Diagram.${style}`;
	}

	let m_points = [
		'debug', 'get_anchor', 'move_origin', 'parametric_point'
	]
	for (let point of m_points) {
		guiderefs[point] = `${base}/guides/points#Diagram.${point}`;
	}

	let f_plot = [
		'plotv', 'plot', 'plotf',
		'axes_empty', 'axes_corner_empty',
		'xyaxes', 'xycorneraxes', 'xygrid',
	]
	for (let plot of f_plot) {
		guiderefs[plot] = `${base}/guides/plot#${plot}`;
	}

	let f_alignment = [
		'align_vertical', 'align_horizontal',
		'distribute_horizontal', 'distribute_vertical',
		'distribute_horizontal_and_align', 'distribute_vertical_and_align',
	]
	for (let alignment of f_alignment) {
		guiderefs[alignment] = `${base}/guides/alignment#${alignment}`;
	}

	let m_interactivity = [
		'slider', 'locator', 'label'
	]
	for (let interactivity of m_interactivity) {
		guiderefs[interactivity] = `${base}/guides/interactivity#Interactive.${interactivity}`;
	}

	let m_modifier = [
		'subdivide', 'resample', 'round_corner'
	]
	for (let modifier of m_modifier) {
		guiderefs[modifier] = `${base}/guides/modifier#mod.${modifier}`;
	}
	guiderefs['apply'] = `${base}/guides/modifier#Diagram.apply`;

	let f_utilities = [
		'from_degree', 'array_repeat', 'linspace', 'linspace_exc', 'range', 'range_inc'
	]
	for (let utility of f_utilities) {
		guiderefs[utility] = `${base}/guides/utilities#${utility}`;
	}
	guiderefs['V2'] = `${base}/guides/utilities#Vector2`;
	guiderefs['Vector2'] = `${base}/guides/utilities#Vector2`;
	guiderefs['Vdir'] = `${base}/guides/utilities#Vector2`;


	return guiderefs;
}
