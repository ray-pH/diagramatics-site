<script lang="ts">
    import {     
        Diagram, polygon, line, curve, empty, text, diagram_combine,
        Vector2, V2, Vdir, from_degree, linspace, 
        draw_to_svg,
        default_diagram_style, default_text_diagram_style, default_textdata,
        _init_default_diagram_style, _init_default_text_diagram_style, _init_default_textdata,
        rectangle, square, regular_polygon, regular_polygon_side, circle, arc,
        arrow, arrow2, textvar,
        str_to_mathematical_italic,
        Interactive,
        axes_transform, ax, axes_empty, 
        xtickmark_empty, xtickmark, xticks,
        ytickmark_empty, ytickmark, yticks,
        xyaxes, xygrid,
        plot, plotv, plotf, under_curvef,

        align_vertical, align_horizontal,
        distribute_horizontal, distribute_vertical,
        distribute_horizontal_and_align, distribute_vertical_and_align, 

        annotation,
        mechanics,
        mod,
    } from 'diagramatics'
    import { onMount } from 'svelte';
    import hljs from 'highlight.js/lib/core';
    import javascript from 'highlight.js/lib/languages/javascript';
    import 'highlight.js/styles/lightfair.css';

    hljs.registerLanguage('javascript', javascript);

    export let width  : number = 400;
    export let height : number = 300;
    export let title  : string = "";
    export let subtitle : string = "";

    // ======================== code

    let diagram_svg : SVGSVGElement;
    let control_container : HTMLDivElement;
    let content_div : HTMLDivElement;
    let example_code : HTMLDivElement;
    // let content_div : HTMLDivElement;


    function left_trim_block(block : string){
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

    function parse_content(block : string){
        let code_str = left_trim_block(block);
        code_str = code_str.replace(/&lt;/g, '<');
        code_str = code_str.replace(/&gt;/g, '>');
        code_str = code_str.replace(/&amp;/g, '&');
        code_str = code_str.replace(/&quot;/g, '"');
        code_str = code_str.replace(/&apos;/g, "'");
        code_str = code_str.replace(/&nbsp;/g, ' ');
        return code_str;
    }

    onMount(() => {
        // diagramatics helper function
        let draw = (...diagrams : Diagram[]) => {
            draw_to_svg(diagram_svg, diagram_combine(...diagrams));
        };
        let int = new Interactive(diagram_svg, control_container);

        let content = parse_content(content_div.innerHTML);
        try {
            eval(content);
        } catch (e) {
            diagram_svg.outerHTML = (e as Error).toString();
            console.warn(e);
        }

        // delete `control_container` if it's empty
        if (Object.keys(int.inp_variables).length == 0) {
            // delete controlelem if it's empty
            control_container.outerHTML = '';
        }
        // reset default styles
        for (let s in default_diagram_style) 
            default_diagram_style[s] = _init_default_diagram_style[s];
        for (let s in default_text_diagram_style)
            default_text_diagram_style[s] = _init_default_text_diagram_style[s];
        for (let s in default_textdata)
            default_textdata[s] = _init_default_textdata[s];

        let code_pre = example_code.children[0];
        code_pre.innerHTML = hljs.highlight(content, { language: 'javascript' }).value;
    });
</script>

<div class="example">
    <div class="example-diagram">
        <svg bind:this={diagram_svg} class="svg-diagram" 
            style="width: {width}; height: {height};"></svg>
        <div bind:this={control_container} class="control-container"> </div>
    </div>
    <div class="example-code-container"> 
        <span class="example-title">{title}</span>
        <span class="example-subtitle">{subtitle}</span>
        <div class="example-code-bg"> 
            <div bind:this={example_code} class="example-code"> 
                <pre></pre>
            </div>
        </div>
    </div>
</div>
<div bind:this={content_div} style="display:none"> 
    <slot/>
</div>


<style>
pre{
    margin:0;
}
.example {
    font-family: 'Ubuntu', sans-serif;
    display: flex;
    flex-flow: row wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin: 1em;
}
.control-container {
    margin-left: 60px;
    margin-bottom: 100px;
}
.example-title {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 1.2em;
}
.example-code-container {
    flex-grow: 1;
    overflow-x: auto;
}
.example-code-bg {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
}
</style>

