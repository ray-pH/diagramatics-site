import { base } from '$app/paths';

export function generate_docsrefs() : {[key : string] : string} {
	const docsrefs : {[key : string] : string} = {
		'draw'    : `${base}/guides/usage#draw`,
	}

	let g_shapes = [
		'polygon', 'curve', 'text',
		'rectangle', 'square', 'regular_polygon', 'regular_polygon_side', 'circle', 'arc', 'arrow', 'textvar',
	];
	for (let shape of g_shapes) {
		docsrefs[shape] = `${base}/guides/shapes#${shape}`;
	}

	let g_transformation = [
		'translate',  'position', 'rotate', 'scale', 
		'vflip', 'hflip',
		'reflect', 'reflect_over_point', 'reflect_over_line', 'transform'
	]
	for (let transformation of g_transformation) {
		docsrefs[transformation] = `${base}/guides/transformation#Diagram.${transformation}`;
	}

	return docsrefs;
}
