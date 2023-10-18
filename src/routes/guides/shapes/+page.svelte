<svelte:head>
    <title>Shapes - Guide : Diagramatics</title>
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

    var width = 100;
    var height = 100;
</script>

<Header />
<div class="guides-container">

    <Navigation page="shapes"/>

    <h1>Building Blocks</h1>

    Diagramatics provides a set of basic building blocks for creating diagrams. 
    These are <code>polygon</code>, <code>curve</code>, <code>empty</code>, and <code>text</code>.


    <Diagramatics title="polygon" subtitle="(points : Vector2[]) : Diagram" {width} {height}>
        {`
        let poly = polygon([V2(0,0), V2(0,10), V2(10,10)]);
        draw(poly);
        `}
    </Diagramatics>
    <Diagramatics title="curve" subtitle="(points : Vector2[]) : Diagram" {width} {height}>
        {`
        let curv = curve([V2(0,0), V2(0,10), V2(10,10)]);
        draw(curv);
        `}
    </Diagramatics>
    <Diagramatics title="text" subtitle="(str : string) : Diagram" {width} {height}>
        {`
        // *for math variable italic style, use \`textvar()\`

        let sq = square(20);
        let tx = text('hello');
        draw(sq, tx);
        `}
    </Diagramatics>

    <hr>
    <h1>Basic Shapes</h1>

    Diagramatics also provides a set of basic shapes for creating diagrams.
    These are <code>rectangle</code>, <code>square</code>, <code>regular_polygon</code>, <code>regular_polygon_side</code>, <code>circle</code>, <code>arc</code>, <code>arrow</code>, <code>arrow2</code>, <code>textvar</code>.

    <Diagramatics title="rectangle" subtitle="(width : number, height : number) : Diagram" {width} {height}>
        {`
        let rect = rectangle(20,10);
        draw(rect);
        `}
    </Diagramatics>

    <Diagramatics title="square" subtitle="(sidelength : number = 1) : Diagram" {width} {height}>
        {`
        let sq = square(20);
        draw(sq);
        `}
    </Diagramatics>

    <Diagramatics title="rectangle_corner" subtitle="(bottomleft : Vector2, topright : Vector2) : Diagram" {width} {height}>
        {`
        // if you need to define a rectangle by its bottom left and top right corners,
        let p1   = V2(0,0);
        let p2   = V2(20,10);
        let rect = rectangle_corner(p1,p2);
        draw(rect);
        `}
    </Diagramatics>

    <Diagramatics title="regular_polygon" subtitle="(sides : number, radius : number) : Diagram" {width} {height}>
        {`
        let poly = regular_polygon(5, 10);
        draw(poly);
        `}
    </Diagramatics>

    <Diagramatics title="regular_polygon_side" subtitle="(sides : number, sidelength : number) : Diagram" {width} {height}>
        {`
        // if you want to define a regular polygon by its side length instead of radius,
        // use \`regular_polygon_side()\`

        let poly = regular_polygon_side(5, 10);
        draw(poly);
        `}
    </Diagramatics>

    <Diagramatics title="circle" subtitle="(radius : number = 1) : Diagram" {width} {height}>
        {`
        let circ = circle(10);
        draw(circ);
        `}
    </Diagramatics>
    <Diagramatics {width} {height}>
        {`
        // you can create an ellipse by scaling a circle
        let ell = circle(10).scale(V2(2,1));
        draw(ell);
        `}
    </Diagramatics>

    <Diagramatics title="arc" subtitle="(radius : number = 1, angle : number) : Diagram" {width} {height}>
        {`
        // arc will start from the positive x-axis and go counter-clockwise
        let ar = arc(10, Math.PI/2);
        draw(ar);
        `}
    </Diagramatics>
    <Diagramatics {width} {height}>
        {`
        // if you need an arc from angle \`a\` to \`b\`, use the \`.rotate\` method
        let a = Math.PI*3/4;
        let b = Math.PI*3/2;
        let ar = arc(10, b-a).rotate(a);
        draw(ar);
        `}
    </Diagramatics>

    <Diagramatics title="arrow" subtitle="(vector : Vector2, headsize : number = 1) : Diagram" {width} {height}>
        {`
        // if you need to put this arrow at a different position, use the \`.translate\` method
        let ar = arrow(V2(10,5), 0.5);
        draw(ar);
        `}
    </Diagramatics>

    <Diagramatics title="arrow1" subtitle="(start : Vector2, end : Vector2, headsize : number = 1) : Diagram" {width} {height}>
        {`
        // if you need to define the arrow by its start and end points, you can use this instead of \`arrow()\`
        // this is equal to \`arrow(end.sub(start)).translate(start)\`

        let ar = arrow1(V2(0,5), V2(10,5), 0.5);
        draw(ar);
        `}
    </Diagramatics>

    <Diagramatics title="arrow2" subtitle="(start : Vector2, end : Vector2, headsize : number = 1) : Diagram" {width} {height}>
        {`
        let ar = arrow2(V2(0,5), V2(10,5), 0.5);
        draw(ar);
        `}
    </Diagramatics>

    <Diagramatics title="textvar" subtitle="(str : string) : Diagram" {width} {height}>
        {`
        let sq = square(20);
        let tx = textvar('hello');
        draw(sq, tx);
        `}
    </Diagramatics>

    <hr>
    <h1>Combining Diagram</h1>
    <Diagramatics title="diagram_combine" subtitle="(...diagrams : Diagram[]) : Diagram" {width} {height}>
        {`
        let sq1 = square(10);
        let sq2 = square(10).translate(V2(12,0));

        let sq  = diagram_combine(sq1, sq2);
        let sqs = sq.fill('lightblue').translate(V2(0,12));
        draw(sq, sqs);
        `}
    </Diagramatics>

</div>

