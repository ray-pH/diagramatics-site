<svelte:head>
    <title>Table - Guide : Diagramatics</title>
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
    import DiagramEditor from '../../editor/DiagramEditor.svelte';

    var width = 200;
    var height = 200;
</script>

<Header />
<div class="guides-container">
    <Navigation page="table"/>

    <h1>Table</h1>
    
    <Diagramatics title="table.table" {width} {height} 
        subtitle_newline={true}
        subtitle="(diagrams : Diagram[][], padding : number = 0, orientation : 'rows'|'column' = 'rows', 
            <br>,
            min_rowsize : number = 0, min_colsize : number = 0) : Diagram">
        {`
        // The diagrams you want to put in a table should be in a 2D array.
        
        let r1 = text('red').fontsize(24);
        let r2 = text('blue').fontsize(24);
        let r3 = square().fill('red');
        let r4 = square().fill('blue');
        let t = table.table([[r1,r2],[r3,r4]], 0.5)
        draw(t)
        `}
    </Diagramatics>
    
    <hr>
    <h1>Styling The Table</h1>
    
    The <b>Tags</b> that available for tables are <code>TAG.TABLE</code>, <code>TAG.TABLE_CELL</code>, and <code>TAG.TABLE_CONTENT</code>.
    <code>TAG.ROW_</code> and <code>TAG.COL_</code> are also available for rows and columns.
    <Diagramatics title="Invisible Lines" {width} {height}>
        {`
        // If you want to hide the border of the table, you can style the table cell 
        
        let r1 = text('red').fontsize(24);
        let r2 = text('blue').fontsize(24);
        let r3 = square().fill('red');
        let r4 = square().fill('blue');
        let t = table.table([[r1,r2],[r3,r4]], 0.5)
        t = t.apply_to_tagged_recursive(TAG.TABLE_CELL, (d) => d.stroke('none'))
        draw(t)
        `}
    </Diagramatics>
    
    <Diagramatics title="Highlight first Row" {width} {height}>
        {`
        // If you want to hide the border of the table, you can style the table cell 
        
        let r1 = text('red').fontsize(24);
        let r2 = text('blue').fontsize(24);
        let r3 = square().fill('red');
        let r4 = square().fill('blue');
        let t = table.table([[r1,r2],[r3,r4]], 0.5)
        t = t.apply_to_tagged_recursive([TAG.TABLE_CELL, TAG.ROW_+'0'], (d) => d.fill('#ddd'))
        draw(t)
        `}
    </Diagramatics>


</div>
