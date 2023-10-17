import { base } from '$app/paths';

export function generate_guiderefs() : {[key : string] : string} {
	const guiderefs : {[key : string] : string} = {
		'draw'    : `${base}/guides/usage#draw`,
	}

	let g_shapes = [
		'polygon', 'curve', 'text',
		'rectangle', 'square', 'regular_polygon', 'regular_polygon_side', 'circle', 'arc', 'arrow', 'textvar',
	];
	for (let shape of g_shapes) {
		guiderefs[shape] = `${base}/guides/shapes#${shape}`;
	}

	let g_transformation = [
		'translate',  'position', 'rotate', 'scale', 
		'vflip', 'hflip',
		'reflect', 'reflect_over_point', 'reflect_over_line', 'transform'
	]
	for (let transformation of g_transformation) {
		guiderefs[transformation] = `${base}/guides/transformation#Diagram.${transformation}`;
	}

	return guiderefs;
}
