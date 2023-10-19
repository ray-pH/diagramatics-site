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

    <hr>

<!-- /** -->
<!--  * Resample a diagram so that it has `n` points -->
<!--  * @param n number of points -->
<!--  * @returns function that modifies a diagram -->
<!--  */ -->
<!-- export function resample(n : number) : modifierFunction{ -->
<!-- /** -->
<!--  * Subdivide each segment of a diagram into n segments -->
<!--  * @param n number of segments to subdivide each segment into -->
<!--  * @returns function that modifies a diagram -->
<!--  */ -->
<!-- export function subdivide(n : number = 100) : modifierFunction { -->
<!-- /** -->
<!--  * Create a function that modifies a diagram by rounding the corners of a polygon or curve -->
<!--  * @param radius radius of the corner -->
<!--  * @param point_indices indices of the points to be rounded -->
<!--  * @returns function that modifies a diagram -->
<!--  * -->
<!--  * @example -->
<!--  * ```javascript -->
<!--  * let s = square(5).apply(mod.round_corner(2, [0,2])) -->
<!--  * ``` -->
<!--  */ -->
<!-- export function round_corner(radius : number | number[] =  1, point_indices? : number[]) : modifierFunction { -->

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

    <Diagramatics title="mod.round_corner" subtitle="(radius : number | number[], point_indices? : number[]) : modifierFunction" {width} {height}>
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


</div>

