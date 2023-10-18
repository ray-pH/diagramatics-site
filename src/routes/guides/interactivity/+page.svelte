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
</script>

<Header />
<div class="guides-container">
    <Navigation page="interactivity"/>

    <h1>Interactivity</h1>

    Interactivity is a very important feature of Diagramatics. It allows you to add interactivity to your diagrams, and make them more engaging.
    <!-- interactive object is slider, locator, and custom -->
    The interactive objects in Diagramatics are <code>slider</code>, <code>locator</code>, and <code>label</code>.

    <h2>Setting up Interactivity</h2>
    TODO: write this section

    <h2>Slider</h2>
    Slider allows you to select a value from a range.
    <!-- public slider(variable_name : string, min : number = 0, max : number = 100, value : number = 50, step : number = -1,  --> <!-- time : number = 1.5){ -->
    <Diagramatics title="Interactive.slider"
                  subtitle="(variable_name : string, min : number, max : number, value : number, step? : number, time? : number)"
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
                  subtitle="(variable_name : string, value : Vector2, radius : number, color? : string, track_diagram? : Diagram)"
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
        // do the initial draw of the locator
        int.locator_draw();
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
        // do the initial draw of the locator
        int.locator_draw();
        `}
    </Diagramatics>

    If you want to have more point on the track, you can use the resample modifier (<code>mod.resample</code>).

    <Diagramatics {width} {height}>
        {`
        // create the track for the locator
        // you have to define it outside the \`draw_function\`
        // resample so you have more point to snap to
        let pent = regular_polygon(5, 18).apply(mod.resample(100));

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
        // do the initial draw of the locator
        int.locator_draw();
        `}
    </Diagramatics>

    <h2>Label</h2>
    Label allows you to display a value. You can set the value of the label using <code>int.set(varname : string, value : any)</code>.
    <Diagramatics title="Interactive.label" subtitle="(variable_name : string, value : any)"{width} {height}>
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
        int.locator('p', Vdir(from_degree(30)).scale(0.3), 0.1, 'blue');
        int.draw();
        int.locator_draw();
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


</div>

<style>
    .custom-button-container{
        margin-top: 20px;
        margin-left: 20px;
    }
    .custom-button{
        padding: 10px 20px;
    }
</style>
