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
    import { sss } from './stores';

    let diagram_svg : SVGSVGElement;

    var draw = (...diagrams : Diagram[]) => {
        console.log("drawing")
        draw_to_svg(diagram_svg, diagram_combine(...diagrams));
    };
    var eval_diagram = (c : string) => {
        // if (diagram_svg == undefined) return;
        try {
            eval(c);
        } catch (e) {
            console.log(e);
        }
        //draw_code_to_svg(diagram_svg, c);
    }

    sss.subscribe((value) => {
        eval_diagram(value);
    });
    onMount(()=>{
    });
</script>

<div class="top-block">
    <div class="svg-container">
        <svg id="svg" width="300px" height="300px" bind:this={diagram_svg}></svg>
        <div id="control-container">
        </div>
    </div>

    <div class="svg-settings-container">
        <button id="svg-preview-button" class="svg-settings-button">preview</button>
        <button id="svg-save-button" class="svg-settings-button">save image</button>
        <button id="svg-share-button" class="svg-settings-button">share</button>
        <button id="svg-save-code-button" class="svg-settings-button">save code</button>
    </div>
</div>

<style>
    .top-block{
        font-family: Ubuntu, sans-serif;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }
    .svg-container{
        flex-grow: 1;
    }
    .svg-settings-container{
        /* background-color: #DDD; */
        border-radius: 15px;
        padding: 10px;
        width:100px;
        /* display: inline-block; */
    }

    #control-container{
        margin-left: 10px;
    }

    .svg-settings-button{
        border: none;
        font-family: inherit;
        width: 100%;
        margin: 5px 0px;
        padding: 5px;
        border-radius: 5px;
        background-color: #DDD;
        cursor: pointer;
    }
    .svg-settings-button:hover{
        background-color: #aec7e8;
    }


    /* popup */
    #share-popup{
        font-size: 0.8em;
        background-color: #DDD;
        padding: 20px;
        border-radius: 15px;
        position: absolute;
        top: 100px;
        right: 150px;
    }
    #share-popup-close{
        float: right;
    }
</style>
