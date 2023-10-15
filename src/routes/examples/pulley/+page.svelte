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
    var width = 350;
    var height = 300;
    var width_withcode = 350;
    var height_withcode = 300;
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
    em {
        color: #1f77b4;
        font-style: normal;
        font-weight: bold;
    }
</style>

<Header />

<div class="container">
<h1>Mechanical Advantages of Pulley</h1>

<p><em>Pulleys</em> are one of the most fundamental and versatile mechanical devices in our world. These simple machines have been in use for thousands of years, enabling us to lift heavy loads with ease and efficiency. They are at the heart of numerous everyday systems, from elevators and cranes to flagpoles and even the cords on your window blinds. This article will explore the concept of pulleys and delve into the fascinating world of mechanical advantage, which is the key to their efficiency and effectiveness.</p>

<p><em>Mechanical advantage</em> is a fundamental concept that helps us understand how pulleys <em>make tasks easier</em>. It is the ratio of the force applied to a system to the force exerted by that system. In the case of pulleys, mechanical advantage is calculated by dividing the load force (the weight you want to lift) by the effort force (the force you apply to the rope). The formula for mechanical advantage (MA) is:</p>

<p>The mechanical advantage can be greater than 1, indicating that the pulley system makes the task easier. The higher the mechanical advantage, the more effectively the pulley system multiplies your force, allowing you to lift heavier loads with less effort.</p>


<p>There are two primary types of pulleys: fixed and movable.</p>

<h3>1. Fixed Pulleys</h3>
<p>A fixed pulley is attached to a stationary point, such as a ceiling or wall. When you pull one end of the rope, the load is lifted. Fixed pulleys don't provide a mechanical advantage in terms of reducing the force required; instead, they change the direction of the force.</p>

<Diagramatics {width} {height}>
    {`
    let porigin = V2(0,0);
    let ppulley = V2(5,10);

    let pulley_radius = 0.5;
    let pulley = circle(pulley_radius).position(ppulley)
        .fill('lightgrey').stroke('grey').strokewidth(2);

    let pA = geometry.circle_tangent_point_from_point(porigin, pulley)[1];
    let pB = pulley.origin.add(V2(pulley_radius, 0));

    let trackline = line(porigin, pA).strokedasharray([5]).stroke('gray');
    let track = trackline.apply(mod.slicepath(0.15, 0.75, 100));

    let phand0 = trackline.parametric_point(0.8)
    let pBox0 = pB.sub(V2(0,1).scale(10));
    let left_length0 = phand0.sub(pA).length();

    int.draw_function = (inp) => {
        let phand = inp['phand'];

        let left_length = phand.sub(pA).length();
        let dlength = left_length - left_length0;

        let pBox = pBox0.add(V2(0, dlength));
        let box  = square(2).move_origin('bottom-center').position(pBox)
            .fill('lightblue').stroke('none');

        let ropes = diagram_combine(
            line(pA, phand),
            line(pB, box.get_anchor('top-center')),
        );

        let annotations = diagram_combine(
            annotation.length(phand0, phand, 'x', -0.5, -0.2),
            annotation.length(pBox0,  pBox,  'x', -1.2, -0.2, -1.5),
        ).stroke('gray').textfill('black');

        draw(
            trackline, ropes,
            pulley, box,
            annotations,
        );
    }

    int.locator('phand', track.parametric_point(1), 0.5, 'blue', track);
    int.draw();
    int.locator_draw();
    `}
</Diagramatics>

sdfsd


<h3>2. Movable Pulleys</h3>
<p>A movable pulley is attached to the object you want to move. When you pull one end of the rope, the pulley and the load move together. Movable pulleys do provide a mechanical advantage because they reduce the force needed to lift the load.</p>


<Diagramatics>
    {`
    let big_rect   = square(150).fill('lightblue').stroke('none');
    let small_rect = square(20).fill('blue').rotate(Math.PI/4);
    let r1 = small_rect.position(big_rect.get_anchor('top-left'));
    let r2 = small_rect.position(big_rect.get_anchor('top-right'));
    let r3 = small_rect.position(big_rect.get_anchor('bottom-left'));
    let r4 = small_rect.position(big_rect.get_anchor('bottom-right'));
    draw(big_rect, r1, r2, r3, r4);
    `}
</Diagramatics>
<hr>

</div>
