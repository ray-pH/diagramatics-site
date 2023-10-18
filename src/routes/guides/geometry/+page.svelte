<svelte:head>
    <title>Geometry - Guide : Diagramatics</title>
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
    <Navigation page="geometry"/>

    <h1>Geometry</h1>
    Diagramatics provide tools to calculate geometric properties of diagrams.<br>
    <i>*There are many more functions that will be added in the future.</i>

    <Diagramatics title="geometry.circle_radius" subtitle="(circle : Diagram) : number" {width} {height}>
        {`
        // Get the radius of a circle object

        let c1 = circle(4).scale(0.5).fill('red');
        let r  = geometry.circle_radius(c1); // r = 2
        let c2 = circle(r).translate(V2(r,0)).fill('blue');
        draw(c1, c2);
        `}
    </Diagramatics>

    <Diagramatics title="circle_tangent_point_from_point" subtitle="(point : Vector2, circle : Diagram) : [Vector2, Vector2]" {width} {height}>
        {`
        // Get two points on the circle where the tangent line that pass through the given point intersects the circle

        let circ = circle(10);
        let p0   = V2(-20,-6);
        let [p1,p2] = geometry.circle_tangent_point_from_point(p0, circ);

        let c0 = circle(0.5).position(p0).fill('black');
        let c1 = circle(0.5).position(p1).fill('red');
        let c2 = circle(0.5).position(p2).fill('blue');

        let l1 = line(p0, p1).stroke('gray');
        let l1e = geometry.line_extend(l1, 0, 5);
        let l2 = line(p0, p2).stroke('gray');
        let l2e = geometry.line_extend(l2, 0, 5);

        draw(l1e, l2e, circ, c0, c1, c2);
        `}
    </Diagramatics>

    <Diagramatics title="line_extend" subtitle="(l : Diagram, len1 : number, len2 : number) : Diagram" {width} {height}>
        {`
        // extends a line by len1 and len2 on each end
        // the extension length can be negative

        let l0 = line(V2(-5,0), V2(5,0)).strokewidth(2);
        let l1 = geometry.line_extend(l0, 2, 2);
        let l2 = geometry.line_extend(l0, 2, 0);
        let l3 = geometry.line_extend(l0, 0, 2);
        let l4 = geometry.line_extend(l0, -2, -2);
        let lines = distribute_vertical([l0, l1, l2, l3, l4], 1);
        draw(...lines);
        `}
    </Diagramatics>

</div>

