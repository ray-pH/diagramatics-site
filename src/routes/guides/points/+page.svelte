<svelte:head>
    <title>Points - Guide : Diagramatics</title>
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

    var width = 200;
    var height = 200;
</script>

<Header />
<div class="guides-container">
    <Navigation page="points"/>

A diagram have an origin and a bounding box.
You can see this using <code>Diagram.debug</code>

<h1>Points</h1>
<Diagramatics title="Diagram.debug" subtitle="(show_index : boolean = true) : Diagram" {width} {height}>
    {`
    // the + symbol shows the origin
    // the gray lines shows the bounding box
    // the red lines shows the path of the object
    // the number shows the index of the point in the object

    let pentagon = regular_polygon(5,10);
    draw(pentagon.debug());
    `}
</Diagramatics>

You can access the special points of the bounding box using <code>Diagram.get_anchor</code>
<Diagramatics title="Diagram.get_anchor" subtitle="(anchor : string) : Diagram" {width} {height}>
    {`
    // anchors can be :
    // 'top-left', 'top-center', 'top-right',
    // 'center-left', 'center-center', 'center-right',
    // 'bottom-left', 'bottom-center', 'bottom-right',

    let pentagon = regular_polygon(5,10);
    let anchor_top    = pentagon.get_anchor('top-center');
    let anchor_bottom = pentagon.get_anchor('bottom-center');
    let ctop = circle(0.5).fill('blue').position(anchor_top);
    let cbot = circle(0.5).fill('blue').position(anchor_bottom);
    draw(pentagon, ctop, cbot);
    `}
</Diagramatics>

You can get the bounding box directly using <code>Diagram.bounding_box</code>
<Diagramatics title="Diagram.bounding_box" subtitle="() : [Vector2, Vector2]" {width} {height}>
    {`
    let pentagon = regular_polygon(5,10);
    let bbox = pentagon.bounding_box(); // bbox = [v2_bottomleft, v2_topright]

    let p1 = circle(0.5).position(bbox[0]).fill('red');
    let p2 = circle(0.5).position(bbox[1]).fill('blue');

    draw(pentagon, p1, p2);
    `}
</Diagramatics>

You can move the origin of the diagram using <code>Diagram.move_origin</code>

<Diagramatics title="Diagram.move_origin" subtitle="(pos : Vector2 | string) : Diagram" {width} {height}>
    {`
    // anchors can be :
    // 'top-left', 'top-center', 'top-right',
    // 'center-left', 'center-center', 'center-right',
    // 'bottom-left', 'bottom-center', 'bottom-right',

    let sq_red  = square(10).fill('red' ).move_origin('bottom-left').position(V2(0,0));
    let sq_blue = square(10).fill('blue').move_origin(V2(5,5)      ).position(V2(0,0));

    // both of the squares are positioned at the same location (0,0)
    // but they have different origins

    draw(sq_red, sq_blue);
    `}
</Diagramatics>


    <!-- /** -->
    <!--  * Get the point on the path at t -->
    <!--  * Path can be described parametrically in the form of (x(t), y(t)) -->
    <!--  * Path starts at t=0 and ends at t=1 -->
    <!--  * @param t parameter -->
    <!--  * @param segment_index (only works for polygon and curves) -->
    <!--  * If segment_index (n) is defined, get the point at the nth segment -->
    <!--  * If segment_index (n) is defined, t can be outside of [0, 1] and will return the extrapolated point -->
    <!--  * @returns the position of the point -->
    <!--  */ -->
    <!-- public parametric_point(t : number, segment_index? : number) : Vector2  -->

    <Diagramatics title="Diagram.parametric_point" subtitle="(t : number, segment_index? : number) : Vector2" {width} {height}>
        {`
    // Path can be described parametrically in the form of (x(t), y(t))
    // Path starts at t=0 and ends at t=1
    // if segment_index is not defined, t=0 is the start of the path and t=1 is the end of the path
    // *you can see where path starts and ends using Diagram.debug()

    let pentagon = regular_polygon(5,10);
    let p0 = pentagon.parametric_point(0);
    let p1 = pentagon.parametric_point(0.25);
    let p2 = pentagon.parametric_point(0.5);
    let p3 = pentagon.parametric_point(0.75);

    let c0 = circle(0.5).fill('blue').position(p0);
    let c1 = circle(0.5).fill('blue').position(p1);
    let c2 = circle(0.5).fill('blue').position(p2);
    let c3 = circle(0.5).fill('blue').position(p3);

    draw(pentagon, c0, c1, c2, c3);
    `}
</Diagramatics>
<Diagramatics {width} {height}>
    {`
    // You can also give it a \`segment_index\`
    // Let's say you want to get the point between the 3rd and 4th point i.e. (3rd segment)
    // *you can see the index of each point using \`Diagram.debug()\`

    let pentagon = regular_polygon(5,10);
    let p = pentagon.parametric_point(0.5, 3);
    let c = circle(0.5).fill('blue').position(p);

    draw(pentagon, c);
    `}
</Diagramatics>
<Diagramatics title="Diagram.add_points" subtitle="(points : Vector2[]) : Diagram" {width} {height}>
    {`
    let pentagon = regular_polygon(5,10);
    let p2 = pentagon.add_points([V2(0,0), V2(-1,2), V2(9,5)]);

    draw(p2);
    `}
</Diagramatics>


</div>

