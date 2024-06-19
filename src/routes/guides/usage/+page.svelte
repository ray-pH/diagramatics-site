<svelte:head>
    <title>Usage - Guide : Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
</svelte:head>

<script lang="ts">
    import Header from '../../Header.svelte'
    import Diagramatics from '../../DiagramaticsWithCode.svelte'
    import Navigation from '../navigation.svelte'
    import 'diagramatics/css/diagramatics.css'
    import '../guides.css'
    import { base } from '$app/paths';

    import hljs from 'highlight.js/lib/core';
    import html from 'highlight.js/lib/languages/xml';
    import bash from 'highlight.js/lib/languages/bash';
    import javascript from 'highlight.js/lib/languages/javascript';
    import 'highlight.js/styles/lightfair.css';
    import { onMount } from 'svelte';
    import { generate_guiderefs } from '../../guiderefs';

    let guiderefs = generate_guiderefs();
    var width = 200;
    var height = 200;

    onMount(() => {
        hljs.registerLanguage('html', html);
        hljs.registerLanguage('bash', bash);
        hljs.registerLanguage('javascript', javascript);
        hljs.highlightAll();

        let hljscode = document.getElementsByClassName('hljs');
        for (let i = 0; i < hljscode.length; i++) {
            let function_elems = hljscode[i].getElementsByClassName('function_');
            for(let elem of function_elems as HTMLCollectionOf<HTMLSpanElement>){
                let name = elem.innerText;
                if(guiderefs[name]){
                    elem.innerHTML = 
                    `<a href="${guiderefs[name]}" class="hljs-title guiderefs">${name}</a>`;
                }
            }
        }


    });
</script>

<style>
	/* 'blue'        : '#1f77b4', */
	/* 'lightblue'   : '#aec7e8', */
	/* 'orange'      : '#ff7f0e', */
	/* 'lightorange' : '#ffbb78', */
	/* 'green'       : '#2ca02c', */
	/* 'lightgreen'  : '#98df8a', */
	/* 'red'         : '#d62728', */
	/* 'lightred'    : '#ff9896', */
	/* 'purple'      : '#9467bd', */
	/* 'lightpurple' : '#c5b0d5', */
	/* 'brown'       : '#8c564b', */
	/* 'lightbrown'  : '#c49c94', */
	/* 'grey'        : '#7f7f7f', */
	/* 'lightgrey'   : '#c7c7c7', */
    .code-snippet {
        position: relative;
        margin-top: 1em;
    }
    .code-filename {
        position: absolute;
        font-size: 0.9em;
        left: 0;
        background: #1f77b4;
        color: white;
        padding: 2px 30px;
        border-radius: 20px 0px 20px 0px;
    }
    .code-html,.code-javascript {
        background-color: #f5f5f5;
        border-radius: 20px;
    }
    .cdn-url {
        display: inline-block;
    }
    .cdn-table-container {
        overflow-x: auto;
    }
    .cdn-table {
        display: grid;
        grid-template-columns: 150px 20px 1fr;
        margin: 10px;
    }
    .cdn-table>span {
        font-weight: bold;
    }
    .cdn-url>pre {
        margin: 0;
        padding: 0;
        font-size: 1.1em;
        color: #1f77b4;
    }
    i{
        color: gray;
    }
    .code-playground-card>img{
        width: 2em;
        height: 2em;
        vertical-align: middle;
        background: white;
        border-radius: 10px;
    }
    .code-playground-card{
        display: inline-block;
        border: 1px solid #1f77b4;
        border-radius: 10px;
        padding: 10px 15px;
        color: #1f77b4;
    }
    .code-playground-card:hover{
        background: #1f77b4;
        color: white;
    }
    .btn {
        width: 200px;
        font-family: inherit;
        border-style: none;
        padding: 10px;
        border-radius: 10px;
        background-color: #DDD;
    }
    .btn:hover{
        cursor: pointer;
        background-color: #EEE;
    }
</style>

