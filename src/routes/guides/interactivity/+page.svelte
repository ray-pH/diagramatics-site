<svelte:head>
    <title>Interactivity - Guide : Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
</svelte:head>

<script>
    import Header from '../../Header.svelte'
    import Diagramatics from '../../Diagramatics.svelte'
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
    The interactive objects in Diagramatics are <code>slider</code>, <code>locator</code>, and <code>custom</code>.

    <h2>Setting up Interactivity</h2>
    TODO: write this section

    <h2>Slider</h2>
    Slider allows you to select a value from a range.
    <!-- public slider(variable_name : string, min : number = 0, max : number = 100, value : number = 50, step : number = -1,  --> <!-- time : number = 1.5){ -->
    <Diagramatics title="slider"
                  subtitle="(variable_name : string, min : number, max : number, value : number, step? : number, time? : number)"
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
    <Diagramatics title="locator"
                  subtitle="(variable_name : string, value : Vector2, radius : number, color? : string, track_diagram? : Diagram)"
        {width} {height}>
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


</div>

