<svelte:head>
    <title>Mechanical Advantages of Pulley - Examples : Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
</svelte:head>

<script>
    import Header from '../../Header.svelte'
    import Diagramatics from '../../Diagramatics.svelte'
    import DiagramaticsWithCode from '../../DiagramaticsWithCode.svelte'
    import 'diagramatics/css/diagramatics.css'
    import { base } from '$app/paths';
    var margin_right = 0;
    var width = 300;
    var height = 300;
    var width_withcode = 350;
    var height_withcode = 300;

    let dg_single =
        `
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
        `

    let dg_double = 
        `
        let porigin = V2(0,0);

        let pulley_radius = 0.5;

        let topy = 10.8;
        let ceiling = rectangle(5, 0.1).move_origin('bottom-left').position(V2(-1,topy))
            .fill('lightgray').stroke('none')
        ;

        let p1      = V2(pulley_radius,10);
        let pulley1 = circle(pulley_radius).position(p1)
            .fill('lightgrey').stroke('grey').strokewidth(2);
        let pL1     = pulley1.get_anchor('center-left');
        let pR1     = pulley1.get_anchor('center-right');
        let ptop1   = V2(pulley1.origin.x, topy);

        let p2_0    = V2(3*pulley_radius, 3);

        let trackline = line(porigin, pL1).strokedasharray([5]).stroke('gray');
        let track = trackline.apply(mod.slicepath(0.15, 0.9, 100));
        let phand0 = trackline.parametric_point(0.95)

        int.draw_function = (inp) => {
            let phand = inp['phand'];
            let dx = phand.sub(phand0).length();


            let p2      = p2_0.add(V2(0, dx/2));
            let pulley2 = circle(pulley_radius).position(p2)
                .fill('lightgrey').stroke('grey').strokewidth(2);
            let pL2     = pulley2.get_anchor('center-left');
            let pR2     = pulley2.get_anchor('center-right');
            let ptop2   = V2(pR2.x, topy);

            let box = square(1.5).position(p2).translate(V2(0, -2))
                .fill('lightblue').stroke('none');

            let ropes = diagram_combine(
                line(pL1, phand),
                line(pR1, pL2),
                line(pR2, ptop2),
                line(pulley2.origin, box.origin),
                line(pulley1.origin, ptop1),
            );

            let annotations = diagram_combine(
                annotation.length(phand, phand0, 'x', -0.5, 0.2),
                annotation.length(p2_0,  p2,  '½ x', 1.2, 0.2, 1.6)
                    .translate(V2(0,-2.75)).textanchor('start'),
            ).stroke('gray').textfill('black');

            let vectors = diagram_combine(
                annotation.vector(V2(0,-1).scale(1.4),  'W', V2(-0.5,0.0), 0.1)
                    .position(box.origin),
                annotation.vector(V2(0,-1).scale(1.4), 'F = ½ W', V2(-0.3,0.3), 0.1)
                    .position(phand).textanchor('end'),
            ).fill('black').fontsize(13);

            draw(
                ceiling,
                ropes, trackline, 
                pulley1, pulley2,
                box,
                annotations, vectors,
            );
        }

        int.locator('phand', track.parametric_point(0.8), 0.5, 'blue', track);
        int.draw();
        int.locator_draw();
        `

    let dg_n = 
        `
        let porigin = V2(0,0);

        let pulley_radius = 0.5;

        let topy = 10.8;
        let ceiling = rectangle(10, 0.1).move_origin('bottom-left').position(V2(-1,topy))
            .fill('lightgray').stroke('none')
        ;

        let pA      = V2(pulley_radius,10);
        let pulley1 = circle(pulley_radius).position(pA)
            .fill('lightgrey').stroke('grey').strokewidth(2);
        let pLA     = pulley1.get_anchor('center-left');
        let pRA     = pulley1.get_anchor('center-right');
        let ptopA   = V2(pulley1.origin.x, topy);

        let pB_0    = V2(3*pulley_radius, 4);

        let trackline = line(porigin, pLA).strokedasharray([5]).stroke('gray');
        let track = trackline.apply(mod.slicepath(0.15, 0.9, 100));
        let phand0 = trackline.parametric_point(0.95)

        int.draw_function = (inp) => {
            let n     = inp['n'];
            let phand = inp['phand'];
            let dx = phand.sub(phand0).length();

            let mech_adv = Math.pow(2,n);

            let pB      = pB_0.add(V2(0, dx/mech_adv));

            let pulleytops = range(0,n-1).map((i) => {
                let p = V2(pA.x + (4*pulley_radius)*(i+1), pA.y);
                return circle(pulley_radius).position(p)
                    .fill('lightgrey').stroke('grey').strokewidth(2);
            });
            pulleytops.push(pulley1);

            let pulleybots = range(0,n).map((i) => {
                let p = V2(pB.x + (4*pulley_radius)*i, pB.y);
                return circle(pulley_radius).position(p)
                    .fill('lightgrey').stroke('grey').strokewidth(2);
            });

            let bar = rectangle((2*n-1)*2*pulley_radius, 0.2).move_origin('top-left')
                .position(pulleybots[0].get_anchor('bottom-left')).translate(V2(0,-0.2))
                .fill('lightgray').stroke('none');
            let box = square(1.5)
                .position(bar.get_anchor('center-center')).translate(V2(0,-1.2))
                .fill('lightblue').stroke('none');

            let top_ropes = [pulley1, ...pulleytops].map((pulley) => {
                let p = pulley.origin;
                return line(p, V2(p.x, topy));
            });
            let left_ropes = pulleybots.map((pulley) => {
                let p = pulley.get_anchor('center-left');
                return line(p, V2(p.x, pA.y));
            });
            let right_ropes = pulleybots.map((pulley, i) => {
                let p = pulley.get_anchor('center-right');
                return line(p, V2(p.x, i < n-1 ? pA.y : topy));
            });
            let bottom_ropes = pulleybots.map((pulley, i) => {
                let p = pulley.origin;
                return line(p, V2(p.x, bar.origin.y));
            });
            let rope0 = line(phand, pLA);
            let ropez = line(bar.get_anchor('top-center'), box.origin);
            let ropes = [rope0, ropez, ...top_ropes, ...left_ropes, ...right_ropes, ...bottom_ropes];

            let transx = box.origin.x - pB_0.x;
            let vulgarfrac = ['1', '½', '¼', '⅛', '¹⁄₁₆'];
            let strx       = vulgarfrac[n] + ' x';
            let annotations = diagram_combine(
                annotation.length(phand, phand0, 'x', -0.5, 0.2),
                annotation.length(pB_0,  pB, strx, 1.2, 0.2, 1.6)
                    .translate(V2(transx,-2.75)).textanchor('start'),
            ).stroke('gray').textfill('black');

            let strF = 'F = ' + vulgarfrac[n] + ' W';
            let vectors = diagram_combine(
                annotation.vector(V2(0,-1).scale(1.4),  'W', V2(-0.5,0.0), 0.1)
                    .position(box.origin),
                annotation.vector(V2(0,-1).scale(1.4), strF, V2(-0.3,0.3), 0.1)
                    .position(phand).textanchor('end'),
            ).fill('black').fontsize(13);


            draw(
                ceiling,
                trackline, 
                ...ropes,
                ...pulleytops,
                ...pulleybots,
                bar, box,
                annotations, vectors,
            );
        }

        int.slider('n', 1, 4, 2, 1);
        int.locator('phand', track.parametric_point(0.5), 0.5, 'blue', track);
        int.draw();
        int.locator_draw();
        `
