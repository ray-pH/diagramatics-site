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
        // create the interactive object
        int.slider('x', -20, 20, 0);
        // do the initial draw
        int.draw();
        `}
    </Diagramatics>


</div>

