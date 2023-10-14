export function left_trim_block(block : string){
	let lines = block.split('\n');
	if (lines.length <= 1) return block;

	if (lines[0] == '') lines.shift();
	// count indent of lines[1]
	let indent = 0;
	for (let i = 0; i < lines[0].length; i++) {
		if (lines[0][i] == ' ') indent++;
		else break;
	}
	// remove indent from all lines
	for (let i = 0; i < lines.length; i++) {
		lines[i] = lines[i].substring(indent);
	}
	return lines.join('\n');
}

export function parse_content(block : string){
	let code_str = left_trim_block(block);
	code_str = code_str.replace(/&lt;/g, '<');
	code_str = code_str.replace(/&gt;/g, '>');
	code_str = code_str.replace(/&amp;/g, '&');
	code_str = code_str.replace(/&quot;/g, '"');
	code_str = code_str.replace(/&apos;/g, "'");
	code_str = code_str.replace(/&nbsp;/g, ' ');
	return code_str;
}
