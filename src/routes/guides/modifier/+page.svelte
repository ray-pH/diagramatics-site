<!-- TODO : slicepath -->

<svelte:head>
    <title>Modifier - Guide : Diagramatics</title>
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
    <Navigation page="modifier"/>

    <h1>Modifier</h1>
    Modifier is a function that modifies a Diagram. It takes a Diagram as input, and returns a Diagram as output.<br>
    Modifier can be applied to a Diagram using the <code>Diagram.apply</code> method.<br>

    <Diagramatics title="Diagram.apply" subtitle="(modifier_function : (d : Diagram) => Diagram) : Diagram" {width} height={10}>
        {`
        // \`Diagram.apply\` takes any function that takes a Diagram as input and returns a Diagram as output
        // but diagramatics also provides built-in modifier functions that can be used
        `}
    </Diagramatics>

    * <code>Diagram.apply</code> only apply the function to the outermost diagram. If you want to apply the function recursively, you can use <code><a href="#Diagram.apply_recursive">Diagram.apply_recursive</a></code>.<br>
    <br>

    <hr>

    <Diagramatics title="mod.subdivide" subtitle="(n : number) : modifierFunction" {width} {height}>
        {`
        // Subdivide each segment of a diagram into \`n\` segments

        let pent  = regular_polygon(5, 5).apply(mod.subdivide(3));

        draw(pent.debug());
        `}
    </Diagramatics>

    <hr>

    <Diagramatics title="mod.resample" subtitle="(n : number) : modifierFunction" {width} {height}>
        {`
        // Resample a diagram so that it has \`n\` points

        let pent  = regular_polygon(5, 5).apply(mod.resample(10));

        draw(pent.debug());
        `}
    </Diagramatics>
    <Diagramatics {width} {height}>
        {`
        let pent  = regular_polygon(5, 5).apply(mod.resample(100));

        draw(pent.debug());
        `}
    </Diagramatics>

    If <code>n</code> is not a multiple of the number of points, the path will be distorted.
    In some cases it might be better to use <code>mod.subdivide</code> instead.
    <Diagramatics {width} {height}>
        {`
        // if the sampling point is too small or not a multiple of the number of points
        // the path will be distorted
        let pent  = regular_polygon(5, 5).apply(mod.resample(8));

        draw(pent.debug());
        `}
    </Diagramatics>

    <hr>

    <Diagramatics title="mod.round_corner" subtitle="(radius : number | number[], point_indices? : number[], count? : number = 40) : modifierFunction" {width} {height}>
        {`
        // Modifies a diagram by rounding the corners of a polygon or curve
        // \`radius\` : radius of the corner
        // \`point_indices\` : indices of the points to be rounded
        // * if \`point_indices\` is not provided, all the points will be rounded

        // you can check the index of the point by using the \`Diagram.debug\` method

        let sq  = square(5).apply(mod.round_corner(2, [0,2]));

        draw(sq);
        `}
    </Diagramatics>

    <hr>

    <Diagramatics title="mod.add_arrow" subtitle="(headsize : number, flip? : boolean = false) : modifierFunction" {width} {height}>
        {`
        // Add an arrow to the end of a curve
        // Make sure the diagram this modifier is applied to is a curve
        // \`headsize\` : size of the arrow head
        // \`flip\` : flip the arrow position

        let curve = graph.plotf(x => Math.sin(x));
        let with_arrow = curve.apply(mod.add_arrow(0.2)).fill('blue');
        draw(with_arrow);
        `}
    </Diagramatics>

    <hr>

    <Diagramatics title="mod.arrowhead_replace" subtitle="(new_arrowhead : Diagram) : modifierFunction" {width} {height}>
        {`
        // Replace arrowhead inside a diagram with another diagram
        // The arrow will be rotated automatically
        // The default direction is to the right (+x) with the tip at the origin

        let diamond = regular_polygon(4).move_origin('center-right').fill('blue');
        let arr  = arrow(V2(10,0)).apply(mod.arrowhead_replace(diamond));
        draw(arr);
        `}
    </Diagramatics>

    <Diagramatics {width} {height}>
        {`
        let d  = square(0.4).skewX(1).move_origin('bottom-right').fill('blue');
        let ax = axes_empty().apply(mod.arrowhead_replace(d));
        draw(ax);
        `}
    </Diagramatics>

    <hr>

    <h1>Apply recursively</h1>

    <Diagramatics title="Diagram.apply_recursive" subtitle="(modifier_function : (d : Diagram) => Diagram) : Diagram" {width} {height}>
        {`
        let p3 = regular_polygon(3);
        let p4 = regular_polygon(4);
        let p5 = regular_polygon(5);
        let p6 = regular_polygon(6);
        let group = distribute_grid_row([p3,p4,p5,p6], 2, 1, 1);
        let rounded_group = group.apply_recursive(mod.round_corner(0.1))
        draw(rounded_group);
        `}
    </Diagramatics>


</div>

