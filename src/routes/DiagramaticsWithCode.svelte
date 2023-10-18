<script lang="ts">
    import Diagramatics from './Diagramatics.svelte'
    import { parse_content } from './codeformatutils'
    import { onMount } from 'svelte';
    import hljs from 'highlight.js/lib/core';
    import javascript from 'highlight.js/lib/languages/javascript';
    import 'highlight.js/styles/lightfair.css';
    import { generate_guiderefs, known_dg_object } from './guiderefs';
    import './guiderefs.css';

    hljs.registerLanguage('javascript', javascript);

    export let width  : number = 300;
    export let height : number = 300;
    export let margin_right : number = 20;
    export let title  : string = "";
    export let subtitle : string = "";
    export let subtitle_is_args : boolean = true;
    export let subtitle_newline : boolean = false;
    export let use_guiderefs    : boolean = true;

    // ======================== code

    let content_div : HTMLDivElement;
    let example_code : HTMLDivElement;
    let guiderefs = generate_guiderefs();

    function parse_subtitle_args(subtitle : string) : [string, string][]{
        try{
            // (x : type, y : type, ...) : type
            // find the index of last )
            let last_paren = subtitle.lastIndexOf(')');
            let args = subtitle.slice(1, last_paren).split(',');
            let rettype = subtitle.slice(last_paren + 1).split(':')[1]?.trim();
            // each arg in args is in the form of `arg_name : arg_type`
            let split_type = (arg : string) => {
                let indexof_colon = arg.indexOf(':');
                let arg_name = arg.slice(0, indexof_colon).trim();
                let arg_type = arg.slice(indexof_colon + 1).trim();
                return [arg_name, arg_type];
            }
            let parsed = args.map((arg : string) => split_type(arg));
            parsed.push(["return", rettype]);
            return parsed as [string, string][];
        }catch(e){
            return [[`error parsing subtitle: ${e}`,""]];
        }
    }

    function get_guideref_elementstr(elem : HTMLSpanElement) : string | null {
        let name = elem.innerText;
        // check for mod.* geometry.* etc.
        // check previous element
        let prev = elem.previousSibling;
        if (prev != null){
            // If the node is a text node, the nodeType property will return 3.
            if (prev.nodeType == 3){
            }
        }
        if (guiderefs[name]){
            return `<a href="${guiderefs[name]}" class="hljs-title guiderefs">${name}</a>`;
        }
        return null;
    }
    function handle_guiderefs(code_pre : Element){
        // get all function and methods, put href for all the supported names
        let function_elems = code_pre.getElementsByClassName('function_');
        for(let elem of function_elems as HTMLCollectionOf<HTMLSpanElement>){
            let str = get_guideref_elementstr(elem);
            if(str){
                elem.innerHTML = str;
            }
        }
    }

    onMount(() => {
        let content = parse_content(content_div.innerHTML);
        let code_pre = example_code.children[0];
        code_pre.innerHTML = hljs.highlight(content, { language: 'javascript' }).value;
        if (use_guiderefs) handle_guiderefs(code_pre);
    });
</script>

<div class="example">
    <Diagramatics {width} {height} {margin_right}>
        <slot/>
    </Diagramatics>
    <div class="example-code-container"> 
        <span class="example-title" id={title}>{title}</span>
        {#if subtitle_newline}<br>{/if}
        {#if subtitle_is_args && subtitle != ""}
            <span class="example-subtitle">(
                {#each parse_subtitle_args(subtitle) as args, i}
                    {#if (i < parse_subtitle_args(subtitle).length - 1)}
                        <span class="example-subtitle-argname">{args[0]}</span>
                        &nbsp;:&nbsp;
                        <span class="example-subtitle-argtype">{args[1]}</span>
                        {#if (i < parse_subtitle_args(subtitle).length - 2)},&nbsp;{/if}
                    {:else}
                        )
                        {#if args[1]}
                            &nbsp;:&nbsp;
                            <span class="example-subtitle-argtype">{args[1]}</span>
                        {/if}
                    {/if}
                {/each}
            </span>
        {:else}
            <span class="example-subtitle">{subtitle}</span>
        {/if}
        {#if subtitle_newline}<br><br>{/if}
        <div class="example-code-bg"> 
            <div bind:this={example_code} class="example-code" style="color: #444"> 
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
    margin: 1em 0;
}
.example-title {
    display: inline-block;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 1.2em;
}
.example-subtitle {
    margin-left: 10px;
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
.example-subtitle-argname{
    font-weight: 600;
    color: #1f77b4;
}
.example-subtitle-argtype{
    color: #666;
    font-family: monospace;
}
</style>

