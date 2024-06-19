<svelte:head>
    <title>Boolean - Guide : Diagramatics</title>
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
    <Navigation page="boolean"/>

    <h1>Boolean Operation</h1>
    Polygon can be combined using boolean operation. The following boolean operation is supported :
    
    <Diagramatics title="boolean.union" subtitle="(d1 : Diagram, d2 : Diagram, tolerance? : number) : Diagram" {width} {height}>
        {`
        let sq = square(10);
        let ci = circle(5).position(V2(7,0));
        
        let result = boolean.union(sq, ci);
        draw(sq, ci, result.fill('lightblue'));
        `}
    </Diagramatics>
    
    <Diagramatics title="boolean.difference" subtitle="(d1 : Diagram, d2 : Diagram, tolerance? : number) : Diagram" {width} {height}>
        {`
        let sq = square(10)
            .stroke('gray').strokedasharray([5]);
        let ci = circle(5).position(V2(7,0))
            .stroke('gray').strokedasharray([5]);
            
        let result = boolean.difference(sq, ci);
        draw(sq, ci, result.fill('lightblue'));
        `}
    </Diagramatics>
    
    <Diagramatics {width} {height}>
        {`
        let sq = square(10)
            .stroke('gray').strokedasharray([5]);
        let ci = circle(5).position(V2(7,0))
            .stroke('gray').strokedasharray([5]);
            
        let result = boolean.difference(ci, sq);
        draw(sq, ci, result.fill('lightblue'));
        `}
    </Diagramatics>
    
    <Diagramatics title="boolean.intersect" subtitle="(d1 : Diagram, d2 : Diagram, tolerance? : number) : Diagram" {width} {height}>
        {`
        let sq = square(10)
            .stroke('gray').strokedasharray([5]);
        let ci = circle(5).position(V2(7,0))
            .stroke('gray').strokedasharray([5]);
            
        let result = boolean.intersect(sq, ci);
        draw(sq, ci, result.fill('lightblue'));
        `}
    </Diagramatics>
    
    <Diagramatics title="boolean.xor" subtitle="(d1 : Diagram, d2 : Diagram, tolerance? : number) : Diagram" {width} {height}>
        {`
        let sq = square(10)
            .stroke('gray').strokedasharray([5]);
        let ci = circle(5).position(V2(7,0))
            .stroke('gray').strokedasharray([5]);
            
        let result = boolean.xor(sq, ci);
        draw(sq, ci, result.fill('lightblue'));
        `}
    </Diagramatics>

    <p>
        * For all the boolean operations, there is an optional parameter <code>tolerance</code> which is used to determine the tolerance for the operation.
        The default value is <code>1e-10</code>.
    </p>


</div>
