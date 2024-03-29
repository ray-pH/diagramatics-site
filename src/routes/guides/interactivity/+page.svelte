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
        }

        // create the locator
        int.locator('p', V2(0, 0), 2, 'blue');
        // do the initial draw
        int.draw();
        int.locator_initial_draw();
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
        }

        // create the locator
        int.locator('p', V2(0, 0), 2, 'blue', pent);
        // do the initial draw
        int.draw();
        int.locator_initial_draw();
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
        }

        // create the locator
        int.locator('p', V2(0, 0), 2, 'blue', pent);
        // do the initial draw
        int.draw();
        int.locator_initial_draw();
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
        }

        int.label('A',0);
        int.locator('p', Vdir(to_radian(30)).scale(0.3), 0.1, 'blue');
        int.draw();
        int.locator_draw();
        `}
    </Diagramatics>

    <h2 id="custom_external">Custom external interaction</h2>
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

    <h2>Toggle Button</h2>
    <i>*introduced in v1.2.0</i>

    <Diagramatics title="Interactive.button_toggle" subtitle="(name : string, diagram_on : Diagram, diagram_off : Diagram, state : boolean = false)" {width} {height} subtitle_newline={true}>
        {`
        let sq = square(40);
        let button_off = square(10).fill('lightgrey');
        let button_on  = square(10).fill('blue');

        // example, binary (boolean) data to decimal string
        function bin_to_decstr(x2,x1,x0){
            let val = 0;
            if (x2) val += 4;
            if (x1) val += 2;
            if (x0) val += 1;
            return String(val);
        }

        int.draw_function = (inp) => {
            let b0 = inp['b0'];
            let b1 = inp['b1'];
            let b2 = inp['b2'];

            let decstr = bin_to_decstr(b2,b1,b0);
            let text = textvar(decstr).fontsize(100).translate(V2(0,5));

            draw(sq, text);
        }

        let p0 = V2( 12, -12);
        let p1 = V2(  0, -12);
        let p2 = V2(-12, -12);
        int.button_toggle('b0', button_on.position(p0), button_off.position(p0), false);
        int.button_toggle('b1', button_on.position(p1), button_off.position(p1), false);
        int.button_toggle('b2', button_on.position(p2), button_off.position(p2), false);
        int.draw();
        `}
    </Diagramatics>

    <h2>Click Button</h2>
    <i>*introduced in v1.2.0</i>

    <Diagramatics title="Interactive.button_click" subtitle="(name : string, diagram : Diagram, diagram_pressed : Diagram, callback : () => any)" {width} {height} subtitle_newline={true}>
        {`
        // click button doesn't have a state, so it can't be accessed 
        // using \`int.get()\` or \`inp[name]\` inside \`int.draw_function\`
        
        let sq = square(40);
        let button = square(10).fill('lightgrey');
        let button_pressed = square(10).fill('blue');

        draw(sq);

        const callback = () => {
            alert('button clicked');
        }
        int.button_click('b', button, button_pressed, callback);
        int.draw();
        `}
    </Diagramatics>

    <h2>Custom SVG Object</h2>
    <i>*introduced in v1.2.0</i>

    <Diagramatics title="Interactive.custom_object" subtitle="(id : string, classlist : string[], diagram : Diagram) : SVGSVGElement" {width} {height} subtitle_newline={true}>
        {`
        // prepare the diagram
        let sq   = square(20);
        let circ = circle(5).fill('blue').stroke('white');
        let obj  = circ.combine(circ.translate(V2(3,0)))
                        .move_origin('center-center').position(V2(0,0));
        draw(sq);

        // \`int.custom_object\` returns the html SVGSVGElement
        let elem = int.custom_object('cust_obj_id', ['random_class'], obj);

        // the id and classlist will be added to the element
        // you can then modify the element using the usual javascript DOM manipulation
        elem.style.cursor = 'pointer';
        elem.onclick = () => {
            alert('hi');
        }
        elem.onmouseenter = () => {
            elem.style.fillOpacity = 0.5;
        }
        elem.onmouseleave = () => {
            elem.style.fillOpacity = 1;
        }

        // don't forget to draw
        int.draw()
        `}
    </Diagramatics>


    <h2>Drag and Drop</h2>
    <i>*introduced in v1.2.0</i>

    <Diagramatics title="Interactive.dnd_container" subtitle="(name : string, diagram : Diagram)" {width} height={1}>
        {`
        // create a Drag and Drop container object
        // need to be used in conjunction with \`int.dnd_draggable\`
        `}
    </Diagramatics>
    <Diagramatics title="Interactive.dnd_draggable" subtitle="(name : string, diagram : Diagram, container_diagram? : Diagram)" {width} {height}>
        {`
        // create a Drag and Drop draggable object

        // prepare the diagrams
        let target_box = square(5).fill('lightgrey');
        let target0 = target_box.position(V2(-6,0));
        let target1 = target_box.position(V2(0,0));
        let target2 = target_box.position(V2(6,0));

        let texta   = text('a')
        let bga     = circle(2).fill('blue');
        let sourcea = diagram_combine(texta, bga).position(V2(-3,-6));

        let textb   = text('b')
        let bgb     = circle(2).fill('blue');
        let sourceb = diagram_combine(textb, bgb).position(V2(3,-6));

        // create a bounding box rectangle object so that we know the size of the diagram
        // if the DnD objects is contained within another diagram, you can simply draw that diagram instead
        //        without the need to create a bounding box
        let dnd_objects = diagram_combine(sourcea, sourceb, target0, target1, target2);
        let dnd_rect = rectangle_corner(...dnd_objects.bounding_box()).stroke('none').fill('none');
        draw(dnd_rect);

        int.dnd_container('t0', target0)
        int.dnd_container('t1', target1)
        int.dnd_container('t2', target2)
        int.dnd_draggable('a', sourcea, sourcea.fill('lightgrey'))
        int.dnd_draggable('b', sourceb, sourceb.fill('lightgrey'))
        int.drag_and_drop_initial_draw();
        `}
    </Diagramatics>

    You can access the draggable position by using it's name inside <code>int.draw_function</code>.<br><br>
    NOTE: it's not possible to <code>int.set()</code> the draggable position.
    <Diagramatics {width} {height}>
        {`
        let sq = square(40);
        let containerbox = square(10).fill('lightgrey');
        let cont0 = containerbox.position(V2(-10,-10));
        let cont1 = containerbox.position(V2(10,10));
        let cont2 = containerbox.position(V2(10,-10));
        let cont3 = containerbox.position(V2(-10,10));
        let obj   = circle(4).fill('blue').position(cont3.origin);

        int.draw_function = (inp) => {
            let a = inp['a'];
            let l = line(V2(0,0), a);
            draw(sq, l)
        }

        int.dnd_container('c0', cont0);
        int.dnd_container('c1', cont1);
        int.dnd_container('c2', cont2);
        int.dnd_draggable('a', obj, cont3);
        int.draw();
        int.drag_and_drop_initial_draw();
        `}
    </Diagramatics>


    <!-- TODO: validation -->
    <Diagramatics title="Interactive.get_dnd_data" subtitle="() : &lbrace;container\:string, content\:string[]&rbrace;[]" {width} height={1}>
        {`
        // retrieve the state data from the DnD objects

        // TODO: write example for this
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
