<svelte:head>
    <title>Annotation - Guide : Diagramatics</title>
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
    <Navigation page="annotation"/>

    <h1>Annotation</h1>
    Diagramatics provide functions to annotate diagrams.


    <!-- /** -->
    <!--  * Create an annotation vector -->
    <!--  * @param v vector to be annotated -->
    <!--  * @param str string to be annotated (will be converted to mathematical italic) -->
    <!--  * if you don't want to convert to mathematical italic, use annotation.vector_text -->
    <!--  * @param arrow_head_size size of the arrow head -->
    <!--  * @param text_offset position offset of the text -->
    <!--  */ -->
    <!-- export function vector(v : Vector2, str? : string, text_offset? : Vector2, arrow_head_size? : number) : Diagram { -->

    <Diagramatics title="annotation.vector" {width} {height} subtitle_newline={true}
        subtitle="(v : Vector2, str? : string, text_offset? : Vector2, arrow_head_size? : number) : Diagram">
        {`
        // by default, the text will be in the tip of the arrow,
        // you can change the position of the text using \`text_offset\`

        let sq    = square(10);
        let vann1 = annotation.vector(V2(0,-8), "mg", V2(1.5,0)   , 0.4).fill('black');
        let vann2 = annotation.vector(V2(3, 0), "F" , V2(-0.5,1.5), 0.4).fill('black')
            .position(sq.get_anchor('center-right'));
        draw(sq, vann1, vann2)
        `}
    </Diagramatics>

    <hr>

    <Diagramatics title="annotation.angle" {width} {height} subtitle_newline={true}
                  subtitle="(p : [Vector2\, Vector2\, Vector2], str? : string, radius : number = 1 , text_offset? : Vector2 | number) : Diagram">
        {`
        // annotate angle ∠ABC given the point [A,B,C]
        // the default position of the text is at distance the point B
        // you can change the position of the text using \`text_offset\`

        let points = [V2(4,3), V2(3,0), V2(0,0)]
        let tr  = polygon(points);
        let ann = annotation.angle(points, "\\\\theta", 0.4, 0.6)
            .fill('lightblue').strokewidth(2).stroke('blue');
        draw(tr, ann);
        `}
    </Diagramatics>
    <Diagramatics {width} {height}>
        {`
        // the order of points determine which angle to be annotated
        // the angle will be in the counter-clockwise direction
        // *if you want to annotate the smaller angle, use \`annotation.angle_smaller\`

        let points = [V2(0,0), V2(3,0), V2(4,3)]
        let tr  = polygon(points);
        let ann = annotation.angle(points, "\\\\theta", 0.4, -0.6)
            .fill('lightblue').strokewidth(2).stroke('blue');
        draw(tr, ann);
        `}
    </Diagramatics>


    <Diagramatics title="annotation.angle_smaller" {width} {height} subtitle_newline={true}
                  subtitle="(p : [Vector2\, Vector2\, Vector2], str? : string, radius : number = 1 , text_offset? : Vector2 | number) : Diagram">
        {`
        let points = [V2(0,0), V2(3,0), V2(4,3)]
        let tr  = polygon(points);
        let ann = annotation.angle_smaller(points, "\\\\theta", 0.4, 0.6)
            .fill('lightblue').strokewidth(2).stroke('blue');
        draw(tr, ann);
        `}
    </Diagramatics>

    <hr>


    <!-- export function length
        (p1 : Vector2, p2 : Vector2, str : string, offset : number, tablength? : number, textoffset? : number, tabsymmetric : boolean = true) : Diagram { -->
    <Diagramatics {width} {height} title="length" subtitle_newline={true}
       subtitle="(p1 : Vector2, p2 : Vector2, str : string, offset : number, <br>, tablength? : number, textoffset? : number, tabsymmetric : boolean = true) : Diagram"
        >
        {`
        // if not defined, \`text_offset\` is \`2*offset\`

        let points = [V2(0,0), V2(3,0), V2(4,3)];
        let tr  = polygon(points);
        let ann = annotation.length(points[1], points[2], 'x', 0.3, 0.2).stroke('blue');
        draw(tr, ann);
        `}
    </Diagramatics>




</div>

