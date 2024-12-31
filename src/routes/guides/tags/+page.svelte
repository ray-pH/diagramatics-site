<svelte:head>
    <title>Tags - Guide : Diagramatics</title>
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
    <Navigation page="tags"/>

    <h1>Tags</h1>
    Diagramatics has a concept of tags. These tags can be used to make diagram manipulation easier.

    <Diagramatics title="Diagram.append_tags" subtitle="(tags : string | string[]) : Diagram" width={0} {height}>
        {`
        let a = square(100).append_tags('blue').append_tags('big');
        let b = square(10).append_tags(['blue', 'small']);
        
        // a will have the tags 'blue' and 'big'
        // b will have the tags 'blue' and 'small'
        `}
    </Diagramatics>

    <Diagramatics title="Diagram.remove_tags" subtitle="(tags : string | string[]) : Diagram" width={0} {height}>
        {`
        let a = square(100).append_tags('blue').append_tags('big');
        let b = square(10).append_tags(['blue', 'small']);
        a = a.remove_tags('blue');
        b = b.remove_tags(['blue', 'small']);
        
        // a will have the tag 'big'
        // b will have no tag
        `}
    </Diagramatics>

    <Diagramatics title="Diagram.reset_tags" subtitle="() : Diagram" width={0} {height}>
        {`
        let a = square(10).append_tags(['blue', 'small']);
        a = a.reset_tags();
        
        // a will have no tag
        `}
    </Diagramatics>
    
    <Diagramatics title="Diagram.contain_tag" subtitle="(tag: string) : boolean" width={0} {height}>
        {`
        // check if a diagram contains a tag
        let a = square(10).append_tags(['square', 'small']);
        
        a.contain_tag('square'); // true
        a.contain_tag('big');    // false
        `}
    </Diagramatics>
    
    <Diagramatics title="Diagram.contain_all_tags" subtitle="(tags: string[]) : boolean" width={0} {height}>
        {`
        // check if a diagram contains all tags given
        let a = square(10).append_tags(['square', 'small', 'blue']);
        
        a.contain_all_tags(['square', 'small']); // true
        a.contain_all_tags(['square', 'big']);   // false
        `}
    </Diagramatics>
    
    <hr>
    <h1>Tags Application</h1>
    
    <Diagramatics title="Diagram.apply_to_tagged_recursive" subtitle="(tags : string | string[], func : (d : Diagram) => Diagram) : Diagram" {width} {height}>
        {`
        // this is useful if we have a deeply nested diagram, and we want to apply a function to all diagrams with a tag
        
        let a = square(10);
        let b = square(10).append_tags('blue');
        let c = circle(5).append_tags('blue');
        let d = circle(5);
        
        let distributed = distribute_horizontal([a, b, c, d], 1);
        let colored = distributed.apply_to_tagged_recursive('blue', d => d.fill('lightblue'));
        
        draw(colored);
        `}
    </Diagramatics>
    
    <Diagramatics title="Diagram.get_tagged_elements" subtitle="(tags : string | string[]) : Diagram[]" {width} {height}>
        {`
        // this is useful if we have a deeply nested diagram, and we want to get the diagrams with certain tags
        
        let a = square(10);
        let b = square(10).append_tags('special');
        let c = circle(5);
        let d = circle(5).append_tags('special');
        
        let distributed = distribute_horizontal([a, b, c, d], 1);
        let specials = distributed.get_tagged_elements('special');
        
        draw(...specials);
        `}
    </Diagramatics>

    <hr>
    <h1>Built In Tags</h1>
    
    <Diagramatics title="Diagram.get_tagged_elements" subtitle="(tags : string | string[]) : Diagram[]" width={0} no_eval={true}>
        {`
        enum TAG {
            EMPTY = "empty",
            LINE = "line",
            CIRCLE = "circle",
            TEXTVAR = "textvar",
            
            // prefix
            ROW_ = "row_",
            COL_ = "col_",
            
            // arrow
            ARROW_LINE = "arrow_line",
            ARROW_HEAD = "arrow_head",
            
            // table
            TABLE = "table",
            CONTAIN_TABLE = "contain_table",
            TABLE_CELL = "table_cell",
            TABLE_CONTENT = "table_content",
            EMPTY_CELL = "empty_cell",
            
            //graph
            GRAPH_AXIS = "graph_axis_line",
            GRAPH_TICK = "graph_tick",
            GRAPH_TICK_LABEL = "graph_tick_label",
            GRAPH_GRID = "graph_grid",
        }
        `}
    </Diagramatics>
    
    <Diagramatics title="Styling Arrow Line and Head separately" {width} {height}>
        {`
        let arr = arrow(V2(3,10), 2).strokewidth(4)
            .apply_to_tagged_recursive(TAG.ARROW_HEAD, d => d.fill('blue').stroke('white'))
            .apply_to_tagged_recursive(TAG.ARROW_LINE, d => d.stroke('blue'));
        draw(arr);
        `}
    </Diagramatics>

</div>

