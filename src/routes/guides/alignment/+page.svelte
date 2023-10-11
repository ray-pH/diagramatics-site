<svelte:head>
    <title>Alignment - Guide : Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
</svelte:head>

<script>
    import Header from '../../Header.svelte'
    import Diagramatics from '../../Diagramatics.svelte'
    import Navigation from '../navigation.svelte'
    import 'diagramatics/css/diagramatics.css'
    import '../guides.css'
    import { base } from '$app/paths';

    var width = 200;
    var height = 200;
</script>

<Header />
<div class="guides-container">
    <Navigation page="alignment"/>

    <h1>Alignment and Distribution</h1>
    Diagramatics provide functions to align and distribute diagram objects.

    <!-- align_vertical, align_horizontal, -->
    <!-- distribute_horizontal, distribute_vertical, -->
    <!-- distribute_horizontal_and_align, distribute_vertical_and_align,  -->

    <h2>Alignment</h2>

    let's say we have a list of diagrams, and we want to align them vertically or horizontally.
    <Diagramatics {width} {height}>
        {`
        let r1 = rectangle(3, 2).fill('blue' ).position(V2( 1,  1));
        let r2 = rectangle(2, 3).fill('white').position(V2( 0,  0));
        let r3 = rectangle(2, 2).fill('red'  ).position(V2(-1, -1));
        draw(r1, r2, r3);
        `}
    </Diagramatics>

    <!-- type VerticalAlignment   = 'top'  | 'center' | 'bottom'; -->
    <!-- type HorizontalAlignment = 'left' | 'center' | 'right'; -->
    <!-- align_vertical(diagrams : Diagram[], alignment : VerticalAlignment = 'center') : Diagram[] -->
    <!-- align_horizontal(diagrams : Diagram[], alignment : HorizontalAlignment = 'center') : Diagram[] { -->
    <Diagramatics title="align_vertical" subtitle="(diagrams : Diagram[], alignment : 'top' | 'center' | 'bottom') : Diagram[]" {width} {height}>
        {`
        let r1 = rectangle(3, 2).fill('blue' ).position(V2( 1,  1));
        let r2 = rectangle(2, 3).fill('white').position(V2( 0,  0));
        let r3 = rectangle(2, 2).fill('red'  ).position(V2(-1, -1));
        [r1, r2, r3] = align_vertical([r1, r2, r3], 'bottom');
        draw(r1, r2, r3);
        `}
    </Diagramatics>

    <Diagramatics title="align_horizontal" subtitle="(diagrams : Diagram[], alignment : 'left' | 'center' | 'right') : Diagram[]" {width} {height}>
        {`
        let r1 = rectangle(3, 2).fill('blue' ).position(V2( 1,  1));
        let r2 = rectangle(2, 3).fill('white').position(V2( 0,  0));
        let r3 = rectangle(2, 2).fill('red'  ).position(V2(-1, -1));
        [r1, r2, r3] = align_horizontal([r1, r2, r3], 'right');
        draw(r1, r2, r3);
        `}
    </Diagramatics>

<!-- export function distribute_horizontal(diagrams : Diagram[], space : number = 0) : Diagram[] { -->
<!-- export function distribute_vertical(diagrams : Diagram[], space : number = 0) : Diagram[] { -->

        <h2>Distribution</h2>

    <Diagramatics title="distribute_horizontal" subtitle="(diagrams : Diagram[], space : number = 0) : Diagram[]" {width} {height}>
        {`
        // the objects will be distributed from left to right 
        // in the order of the array

        let r1 = rectangle(3, 2).fill('blue' ).position(V2( 1,  1));
        let r2 = rectangle(2, 3).fill('white').position(V2( 0,  0));
        let r3 = rectangle(2, 2).fill('red'  ).position(V2(-1, -1));
        [r1, r2, r3] = distribute_horizontal([r1, r2, r3], 1);
        draw(r1, r2, r3);
        `}
    </Diagramatics>

    <Diagramatics {width} {height}>
        {`
        let r1 = rectangle(3, 2).fill('blue' ).position(V2( 1,  1));
        let r2 = rectangle(2, 3).fill('white').position(V2( 0,  0));
        let r3 = rectangle(2, 2).fill('red'  ).position(V2(-1, -1));
        [r2, r1, r3] = distribute_horizontal([r2, r1, r3], 1);
        draw(r1, r2, r3);
        `}
    </Diagramatics>

    <Diagramatics title="distribute_vertical" subtitle="(diagrams : Diagram[], space : number = 0) : Diagram[]" {width} {height}>
        {`
        // the objects will be distributed from top to bottom
        // in the order of the array

        let r1 = rectangle(3, 2).fill('blue' ).position(V2( 1,  1));
        let r2 = rectangle(2, 3).fill('white').position(V2( 0,  0));
        let r3 = rectangle(2, 2).fill('red'  ).position(V2(-1, -1));
        [r1, r2, r3] = distribute_vertical([r1, r2, r3], 1);
        draw(r1, r2, r3);
        `}
    </Diagramatics>

    <h2>Alignment and Distribution</h2>

<!-- export function distribute_horizontal_and_align(diagrams : Diagram[], horizontal_space : number = 0, -->
<!-- export function distribute_vertical_and_align(diagrams : Diagram[], vertical_space : number = 0, -->

<Diagramatics title="distribute_horizontal_and_align" subtitle="(diagrams : Diagram[], horizontal_space : number, alignment : 'top' | 'center' | 'bottom')" {width} {height} subtitle_newline={true}>
        {`
        let r1 = rectangle(3, 2).fill('blue' ).position(V2( 1,  1));
        let r2 = rectangle(2, 3).fill('white').position(V2( 0,  0));
        let r3 = rectangle(2, 2).fill('red'  ).position(V2(-1, -1));
        [r1, r2, r3] = distribute_horizontal_and_align([r1, r2, r3], 1, 'bottom');
        draw(r1, r2, r3);
        `}
    </Diagramatics>

    <Diagramatics title="distribute_vertical_and_align" subtitle="(diagrams : Diagram[], vertical_space : number, alignment : 'left' | 'center' | 'right')" {width} {height} subtitle_newline={true}>
        {`
        let r1 = rectangle(3, 2).fill('blue' ).position(V2( 1,  1));
        let r2 = rectangle(2, 3).fill('white').position(V2( 0,  0));
        let r3 = rectangle(2, 2).fill('red'  ).position(V2(-1, -1));
        [r1, r2, r3] = distribute_vertical_and_align([r1, r2, r3], 1, 'right');
        draw(r1, r2, r3);
        `}
    </Diagramatics>

</div>
