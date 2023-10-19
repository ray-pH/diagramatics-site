<svelte:head>
    <title>Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
</svelte:head>

<script>
    import Header from './Header.svelte'
    import Diagramatics from './Diagramatics.svelte'
    import 'diagramatics/css/diagramatics.css'
    import { base } from '$app/paths';
</script>

<Header/>
<div class="main">
    <h1 class="title">Diagramatics</h1>
    <img src="{base}/assets/diagramatics_logo.png" alt="Diagramatics Logo" id="main_logo"/>
    <div class="text-container">
        <em>Diagramatics</em> is a JavaScript/TypeScript library that makes it easy to create <em>interactive diagrams</em>, especially math and physics diagrams. It provides a simple high-level API for creating and manipulating diagram elements and interactive controls.
    </div>

    <div class="text-container"><hr></div>

    <h2 class="title">Examples</h2>
    <div class="text-container center">
        <div>
            <div class="boxed-diagram">
            <Diagramatics>
                {`
                let porigin = V2(0,0);
                let ppulley = V2(5,10);

                let pulley_radius = 0.5;
                let pulley = circle(pulley_radius).position(ppulley)
                .fill('lightgrey').stroke('grey').strokewidth(2);

                let topy = 10.8;
                let ceiling = rectangle(10.5, 0.1).move_origin('bottom-left').position(V2(-2.5,topy))
                .fill('lightgray').stroke('none');

                let pL = geometry.circle_tangent_point_from_point(porigin, pulley)[1];
                let pR = pulley.origin.add(V2(pulley_radius, 0));

                let trackline = line(porigin, pL).strokedasharray([5]).stroke('gray');
                let track = trackline.apply(mod.slicepath(0.15, 0.75, 100));

                let phand0 = trackline.parametric_point(0.8)
                let vhand  = porigin.sub(pL).normalize();
                let pBox0  = pR.sub(V2(0,1).scale(10));
                let x0     = phand0.sub(pL).length();

                int.draw_function = (inp) => {
                let phand = inp['phand'];

                let x = phand.sub(pL).length();
                let dx = x - x0;

                let pBox = pBox0.add(V2(0, dx));
                let box  = square(2).move_origin('bottom-center').position(pBox)
                .fill('lightblue').stroke('none');

                let ropes = diagram_combine(
                line(pL, phand),
                line(pR, box.get_anchor('top-center')),
                line(pulley.origin, V2(pulley.origin.x, topy)),
                );

                let annotations = diagram_combine(
                annotation.length(phand, phand0, 'x', -0.5, 0.2),
                annotation.length(pBox0,  pBox,  'x',  1.2, 0.2, 1.5),
                ).stroke('gray').textfill('black');

                let vectors = diagram_combine(
                annotation.vector(V2(0,-1).scale(1.4),  'W', V2(-0.5,0.0), 0.1)
                .position(box.get_anchor('center-center')),
                annotation.vector(vhand.scale(1.4), 'F = W', V2(-0.3,0.3), 0.1)
                .position(phand).textanchor('end'),
                ).fill('black').fontsize(13);

                draw(
                trackline, ropes,
                pulley, box, ceiling,
                annotations, vectors,
                );
                }

                int.locator('phand', track.parametric_point(0.8), 0.5, 'blue', track);
                int.draw();
                int.locator_draw();
                `}
            </Diagramatics>
            </div>
            <div class="boxed-diagram">
            <Diagramatics height={200}>
                {`
                let x0 = 50;
                let amplitude = 25;
                let omega = 1;

                int.draw_function = (inp) => {
                let t = inp['t'];
                let x = x0 + amplitude * Math.cos(omega * t);

                let wall  = line(V2(0,0), V2(0,20)).strokewidth(2);
                let floor = line(V2(0,0), V2(100,0)).strokewidth(2);
                let box   = square(20).position(V2(x,10))
                .fill('lightblue').stroke('none');

                let p1 = wall.get_anchor('center-right');
                let p2 = box.get_anchor('center-left');
                let spring = mechanics.spring(p1,p2, 2, 10, 1.2);
                draw(box, wall, floor, spring)
                }

                let period = 2*Math.PI/omega;
                int.slider('t', 0, 2*period, period/4, 0.1, 2);
                int.draw();
                `}
            </Diagramatics>
            </div>
        </div>
        <br>
        <a href="{base}/examples/" style="margin-top:20px">More examples</a>
    </div>

    <div class="text-container"><hr></div>
    <h2 class="title">Usage</h2>
    <div class="text-container center">
        You can try online in the <a href="{base}/editor/">editor</a><br>
        Or see the <a href="{base}/guides/usage/">Guides</a> for more details.
    </div>

    <div class="text-container"><hr></div>

</div>



<!-- 'blue'        : '#1f77b4', -->
<!-- 'lightblue'   : '#aec7e8', -->
<style>
    .title {
        font-size: 3rem;
    }
    .title::first-letter{
        background-color: #aec7e8;
        padding-left: 0.2em;
        border-radius: 0.3em 0 0.3em 0;
    }
    #main_logo {
        margin-top: -3.4rem;
    }
    .main {
        font-family: 'Ubuntu', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .text-container{
        font-size: 1.2rem;
        width: 60%;
    }
    .center {
        align-items: center;
        text-align: center;
    }
    a, a:visited {
        color: #1f77b4;
    }
    a:hover {
        color: #aec7e8;
    }
    em {
        color: #1f77b4;
        font-style: normal;
        font-weight: bold;
    }
    hr{
        width: 95%;
        border-top: 1px dashed rgba(0,0,0,0.3);
        margin: 5rem 0;
    }
    .boxed-diagram{
        display: inline-block;
        border: 2px solid rgba(0,0,0,0.1);
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        padding: 10px;
        height: 20rem;
        align-items: left;
        text-align: left;
    }
</style>
