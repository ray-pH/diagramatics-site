<script lang="ts">
    import * as dg from 'diagramatics'

    import { code_str, eval_status, eval_msg, code_loaded_str } from './stores';
    import { onMount } from 'svelte';

    let diagram_svg : SVGSVGElement;
    let control_div : HTMLDivElement;
    let prev_valid_str = "";
    let curr_str = "";
    let width  = 300;
    let height = 300;

    let editor = {
        set_dimension : (w : number, h : number) => {
            width  = w;
            height = h;
        },
    };

    let typing_timeout : number | undefined = undefined;
    const draw = (...diagrams : dg.Diagram[]) => {
        if (diagram_svg == null) return;
        dg.draw_to_svg_element(diagram_svg, dg.diagram_combine(...diagrams));
        // HACK: temporary solution: 
        //       draw twice to make sure the scaing is correct
        //       when the svg is resized
        setTimeout(() => {
            dg.draw_to_svg(diagram_svg, dg.diagram_combine(...diagrams));
        }, 10);
    };
    let int : dg.Interactive; 
    onMount(() => {
        int = new dg.Interactive(control_div, diagram_svg);
        // =================== hack
        // hack to make svelte not remove the unused variables
        // because we're using `eval` here
        let x = Math.random();
        if (x+1 == x) console.log(draw, int, editor, dg);
        // =================== hack
    });

    const eval_diagram = (str : string) => {

        // reset default styles
        dg.reset_default_styles();

        let success = true;
        if (control_div) control_div.innerHTML = '';
        try {
            const declarations = Object.keys(dg).map(key => `const ${key} = dg.${key};`).join('\n'); //expose all the functions in the library for the eval context
            const functionBody = `${declarations}\n${str};`; // concatenate the dg exposed functions with the user's code
            eval(functionBody);
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
            if(success){
                prev_valid_str = str;
                eval_status.set('success');
                if (typing_timeout) clearTimeout(typing_timeout);
                typing_timeout = undefined;
            }
        }
    }


    // get error position from error.stack
    function parse_error_position(e : Error){
        try{
            // e.stack :
            //    ReferenceError: s is not defined
            //    at eval (eval at eval_diagram (index.js:24:9), <anonymous>:3:16)
            //    at eval_diagram (index.js:24:9)
            //    at index.js:66:5
            //    at editor.js:21674:7
            // get second line of e.stack
            let line1 = e.stack?.split('\n')[1];
            // line1:
            //    at eval (eval at eval_diagram (index.js:24:9), <anonymous>:3:16)
            // get the part after <anonymous> and also remove the last ')'
            let pos = line1?.split('<anonymous>:')[1].slice(0, -1);
            return pos
        }catch (err) {
            console.warn(e);
            return ''
        }
    }

    // waiting for user to stop typing, then show if there is an error
    function wait_typing_show_error(e : Error){
        eval_status.set('error');
        let error_message = e.toString();
        let error_position = parse_error_position(e);

        let position_msg = error_position ? `at ${error_position}` : '';
        eval_msg.set(`${error_message} ${position_msg}`);

        if (typing_timeout) clearTimeout(typing_timeout);
        typing_timeout = undefined;
    }

    code_str.subscribe((value) => { 
        curr_str = value;
        eval_diagram(value); 
    });

    // ============================= saves ===============================

    function download_code() {
        const link = document.createElement("a");
        const content = curr_str;
        const file = new Blob([content], { type: "text/plain;charset=utf-8" });
        link.href = URL.createObjectURL(file);
        link.download = "diagramatics.js";
        link.click();
        URL.revokeObjectURL(link.href);
    }

    function load_code(){
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e : any) => { 
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file,'UTF-8');
            reader.onload = readerEvent => {
                const content = readerEvent.target?.result as string;
                code_loaded_str.set(content);
            }
        }
        input.click();
    }

    function download_svg() {
        dg.download_svg_as_svg(diagram_svg);
    }
    function download_png() {
        dg.download_svg_as_png(diagram_svg);
    }
</script>

<div class="top-block">
    <div class="svg-container">
        <svg id="svg" width={width} height={height} bind:this={diagram_svg}></svg>
        <div id="control-container" bind:this={control_div}>
        </div>
    </div>

    <div class="svg-settings-container">
        <span class="svg-settings-span">code</span>
        <button id="svg-load-code-button" class="svg-settings-button" on:click={load_code}>
            load code</button>
        <button id="svg-save-code-button" class="svg-settings-button" on:click={download_code}>
            save code</button>
        <hr>
        <span class="svg-settings-span">save image</span>
        <button id="svg-save-button" class="svg-settings-button" on:click={download_svg}>
            svg</button>
        <button id="svg-save-button" class="svg-settings-button" on:click={download_png}>
            png</button>
        <hr>
        <!-- input for width and height -->
        <span class="svg-settings-span">dimension</span>
        <div class="svg-settings-dimension">
            <label for="width">width</label>
            <input type="number" id="width" bind:value={width} min="0" step="1"/>
            <label for="height">height</label>
            <input type="number" id="height" bind:value={height} min="0" step="1"/>
        </div>
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
        text-align: right;
        /* display: inline-block; */
    }

    #control-container{
        margin-left: 10px;
    }

    .svg-settings-span{
        font-size: 0.8em;
    }
    .svg-settings-span::after{
        content: '\a0\a0';
        background-color: #aec7e8;
        margin-left: 0.6em;
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
    .svg-settings-dimension{
        margin-top: 5px;
        font-size: 0.8em;
    }
    .svg-settings-dimension>input{
        width:50%;
    }
</style>
