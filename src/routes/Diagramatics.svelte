<script lang="ts">
    import * as dg from 'diagramatics'

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
        let draw = (...diagrams : dg.Diagram[]) => {
            dg.draw_to_svg_element(diagram_svg, dg.diagram_combine(...diagrams));
        };
        const draw_tex = (...diagrams : dg.Diagram[]) => {
            loadMathJax().then(() => {
                let handletex = (str: string, conf: any) => {
                    let mj = (window as any)['MathJax']; 
                    return mj.tex2svg(str, conf).innerHTML;
                };
                dg.draw_to_svg_element(diagram_svg, dg.diagram_combine(...diagrams));
                dg.draw_to_svg_element(diagram_svg, dg.diagram_combine(...diagrams));
                dg.handle_tex_in_svg(diagram_svg, handletex);
            })
        };
        
        let loadMathJax = async () : Promise<void> => new Promise((resolve, reject) =>{
            if (document.getElementById("MathJax-script")) {
              resolve();
              return;
            }
            
            let script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
            script.id = "MathJax-script";
            script.async = true;
            script.onload = () => {
                console.log("MathJax loaded");
                resolve();
            }
            script.onerror = () => reject(`Failed to load the script at url`);
            document.head.appendChild(script);
        });

        let int = new dg.Interactive(control_container, diagram_svg);

        // reset default styles
        dg.reset_default_styles();

        let content = parse_content(content_div.innerHTML);
        try {
            if (hidden_code) content = hidden_code + '\n' + content;
            const declarations = Object.keys(dg).map(key => `const ${key} = dg.${key};`).join('\n'); //expose all the functions in the library for the eval context
            const functionBody = `${declarations}\n{\n${content};\n}`; // concatenate the dg exposed functions with the user's code
            eval(functionBody);
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
        if (x+1 == x) console.log(draw, int, dg, draw_tex);
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
