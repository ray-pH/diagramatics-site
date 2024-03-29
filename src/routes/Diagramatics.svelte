<script lang="ts">
    import {     
        download_svg_as_png, download_svg_as_svg,
        Diagram, polygon, line, curve, empty, text, image, diagram_combine,
        multiline, multiline_bb,
        Vector2, V2, Vdir,
        to_radian, to_degree, linspace, range, array_repeat,
        linspace_exc, range_inc,

        draw_to_svg,
        default_diagram_style, default_text_diagram_style, default_textdata,
        _init_default_diagram_style, _init_default_text_diagram_style, _init_default_textdata,
        reset_default_styles,
        rectangle, square, regular_polygon, regular_polygon_side, circle, arc,
        arrow, arrow1, arrow2, textvar, rectangle_corner,
        str_to_mathematical_italic,
        Interactive,
        get_SVGPos_from_event,
        clientPos_to_svgPos,
        axes_transform, ax, axes_empty, axes_corner_empty,
        xtickmark_empty, xtickmark, xticks,
        ytickmark_empty, ytickmark, yticks,
        xyaxes, xygrid, xycorneraxes,
        xaxis, yaxis,
        plot, plotv, plotf, under_curvef,
        align_vertical, align_horizontal,
        distribute_horizontal, distribute_vertical,
        distribute_horizontal_and_align, distribute_vertical_and_align, 
        distribute_grid_row,
        cubic_spline,

        graph,
        geometry,
        annotation,
        mechanics,
        mod,
        bar,
        numberline,
        boxplot,
        table,
    } from 'diagramatics'
    // `text()` is overwritten by something that is generated by svelte
    // fix it with some hack
    import { text as dgtext } from 'diagramatics'
    let HACK_FOR_DIAGRAMATICS_IMPORT = [
        dgtext,

        download_svg_as_png, download_svg_as_svg,
        Diagram, polygon, line, curve, empty, text, image, diagram_combine,
        multiline, multiline_bb,
        Vector2, V2, Vdir,
        to_radian, to_degree, linspace, range, array_repeat,
        linspace_exc, range_inc,

        draw_to_svg,
        default_diagram_style, default_text_diagram_style, default_textdata,
        _init_default_diagram_style, _init_default_text_diagram_style, _init_default_textdata,
        reset_default_styles,
        rectangle, square, regular_polygon, regular_polygon_side, circle, arc,
        arrow, arrow1, arrow2, textvar, rectangle_corner,
        str_to_mathematical_italic,
        Interactive,
        get_SVGPos_from_event,
        clientPos_to_svgPos,
        axes_transform, ax, axes_empty, axes_corner_empty,
        xtickmark_empty, xtickmark, xticks,
        ytickmark_empty, ytickmark, yticks,
        xaxis, yaxis,
        xyaxes, xygrid, xycorneraxes,
        plot, plotv, plotf, under_curvef,

        align_vertical, align_horizontal,
        distribute_horizontal, distribute_vertical,
        distribute_horizontal_and_align, distribute_vertical_and_align, 
        distribute_grid_row,
        cubic_spline,

        graph,
        geometry,
        annotation,
        mechanics,
        mod,
        bar,
        numberline,
        boxplot,
        table,
    ]

    import { onMount } from 'svelte';
    import { parse_content } from './codeformatutils'

    export let width  : number = 300;
    export let height : number = 300;
    export let margin_right : number = 20;
    export let control_margin_left : number = 20;
    export let hidden_code  : string  = "";

    // ======================== code

    let diagram_svg : SVGSVGElement;
    let control_container : HTMLDivElement;
    let content_div : HTMLDivElement;

    onMount(() => {
        // diagramatics helper function
        let draw = (...diagrams : Diagram[]) => {
            draw_to_svg(diagram_svg, diagram_combine(...diagrams));
        };

        let int = new Interactive(control_container, diagram_svg);

        // reset default styles
        reset_default_styles();

        let content = parse_content(content_div.innerHTML);
        try {
            // `text()` is overwritten by something that is generated by svelte
            // fix it with some hack
            let text = dgtext;
            if (hidden_code) content = hidden_code + '\n' + content;
            eval(content);
        } catch (e) {
            diagram_svg.outerHTML = (e as Error).toString();
            console.warn(e);
        }

        // delete `control_container` if it's empty
        if (!control_container.innerHTML){
            // delete controlelem if it's empty
            control_container.outerHTML = '';
        }

        // =================== hack
        // hack to make svelte not remove the unused variables
        // because we're using `eval` here
        let x = Math.random();
        if (x+1 == x) console.log(draw, int, HACK_FOR_DIAGRAMATICS_IMPORT);
        // =================== hack
    });
</script>

<div class="example-diagram">
    <svg bind:this={diagram_svg} class="svg-diagram" 
             style="width: {width}px; height: {height}px; margin-right: {margin_right}px"></svg>
    <div bind:this={control_container} class="control-container" style="margin-left : {control_margin_left}px"> </div>
</div>
<div bind:this={content_div} style="display:none"> 
    <slot/>
</div>


<style>
.example-diagram {
    display: inline-block;
    vertical-align: top;
}
</style>

