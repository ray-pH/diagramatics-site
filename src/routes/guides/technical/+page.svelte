<svelte:head>
    <title>Technical - Guide : Diagramatics</title>
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

<style>
    pre{
        background: #f8f8f8;
        border-radius: 10px;
        margin:10px;
        padding: 20px;
        width: fit-content;
    }
</style>

<Header />
<div class="guides-container">
    <Navigation page="technical"/>

    This page contains more technical details about Diagramatics.

    <h1>Diagram Class</h1>
    the Diagram class is the main class of Diagramatics.

    <!-- type : DiagramType; -->
    <!-- children : Diagram[] = []; -->
    <!-- path : Path | undefined = undefined; // Polygon and Curve have a path -->
    <!-- origin : Vector2 = new Vector2(0, 0); // position of the origin of the diagram -->
    <!-- style  : DiagramStyle = {}; -->
    <!-- textdata : TextData = {}; -->
    <!-- imgdata  : ImageData = {}; -->
    <!-- mutable  : boolean   = false; -->
    <!-- tags : string[] = []; -->
    The Diagram class contains the following properties
    <code><pre>
    type     : DiagramType      // 'polygon', 'curve', 'text', 'image', 'diagram'
    children : Diagram[]        // Diagrams can have children
    path     : Path | undefined // Polygon and Curve have a path
    origin   : Vector2          // position of the origin of the diagram
    mutable  : boolean
    tags     : string[]

    style    : DiagramStyle
    textdata : TextData
    imgdata  : ImageData
    </pre></code>
    User should not directly creating objects of Diagram class and modify their properties. Instead, use the functions and methods provided by Diagramatics.

    <h1>Mutability</h1>
    <p>
    By default, Diagrams are immutable. The users should interact with the Diagram object in a functional way. 
    The Diagram object is immutable in the sense that the Diagram object itself will not be modified by the functions and methods provided by Diagramatics. Instead, the functions and methods will return a new Diagram object with the desired properties. The hope of this design is to make the Diagram object easier to reason about.
    </p>
    <p>
    But there are performance cost to this design. Since javascript is not a functional language, the languange doesn't really optimize it well. 
    </p>
    <p>
        Because of that, Diagramatics also provide a way to make the Diagram object mutable.
        This is useful when the diagrams is complex and performance is a concern.
    </p>

    <p><i>
        *Techincally, since we're using javascript, the object is not really immutable. But methods and functions provided by Diagramatics by default will act as if the object is immutable to the user.
    </i></p>

    You can set the mutability of a Diagram object by using <code>Diagram.mut</code>

    <Diagramatics title="Diagram.mut" subtitle="() : Diagram" {width} {height}>
        {`
        // here, sq, sq0, sq1 is the same object
        let sq = square(10).mut();
        let sq0 = sq.stroke('grey').strokedasharray([5]);
        let sq1 = sq.translate(V2(5,5));
        draw(sq0, sq1); // sq0 == sq1
        `}
    </Diagramatics>
    <Diagramatics {width} {height}>
        {`
        // compare to this where sq, sq0, sq1 is different objects
        let sq = square(10);
        let sq0 = sq.stroke('grey').strokedasharray([5]);
        let sq1 = sq.translate(V2(5,5));
        draw(sq0, sq1);
        `}
    </Diagramatics>
    <Diagramatics {width} {height}>
        {`
        // for a mutable object, you don't need to assign it to a variable
        let sq = square(10).mut();
        sq.stroke('grey').strokedasharray([5]);
        sq.fill('lightblue');
        draw(sq);
        `}
    </Diagramatics>
    You can turn back the diagram to immutable by using <code>Diagram.immut()</code>
    <Diagramatics title="Diagram.immut" subtitle="() : Diagram" {width} {height}>
        {`
        // here, sq, sq0, sq1 is the same object
        let sq = square(10).mut();
        let sq0 = sq.stroke('grey').strokedasharray([5]);
        let sq1 = sq.immut().fill('lightblue').translate(V2(5,5));
        draw(sq0, sq1);
        `}
    </Diagramatics>
    If you need a copy of a mutable diagram, you can also use <code>Diagram.copy()</code>
    <Diagramatics title="Diagram.copy" subtitle="() : Diagram" {width} {height}>
        {`
        // here, sq, sq0, sq1 is the same object
        let sq = square(10).mut();
        let sq0 = sq.copy().stroke('grey').strokedasharray([5]);
        let sq1 = sq.copy().translate(V2(5,5));
        draw(sq0, sq1);
        `}
    </Diagramatics>


</div>

