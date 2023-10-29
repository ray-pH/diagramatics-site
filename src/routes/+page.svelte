<svelte:head>
    <title>Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
</svelte:head>
<svelte:window bind:innerWidth={screenWidth} />

<script>
    import Header from './Header.svelte'
    import Diagramatics from './Diagramatics.svelte'
    import 'diagramatics/css/diagramatics.css'
    import { base } from '$app/paths';
    import './extra.css'
    let screenWidth = 300;
</script>

<Header/>
<div class="main">
    <h1 class="title">Diagramatics</h1>
    <img src="{base}/assets/diagramatics_logo.png" alt="Diagramatics Logo" id="main_logo"/>
    <div class="text-container">
        <em>Diagramatics</em> is a JavaScript/TypeScript library that makes it easy to create <em>interactive diagrams</em>, especially math and physics diagrams. It provides a simple high-level API for creating and manipulating diagram elements and interactive controls.
    <hr>
    </div>

    <h2 class="title">Examples</h2>
    <div class="text-container center">
        <div class="diagram-container">
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
            <Diagramatics height={200} control_margin_left={0}>
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
            <div class="boxed-diagram">
            <center>
            <Diagramatics
                width ={Math.min(645, screenWidth-120)} 
                height={Math.min(645, screenWidth-120)*310/600}
                control_margin_left={0}
            >
                {`
                let pip_positions = {
                    1 : [V2(0,0)],
                    2 : [V2(-1,-1), V2(1,1)],
                    3 : [V2(-1,-1), V2(0,0), V2(1,1)],
                    4 : [V2(-1,-1), V2(1,-1), V2(-1,1), V2(1,1)],
                    5 : [V2(-1,-1), V2(1,-1), V2(0,0), V2(-1,1), V2(1,1)],
                    6 : [V2(-1,-1), V2(1,-1), V2(-1,0), V2(1,0), V2(-1,1), V2(1,1)],
                }
                let generate_dice_pips = (n) => {
                    let positions = pip_positions[n];
                    let pips = positions.map((p) => regular_polygon(10,0.25).position(p));
                    return diagram_combine(...pips).fill('black').stroke('none');
                }
                let generate_dice = (n) => {
                    let outline = square(4)
                        .apply(mod.round_corner(0.5, undefined, 4))
                        .fill('white').stroke('black').strokewidth(2);
                    let pips = generate_dice_pips(n);
                    return diagram_combine(outline, pips);
                }
                const dice_diagram = [1,2,3,4,5,6].map((n) => generate_dice(n).mut());

                function randint(min, max) {
                  return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                let dicevalue = new Array(20*2).fill(1);
                let bincount = new Array(12+1).fill(1);
                let datanames = range_inc(1,12).map(String);

                function reroll() { 
                    for (let i = 0; i < dicevalue.length; i++) dicevalue[i] = randint(1,6);
                }
                function countbin(n){
                    bincount.fill(0);
                    for (let i = 0; i < n; i++) {
                        let val = dicevalue[2*i] + dicevalue[2*i+1];
                        bincount[val] += 1;
                    } 
                }

                // ============================= diagram

                let subdiagram1 = rectangle(30,30);
                let subdiagram2 = rectangle(40,30).move_origin('top-left').position(subdiagram1.get_anchor('top-right'));
                let bbox2 = subdiagram2.bounding_box();

                let diagram_bg = subdiagram1.combine(subdiagram2).stroke('none');
                let baropt = {
                    yrange : [0,10.1],
                    bbox : [bbox2[0].add(V2(2,6)), bbox2[1].sub(V2(2,3))],
                    ticksize: 0.5,
                }
                let xax = bar.xaxes(datanames, baropt);
                let yax = bar.yaxes(bincount.slice(1), baropt);
                let xlabel = text('value').move_origin_text('top-center')
                    .position(xax.get_anchor('bottom-center')).translate(V2(0,-3));
                let ylabel = text('# of occurrence').move_origin_text('bottom-center')
                    .position(yax.get_anchor('center-left')).translate(V2(-1.5,0))
                    .textangle(to_radian(-90));
                let ddots_ = text('⋯').position(subdiagram1.get_anchor('bottom-right'))
                    .translate(V2(-5.5,8))

                let bgrect = rectangle(6,13).apply(mod.round_corner(1, undefined, 4))
                    .fill('lightblue').stroke('none').mut();

                int.draw_function = (inp) => {
                    default_textdata["font-scale"] = "0.11";

                    let n = inp['n'];
                    countbin(n);

                    // diagram1
                    let dicepairlist = range(0,Math.min(n,7)).map((i) => {
                        let vtop = dicevalue[2*i];
                        let vbot = dicevalue[2*i+1];
                        let vsum = vtop + vbot;
                        let dtop = dice_diagram[vtop-1].copy();
                        let dbot = dice_diagram[vbot-1].copy();
                        let lsum = text(vsum);
                        let pair = distribute_vertical_and_align([lsum, dtop, dbot], 1)
                        let bg   = bgrect.copy().position(pair.origin).translate(V2(0,-4.5));
                        return bg.combine(pair).mut();
                    });
                    let dice = distribute_grid_row(dicepairlist, 4, 0.5, 0.5).flatten()
                        .move_origin('top-left')
                        .position(subdiagram1.get_anchor('top-left').add(V2(2,-2)));
                    let ddots = n > 7 ? ddots_ : empty(V2(0,0));

                    // diagram2
                    let bars = bar.plot(bincount.slice(1), baropt).fill('lightblue').stroke('none');
                    
                    // draw
                    draw(
                        diagram_bg, dice, 
                        ddots,
                        bars, xax, yax, xlabel, ylabel,
                    );

                    reset_default_styles();
                }

                int.slider('n', 1, 20, 10, 1);
                reroll();
                int.draw();

                let btn = document.getElementById("roll_double");
                btn.onclick = () => {
                    reroll();
                    int.draw();
                }
                `}
            </Diagramatics>
            </center>
            <div class="btn-container">
                <button class="btn" id="roll_double">Re-roll</button>
            </div>
            </div>
        </div>
        <br>
        <div>
        <a href="{base}/examples/" style="margin-top:20px">More examples</a>
        </div>
        <hr>
    </div>

    <h2 class="title">Usage</h2>
    <div class="text-container center">
        You can try online in the <a href="{base}/editor/">editor</a><br>
        Or see the <a href="{base}/guides/usage/">Guides</a> for more details.
        <hr>
    </div>

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
        min-width: 60%;
        max-width: 800px;
        margin: 0 1em;
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
        border: 2px solid rgba(0,0,0,0.1);
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        padding: 10px;
        min-height: 20rem;
        align-items: left;
        text-align: left;
    }
    .diagram-container{
        justify-content: center;
        display:flex;
        flex-wrap: wrap;
        gap: 5px;
    }
    .btn-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .btn {
        width: 240px;
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
