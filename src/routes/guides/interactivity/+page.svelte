<svelte:head>
    <title>Interactivity - Guide : Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
</svelte:head>

<script>
    import Header from '../../Header.svelte'
    import Diagramatics from '../../DiagramaticsWithCode.svelte'
    import Navigation from '../navigation.svelte'
    import 'diagramatics/css/diagramatics.css'
    import '../guides.css'
    import { base } from '$app/paths';

    var width = 300;
    var height = 300;

    import { onMount } from 'svelte';
    import hljs from 'highlight.js/lib/core';
    import html from 'highlight.js/lib/languages/xml';
    import bash from 'highlight.js/lib/languages/bash';
    import javascript from 'highlight.js/lib/languages/javascript';
    import 'highlight.js/styles/lightfair.css';

    onMount(() => {
        hljs.registerLanguage('html', html);
        hljs.registerLanguage('bash', bash);
        hljs.registerLanguage('javascript', javascript);
        hljs.highlightAll();
    });

</script>

<Header />
<div class="guides-container">
    <Navigation page="interactivity"/>

    <h1>Interactivity</h1>

    Interactivity is a very important feature of Diagramatics. It allows you to add interactivity to your diagrams, and make them more engaging.
    <!-- interactive object is slider, locator, and custom -->
    The interactive objects in Diagramatics are <code>slider</code>, <code>locator</code>, and <code>label</code>.

    <h2>Setting up Interactivity</h2>
    In the <code>html</code> file, what you need to have is a div to hold the interactive controls, and also to link the css to style the control elements.
    <br><br><i>*In the example below, we import Diagramatics as a package. But you can also import it from the 
        <a href="{base}/guides/usage">CDN</a></i>
    <div class="code-snippet">
        <span class="code-filename">index.html</span>
        <pre><code class="code-html">
{`<!DOCTYPE html>
<html>
    <head>
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

    In the javascript, you need to create the interactive object, let's call it <code>int</code>. You need to pass in the <b>control div</b> and the <b>svg element</b>.

    <div class="code-snippet">
        <span class="code-filename">index.js</span>
        <pre><code class="code-javascript">
{`// import the necessary functions from the library
import {square, draw_to_svg, diagram_combine, V2, Interactive} from 'diagramatics'

// get the svg and control element
let mysvg = document.getElementById('mysvg');
let controldiv = document.getElementById('controldiv');

// define the \`draw\` helper function
let draw = (...diagrams) => {
    draw_to_svg(mysvg, diagram_combine(...diagrams));
};

// create the interactive object
let int = new Interactive(controldiv, mysvg);

// ================= build the diagram objects ============================

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
    <h2>Slider</h2>
    Slider allows you to select a value from a range.
    <!-- public slider(variable_name : string, min : number = 0, max : number = 100, value : number = 50, step : number = -1,  --> <!-- time : number = 1.5){ -->
    <Diagramatics title="Interactive.slider"
                  subtitle="(variable_name : string, min : number, max : number, value : number, <br>, step? : number, time? : number, display_format_func? : formatFunction)"
                  subtitle_newline={true}
        {width} {height}>
        {`
        // create the draw_function that will be run each time the interactive control is changed
        int.draw_function = (inp) => {
            // read the value of the variable \`x\`
            let x = inp['x'];

            let big_sq   = square(40);
            let small_sq = square(10).fill('blue').position(V2(x, 0));
            draw(big_sq, small_sq);
        }

        // create the slider
        int.slider('x', -20, 20, 0);
        // do the initial draw
        // \* without the initial draw, the svg object will be blank
        //    and will only be drawn after the slider has been moved
        int.draw();
        `}
    </Diagramatics>

    <h2>Locator</h2>
    Locator allows you to select a position in a 2D space.<br>
    You can have a <b>free</b> locator, or a locator that is <b>constrained to a track</b>.
    <br><br>
    If you don't define the <code>track_diagram</code> parameter, then the locator will be free.
    <!-- public locator(variable_name : string, value : Vector2, radius : number, color : string = 'blue', track_diagram? : Diagram){ -->
    <Diagramatics title="Interactive.locator"
                  subtitle="(variable_name : string, value : Vector2, radius : number, color? : string,<br>, track_diagram? : Diagram, blink? : boolean)"
                  {width} {height} subtitle_newline={true}>
        {`
        // create the draw_function that will be run each time the interactive control is changed
        int.draw_function = (inp) => {
            // read the value of the variable \`p\`
            let p = inp['p'];

            let big_sq   = square(40);
            let small_sq = square(10).fill('lightgray').position(p);
            draw(big_sq, small_sq);
            int.locator_draw(); // draw the locator
            // make sure you draw the locator only after drawing the diagram
        }

        // create the locator
        int.locator('p', V2(0, 0), 2, 'blue');
        // do the initial draw
        int.draw();
        `}
    </Diagramatics>


    The locator will snap to the nearest point on the track.
    <Diagramatics {width} {height}>
        {`
        // create the track for the locator
        // you have to define it outside the \`draw_function\`
        let pent = regular_polygon(5, 18);

        // create the draw_function that will be run each time the interactive control is changed
        int.draw_function = (inp) => {
            // read the value of the variable \`p\`
            let p = inp['p'];

            let big_sq   = square(40).strokedasharray([5]);
            let small_sq = square(5).fill('lightgray').position(p);
            draw(big_sq, pent, small_sq);
            int.locator_draw(); // draw the locator
            // make sure you draw the locator only after drawing the diagram
        }

        // create the locator
        int.locator('p', V2(0, 0), 2, 'blue', pent);
        // do the initial draw
        int.draw();
        `}
    </Diagramatics>

    If you want to have more point on the track, you can use the subdivide modifier (<code>mod.subdivide</code>).

    <Diagramatics {width} {height}>
        {`
        // create the track for the locator
        // you have to define it outside the \`draw_function\`
        // resample so you have more point to snap to
        let pent = regular_polygon(5, 18).apply(mod.subdivide(20));

        // create the draw_function that will be run each time the interactive control is changed
        int.draw_function = (inp) => {
            // read the value of the variable \`p\`
            let p = inp['p'];

            let big_sq   = square(40).strokedasharray([5]);
            let small_sq = square(5).fill('lightgray').position(p);
            draw(big_sq, pent, small_sq);
            int.locator_draw(); // draw the locator
            // make sure you draw the locator only after drawing the diagram
        }

        // create the locator
        int.locator('p', V2(0, 0), 2, 'blue', pent);
        // do the initial draw
        int.draw();
        `}
    </Diagramatics>

    <h2>Label</h2>
    Label allows you to display a value. You can set the value of the label using <code>int.set(varname : string, value : any)</code>.
    <Diagramatics title="Interactive.label" subtitle="(variable_name : string, value : any, display_format_func? : formatFunction)"{width} {height}>
        {`
        int.draw_function = (inp) => {
            // read the value of the variable \`p\`
            let p = inp['p'];
            let r = p.length();

            let sq   = square(2);
            let circ = circle(r).fill('lightgray');

            // calculate the area of the circle
            let area = Math.PI * r * r;
            int.set('A', area);

            draw(sq, circ);
            int.locator_draw();
        }

        int.label('A',0);
        int.locator('p', Vdir(to_radian(30)).scale(0.3), 0.1, 'blue');
        int.draw();
        `}
    </Diagramatics>

    <h1>Custom</h1>
    You can also create your own interactive object and interact with Diagramatics using <code>int.set()</code> and <code>int.get()</code>.<br>
    For example, you can create a custom button.

    <div class="custom-button-container">
        <button class="custom-button" id="custom-button-l">-</button>
        <button class="custom-button" id="custom-button-r">+</button>
    </div>
    <Diagramatics {width} {height}>
        {`
        let button_l = document.getElementById('custom-button-l');
        let button_r = document.getElementById('custom-button-r');

        int.draw_function = (inp) => {
            // read the value of the variable \`x\`
            let x = inp['x'];

            let big_sq   = square(40);
            let small_sq = square(10).fill('blue').position(V2(x, 0));
            draw(big_sq, small_sq);
        }

        int.label('x', 0);
        int.draw();

        // setup custom behaviour
        button_l.onclick = () => {
            int.set('x', int.get('x') - 1);
            int.draw();
        }
        button_r.onclick = () => {
            int.set('x', int.get('x') + 1);
            int.draw();
        }
        `}
    </Diagramatics>

    <hr>
    <h1>Display Format</h1>
    By default, the <code>label</code> and <code>slider</code> will display the value as <code>`italic_name` = `value`</code>. You can change the display format by passing in a function to the <code>display_format_func</code> parameter.
    <p>
    The formatFunction have the following signature:
    <code>(name : string, value : any, prec? : number) => string</code>
    </p>
    <Diagramatics title="formatFunction" subtitle="(name : string, value : any, prec? : number) : string" {width} height={10}>
        {`
        function my_fmt(name, value, prec){
            return str_to_mathematical_italic(name) + ' is ' + value.toFixed(prec);
        }
        int.slider('x', 0, 10, 1, undefined, undefined, my_fmt);
        int.draw();
        `}
    </Diagramatics>


</div>

<style>
    .custom-button-container{
        margin-top: 20px;
        margin-left: 20px;
    }
    .custom-button{
        padding: 10px 20px;
    }
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
    a, a:visited {
        color: #1f77b4;
    }
    a:hover {
        color: #aec7e8;
    }
</style>
