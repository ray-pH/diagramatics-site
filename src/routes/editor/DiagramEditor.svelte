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
    import { browser } from "$app/environment";
    import { code_str, eval_status } from './stores';
    import { onMount } from 'svelte';

    let diagram_svg : SVGSVGElement;
    let control_div : HTMLDivElement;
    let prev_str = "";

    let typing_timeout : number | undefined = undefined;

    const draw = (...diagrams : Diagram[]) => {
        draw_to_svg(diagram_svg, diagram_combine(...diagrams));
    };
    let int : Interactive; 
    onMount(() => {
        int = new Interactive(diagram_svg, control_div);
    });

    const eval_diagram = (str : string) => {

        // reset default styles
        for (let s in default_diagram_style) 
            (default_diagram_style as any)[s] = (_init_default_diagram_style as any)[s];
        for (let s in default_text_diagram_style)
            (default_text_diagram_style as any)[s] = (_init_default_text_diagram_style as any)[s];
        for (let s in default_textdata)
            (default_textdata as any)[s] = (_init_default_textdata as any)[s];

        let success = true;
        if (control_div) control_div.innerHTML = '';
        try {
            eval(str);
        } catch (e) {
            // wait first to see if user is still typing
            // if user is still typing, then don't show error
            success = false;
            eval_status.set('waiting');
            if (typing_timeout) clearTimeout(typing_timeout);
            typing_timeout = setTimeout(() => {
                wait_typing_show_error(e as Error)
            }, 500);
        } finally {
            if (browser) localStorage.setItem('editorCode', str);
            if(success){
                prev_str = str;
                eval_status.set('success');
                if (typing_timeout) clearTimeout(typing_timeout);
                typing_timeout = undefined;
            }
        }
    }

    // waiting for user to stop typing, then show if there is an error
    function wait_typing_show_error(e : Error){
        eval_status.set('error');
        let error_message = e.toString();
        //let error_position = parse_error_position(e);

        // editor_footer_desc.innerHTML = `${error_message} at ${error_position}`;

        if (typing_timeout) clearTimeout(typing_timeout);
        typing_timeout = undefined;
    }

    code_str.subscribe((value) => {
        eval_diagram(value);
    });
</script>

<div class="top-block">
    <div class="svg-container">
        <svg id="svg" width="300px" height="300px" bind:this={diagram_svg}></svg>
        <div id="control-container" bind:this={control_div}>
        </div>
    </div>

    <div class="svg-settings-container">
        <button id="svg-preview-button" class="svg-settings-button" on:click={() => alert('not implemented')}>
            preview</button>
        <button id="svg-save-button" class="svg-settings-button" on:click={() => alert('not implemented')}>
            save image</button>
        <button id="svg-share-button" class="svg-settings-button" on:click={() => alert('not implemented')}>
            share</button>
        <button id="svg-save-code-button" class="svg-settings-button" on:click={() => alert('not implemented')}>
            save code</button>
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