</script>
<style>
    hr{
        width: 95%;
        border-top: 1px dashed rgba(0,0,0,0.3);
    }
    .container {
        font-family: Ubuntu, sans-serif;
        padding: 10px;
        max-width: 800px;
        margin: auto;
    }
    .r-text {
        min-width: 400px;
        flex: 1 0;
    }
    .lr-diagram{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    em {
        color: #1f77b4;
        font-style: normal;
        font-weight: bold;
    }
    num {
        font-family: 'lm-math';
        color: #444;
    }
    var {
        font-family: 'lm-math';
        font-style: italic;
        color: #444;
    }
</style>

<Header />

<div class="container">
<h1>Mechanical Advantages of Pulley</h1>

<p><em>Pulleys</em> are one of the most fundamental and versatile mechanical devices in our world. These simple machines have been in use for thousands of years, enabling us to lift heavy loads with ease and efficiency. They are at the heart of numerous everyday systems, from elevators and cranes to flagpoles and even the cords on your window blinds. This article will explore the concept of pulleys and delve into the fascinating world of mechanical advantage, which is the key to their efficiency and effectiveness.</p>

<p><em>Mechanical advantage</em> is a fundamental concept that helps us understand how pulleys <em>make tasks easier</em>. It is the ratio of the force applied to a system to the force exerted by that system. In the case of pulleys, mechanical advantage is calculated by dividing the load force (the weight you want to lift) by the effort force (the force you apply to the rope).</p>

<p>The mechanical advantage can be greater than 1, indicating that the pulley system makes the task easier. The higher the mechanical advantage, the more effectively the pulley system multiplies your force, allowing you to lift heavier loads with less effort.</p>


<p>There are two primary types of pulleys: fixed and movable.</p>

<h3>1. Fixed Pulleys</h3>
<p>A fixed pulley is attached to a stationary point, such as a ceiling or wall. When you pull one end of the rope, the load is lifted. Fixed pulleys don't provide a mechanical advantage in terms of reducing the force required; instead, they change the direction of the force.</p>

<Diagramatics {width} {height}>
    {dg_single}
</Diagramatics>

<h3>2. Movable Pulleys</h3>
<p>A movable pulley is attached to the object you want to move. When you pull one end of the rope, the pulley and the load move together. Movable pulleys do provide a mechanical advantage because they reduce the force needed to lift the load.</p>


<div class="lr-diagram">
    <Diagramatics {width} {height}>
    {dg_double}
</Diagramatics>

<div class="r-text">
    <em>Mechanical Advantage = 2</em><br>
    <p>In this setup, the effort force required to lift an object is only half of its weight. This means that if you're lifting a <num>100 kg</num> load, you would need to apply a force of just <num>50 kg</num> to raise it.</p>
    <p>The tradeoff in this situation, however, is that you need to pull the rope twice as far as the distance the load moves. While the mechanical advantage reduces the force needed, it does so at the expense of the distance you have to pull the rope, effectively doubling the length of rope that must be pulled to move the load. 
        This mean that if you want to lift a load by <num>1 m</num>, you would need to pull the rope by <num>2 m</num>.
    </p>
</div>

</div>

<div class="lr-diagram">
<Diagramatics {width} {height}>
    {dg_n}
</Diagramatics>

<div class="r-text">
    <em>Mechanical Advantage = 2<sup>n</sup></em><br>
    <p>Combining multiple pulleys like in the diagram above, we can increase the mechanical advantage. For a system with mechanical advantage <var>μ</var>, the force required to pull an object with weight <var>W</var> is <var>F = W / μ</var>. But the tradeoff is that to lift a load by some distance <var>x</var>, we have to pull the rope by the distance <var>μx</var>.
    </p>
    <p>This concept highlights the principle of conservation of energy, where the work done remains the same, and a decrease in effort force results in an increase in the distance over which that force is applied.</p>
</div>

</div>
<br>
<hr>

<details>
    <summary>Show Diagram SourceCode</summary>
    <DiagramaticsWithCode {width} {height}>
        {dg_single}
    </DiagramaticsWithCode>
    <hr>
    <DiagramaticsWithCode {width} {height}>
        {dg_double}
    </DiagramaticsWithCode>
    <hr>
    <DiagramaticsWithCode {width} {height}>
        {dg_n}
    </DiagramaticsWithCode>
</details>

</div>