<Header />
<div class="guides-container">
    <Navigation page="usage"/>
    <h1>Try Online</h1>
    Try online &nbsp;
    <a class="code-playground-card" 
       href="{base}/editor/" target="_blank">
        <img src="{base}/assets/diagramatics_logo.png" alt="diagramatics_logo">
        Diagramatics Online Editor
    </a>
    <br>
    <p><i>Or use online code playgrounds</i></p>
    <a class="code-playground-card" 
        href="https://jsfiddle.net/photon_cruncher/b2yk789w/" target="_blank">
        <img src="{base}/assets/jsfiddle.png" alt="jsfiddle_logo">
        Edit in JSFiddle
    </a>
    <a class="code-playground-card" 
        href="https://jsitor.com/Bfkx-GNFxz" target="_blank">
        <img src="{base}/assets/jsitor.png" alt="jsitor_logo">
        Edit in JSitor
    </a>

    <br> <br>
    <hr>
    <h1>Install</h1>
    <h2>CDN</h2>
    The simplest way of using Diagramatics is to import it from a CDN. <br>
    <div class="cdn-table-container">
        <div class="cdn-table">
            <!-- <span>javascript</span>&nbsp:
            <div class="cdn-url"><pre>https://unpkg.com/diagramatics@1.x.x/dist/index.js</pre></div>
            <span>css</span>&nbsp:
            <div class="cdn-url"><pre>https://unpkg.com/diagramatics@1.x.x/css/diagramatics.css</pre></div> -->
            <span>javascript</span>&nbsp:
            <div class="cdn-url"><pre>https://cdn.jsdelivr.net/npm/diagramatics@1.5/dist/diagramatics.js</pre></div>
            <span>javascript (min)</span>&nbsp:
            <div class="cdn-url"><pre>https://cdn.jsdelivr.net/npm/diagramatics@1.5/dist/diagramatics.min.js</pre></div>
            <span>css</span>&nbsp:
            <div class="cdn-url"><pre>https://cdn.jsdelivr.net/npm/diagramatics@1.5/css/diagramatics.css</pre></div>
        </div>
    </div>
    <span style="color:gray; font-style:italic;">
        *you can change "1.x.x" into the version you want to use, or use "latest" to always use the latest version.
    </span><br>
    <span style="color:gray; font-style:italic;">
        *css is only required to style the interactive controls.
    </span><br><br>
    The default font used in Diagramatics is <b>Latin Modern Math</b>. You can link it from CDN, download it, or any other way you want.
    <div class="cdn-table-container">
        <div class="cdn-table">
            <span>font</span>&nbsp:
            <div class="cdn-url"><pre>https://fonts.cdnfonts.com/css/latin-modern-math</pre></div>
        </div>
    </div>
    <br><br>

    The minimal example below shows how to draw a red square on an SVG element.
    <div class="code-snippet">
        <span class="code-filename">index.html</span>
        <pre><code class="code-html">
{`<!DOCTYPE html>
<html>
    <body>
        <svg id="mysvg"></svg>
    </body>
    <script` + ` type="module">
        import {square, draw_to_svg} from 'https://cdn.jsdelivr.net/npm/diagramatics@1.5/dist/diagramatics.min.js'
        let mysvg = document.getElementById('mysvg');
        let sq = square(10).fill('red');
        draw_to_svg(mysvg, sq);
    </script` +`>
</html>`}
        </code></pre>
    </div>

    <h2>Package Manager</h2>
    You can also download it from npm using the package manager of your choice.
    <pre><code class="code-bash">
