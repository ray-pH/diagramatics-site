<svelte:head>
    <title>Transformation - Guide : Diagramatics</title>
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
    <Navigation page="transformation"/>

    <h1>Transformation</h1>
    Diagram that has been created can be transformed.
    Diagramatics provide the following transformation 
    <code>translate</code>, <code>position</code>, <code>rotate</code>, <code>scale</code>, <code>reflect_over_point</code>, <code>reflect_over_line</code>, <code>reflect</code>, <code>vflip</code>, <code>hflip</code>, <code>move_origin</code>, <code>move_origin_text</code>.

    <Diagramatics title="Diagram.translate" subtitle="(v : Vector2) : Diagram" {width} {height}>
        {`
        let sq = square(10);
        let sq0 = sq.stroke('grey').strokedasharray([5]);
        let sq1 = sq.translate(V2(5,5));
        draw(sq0, sq1);
        `}
    </Diagramatics>

    <Diagramatics title="Diagram.position" subtitle="(v : Vector2) : Diagram" {width} {height}>
        {`
        let sq = square(10);
        let sq0 = sq.stroke('grey').strokedasharray([5]);
        let sq1 = sq.position(V2(5,5));
        draw(sq0, sq1);
        `}
    </Diagramatics>

    <Diagramatics title="Diagram.rotate" subtitle="(angle : number, pivot? : Vector2) : Diagram" {width} {height}>
        {`
        let sq = square(10);
        let sq0 = sq.stroke('grey').strokedasharray([5]);
        let sq1 = sq.rotate(Math.PI/3, V2(-5,-5));
        draw(sq0, sq1);
        `}
    </Diagramatics>
    <Diagramatics {width} {height}>
        {`
        // if pivot is left undefined, the diagram will rotate around its origin

        let sq = square(10);
        let sq0 = sq.stroke('grey').strokedasharray([5]);
        let sq1 = sq.rotate(Math.PI/3);
        draw(sq0, sq1);
        `}
    </Diagramatics>


    <Diagramatics title="Diagram.scale" subtitle="(scale : Vector2 | number, origin? : Vector2) : Diagram" {width} {height}>
        {`
        let sq = square(10);
        let sq0 = sq.stroke('grey').strokedasharray([5]);
        let sq1 = sq.scale(V2(2,0.5), V2(-5,-5));
        draw(sq0, sq1);
        `}
    </Diagramatics>
    <Diagramatics {width} {height}>
        {`
        // if origin is left undefined, the diagram will scale around its origin

        let sq = square(10);
        let sq0 = sq.stroke('grey').strokedasharray([5]);
        let sq1 = sq.scale(V2(2,0.5));
        draw(sq0, sq1);
        `}
    </Diagramatics>

    <Diagramatics title="Diagram.vflip" subtitle="(a? : number) : Diagram" {width} {height}>
        {`
        // Reflect the diagram vertically over a horizontal line \`y = a\`
        // if left undefined, flip over its origin

        let tr = regular_polygon(3,10);
        let tr0 = tr.stroke('grey').strokedasharray([5]);
        let tr1 = tr.vflip(-10);

        draw(tr0, tr1);
        `}
    </Diagramatics>

    <Diagramatics title="Diagram.hflip" subtitle="(a? : number) : Diagram" {width} {height}>
        {`
        // Reflect the diagram horizontally over a vertical line \`x = a\`
        // if left undefined, flip over its origin

        let tr = regular_polygon(3,10).rotate(Math.PI/6);
        let tr0 = tr.stroke('grey').strokedasharray([5]);
        let tr1 = tr.hflip(10);

        draw(tr0, tr1);
        `}
    </Diagramatics>

    <hr>
    <h1>Reflection</h1>
        <!-- /** -->
        <!--  * Reflect the diagram -->
        <!--  * if given 0 arguments, reflect over the origin -->
        <!--  * if given 1 argument, reflect over a point p1 -->
        <!--  * if given 2 arguments, reflect over a line defined by two points p1 and p2 -->
        <!--  * @param p1 point -->
        <!--  * @param p2 point -->
        <!--  */ -->
        <!-- public reflect(p1? : Vector2, p2? : Vector2){ -->
    <Diagramatics title="Diagram.reflect" subtitle="(p1? : Vector2, p2? : Vector2) : Diagram" {width} {height}>
        {`
        // if given 0 arguments, reflect over the origin
        // if given 1 argument, reflect over a point p1
        // if given 2 arguments, reflect over a line defined by two points p1 and p2

        let sq = square(10);

        sq.reflect(V2(1,0));
        // is the same as
        sq.reflect_over_point(V2(1,0));

        sq.reflect(V2(1,0), V2(2,0));
        // is the same as
        sq.reflect_over_line(V2(1,0), V2(2,0));
        `}
    </Diagramatics>

    <Diagramatics title="Diagram.reflect_over_point" subtitle="(p : Vector2) : Diagram" {width} {height}>
        {`
        let penta   = regular_polygon(5, 10);
        let penta_0 = penta.stroke('grey').strokedasharray([5]);

        let refl_point = V2(10,5);
        let penta_1 = penta.reflect_over_point(refl_point);

        let refl_indicator = circle(0.5).fill('blue').position(refl_point);
        draw(penta_0, penta_1, refl_indicator);
        `}
    </Diagramatics>

    <Diagramatics {width} {height}>
        {`
        // you can see which point reflected into which location in the diagram below

        let penta   = regular_polygon(5, 10);
        let penta_0 = penta.stroke('grey').strokedasharray([5]);

        let refl_point = V2(10,5);
        let penta_1 = penta.reflect_over_point(refl_point);

        let refl_indicator = circle(0.5).fill('blue').position(refl_point);
        draw(penta_0.debug(), penta_1.debug(), refl_indicator);
        `}
    </Diagramatics>


    <Diagramatics title="Diagram.reflect_over_line" subtitle="(p1 : Vector2, p2 : Vector2) : Diagram" {width} {height}>
        {`
        let penta   = regular_polygon(5, 10);
        let penta_0 = penta.stroke('grey').strokedasharray([5]);

        let p1 = V2(0,15);
        let p2 = V2(13,2);
        let penta_1 = penta.reflect_over_line(p1, p2);

        let refl_line = line(p1,p2).stroke('grey').strokedasharray([5]);
        draw(penta_0, penta_1, refl_line);
        `}
    </Diagramatics>
    <Diagramatics {width} {height}>
        {`
        // you can see which point reflected into which location in the diagram below

        let penta   = regular_polygon(5, 10);
        let penta_0 = penta.stroke('grey').strokedasharray([5]);

        let p1 = V2(0,15);
        let p2 = V2(13,2);
        let penta_1 = penta.reflect_over_line(p1, p2);

        let refl_line = line(p1,p2).stroke('grey').strokedasharray([5]);
        draw(penta_0.debug(), penta_1.debug(), refl_line);
        `}
    </Diagramatics>

    <hr>

    <h1>Custom transformation</h1>
    <Diagramatics title="Diagram.transform" subtitle="(transform_function : (p : Vector2) => Vector2) : Diagram" {width} {height}>
        {`
        let sq = square(15);

        // create a transformation function that takes a Vector2 and returns a Vector2
        let f_wavy = (v) => V2(0, Math.sin(v.x)).add(v);

        // we have to subdivide first before applying the transformation
        let sqmod  = sq.apply(mod.subdivide(100)).transform(f_wavy);

        draw(sqmod);
        `}
    </Diagramatics>

</div>