$ npm install diagramatics
    </code></pre>

    After installing, you can import it into your project.
    <div class="code-snippet">
        <span class="code-filename">index.html</span>
        <pre><code class="code-html">
{`<!DOCTYPE html>
<html>
    <body>
        <svg id="mysvg"></svg>
    </body>
    <script` + ` type="module">
        import {square, draw_to_svg} from 'diagramatics'
        let mysvg = document.getElementById('mysvg');
        let sq = square(10).fill('red');
        draw_to_svg(mysvg, sq);
    </script` +`>
</html>`}
        </code></pre>
    </div>

    <hr>

    <!-- ---------------------------------------------------------------------------------- -->
    <h1>Usage</h1>

    <h2>Minimal example</h2>
    All you need to have in your html file is an <b>svg element</b> to draw the diagram. <br>
    If you want to add <b>interactive controls</b>, you also need a <b>div element</b> to hold the controls and a link to the <b>css</b>.
    <div class="code-snippet">
        <span class="code-filename">index.html</span>
        <pre><code class="code-html">
{`<!DOCTYPE html>
<html>
    <head>
        <!-- css for 'Latin Modern Math' font -->
        <link href="https://fonts.cdnfonts.com/css/latin-modern-math" rel="stylesheet">
        <!-- optional css for interactive controls -->
        <link href="diagramatics/css/diagramatics.css" rel="stylesheet">
    </head>
    <body>
        <!-- svg component to draw the diagram -->
        <svg id="mysvg"></svg>

        <!-- optional div to hold interactive controls -->
        <div id="controldiv"></div>
    </body>
    <`+`script src="index.js" type="module"><`+`/script>
</html>`}
        </code></pre>
    </div>

    Minimal example for the <code>index.js</code> file.
    <div class="code-snippet">
        <span class="code-filename">index.js</span>
        <pre><code class="code-javascript">
{`// import the necessary functions from the library
import {square, draw_to_svg} from 'diagramatics'

// get the svg element
let mysvg = document.getElementById('mysvg');

// build the diagram
let sq = square(10).fill('red');

// draw the diagram to \`mysvg\`
draw_to_svg(mysvg, sq);`}
        </code></pre>
    </div>


    <h2 id="draw">draw function</h2>
    <code>draw_to_svg()</code> only accept a single diagram object to draw. To draw multiple diagram objects, use <code>diagram_combine()</code> to combine them into a single diagram object. <br>
    To make it simpler, we can also define a function to draw the diagram.
    <div class="code-snippet">
        <span class="code-filename">index.js</span>
        <pre><code class="code-javascript">
{`// import the necessary functions from the library
import {square, draw_to_svg, diagram_combine} from 'diagramatics'

// get the svg element
let mysvg = document.getElementById('mysvg');

// define the \`draw\` function
let draw = (...diagrams) => {
    draw_to_svg(mysvg, diagram_combine(...diagrams));
};

// build the diagram objects
let sq = square(10).fill();
let sq2 = square(2).fill('red')

// draw the diagram to \`mysvg\`
draw(sq, sq2);`}
        </code></pre>
    </div>

    <h2>Add interactivity</h2>
    <div class="code-snippet">
        <span class="code-filename">index.js</span>
        <pre><code class="code-javascript">
{`// import the necessary functions from the library
import {square, draw_to_svg, diagram_combine, V2, Interactive} from 'diagramatics'

// get the svg and control element
let mysvg = document.getElementById('mysvg');
let controldiv = document.getElementById('controldiv');

// define the \`draw\` function
let draw = (...diagrams) => {
    draw_to_svg(mysvg, diagram_combine(...diagrams));
};
// create the interactive object
let int = new Interactive(controldiv, mysvg);

// build the diagram objects
int.draw_function = (inp) => {
    let x = inp['x'];
    let big_sq   = square(10).fill();
    let small_sq = square(2).fill('red').translate(V2(x,0));

    draw(big_sq, small_sq);
}

int.slider('x', -10, 10, 0);
int.draw();
`}
        </code></pre>
    </div>

    <hr>
    <h1>Importing</h1>

    You can use the <code>import</code> statement to import the necessary functions from the library one by one.
    <div class="code-snippet">
        <span class="code-filename">index.js</span>
        <pre><code class="code-javascript">
{`import {square, circle, V2} from 'diagramatics'

let sq   = square(10).fill();
let circ = circle(2).fill('red').translate(V2(5,0));
`}
        </code></pre>
    </div>

    You can also import everything from the library using the <code>*</code> wildcard and give it an alias.
    <div class="code-snippet">
        <span class="code-filename">index.js</span>
        <pre><code class="code-javascript">
{`import * as dg from 'diagramatics'

let sq   = dg.square(10).fill();
let circ = dg.circle(2).fill('red').translate(dg.V2(5,0));
`}
        </code></pre>
    </div>

    Or, if you're feeling frisky, you can import everything and put it in the global namespace.
    <div class="code-snippet">
        <span class="code-filename">index.js</span>
        <pre><code class="code-javascript">
{`import * as dg from 'diagramatics'
Object.entries(dg).forEach(([name, exported]) => window[name] = exported);

let sq   = square(10).fill();
let circ = circle(2).fill('red').translate(V2(5,0));
`}
        </code></pre>
    </div>

    <hr>
    <h1>Downloading the Diagram</h1>
    You can download the diagram as an <b>svg</b> or <b>png</b> file using the <code>download_svg_as_svg()</code> and <code>download_svg_as_png()</code> functions respectively.<br><br>
    The size of the image will follow the size of the svg element in the html file.
    <Diagramatics title="download_svg_as_svg" subtitle="(outer_svgelement : SVGSVGElement)" {width} height={10}>
    </Diagramatics>
    <Diagramatics title="download_svg_as_png" subtitle="(outer_svgelement : SVGSVGElement)" {width} {height}
        hidden_code="diagram_svg.id = 'mysvg_svg'"
        >
        {`
        let mysvg   = document.getElementById('mysvg_svg');
        let btn_svg = document.getElementById('btn_download_svg_as_svg');
        let btn_png = document.getElementById('btn_download_svg_as_png');

        btn_svg.onclick = () => { download_svg_as_svg(mysvg); }
        btn_png.onclick = () => { download_svg_as_png(mysvg); }

        let sq  = square(10).fill('white');
        let sq2 = square(4).fill('lightblue'); 
        draw(sq, sq2);
        `}
    </Diagramatics>
    <button id="btn_download_svg_as_svg" class="btn">Download as SVG</button>
    <br><br>
    <button id="btn_download_svg_as_png" class="btn">Download as PNG</button>
    <br><br>
    <hr>

</div>
