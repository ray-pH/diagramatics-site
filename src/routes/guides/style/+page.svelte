<svelte:head>
    <title>Style - Guide : Diagramatics</title>
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

    var width = 150;
    var height = 150;
</script>

<style>
.colorinfo-container{
    width: fit-content;
    margin:10px;
}
.colorinfo-column{
    display: inline-block;
    vertical-align: top;
}
.colorinfo {
    padding: 2px 10px;
}
</style>


<Header />
<div class="guides-container">
    <Navigation page="style"/>

    <h1>Style</h1>

    Diagram have a style property that can be used to style the diagram.<br>
    Here are the style properties that is available for Diagrams.
    <pre style="
        background: #f8f8f8;
        border-radius: 10px;
        margin:10px;
        padding: 20px;
        width: fit-content;
        ">
    stroke           : string,
    fill             : string,
    opacity          : number,
    stroke-width     : number,
    stroke-linecap   : string,
    stroke-dasharray : number[],
    stroke-linejoin  : string,
    vector-effect    : string,
    </pre>

    Diagramatics provide a set of color that can be used to style the diagram. <br>
    The colors is based on tab20 color scheme.

    <div class="colorinfo-container">
        <div class='colorinfo-column'>
            <div class='colorinfo' style="background-color:#1f77b4; color:white"><pre>blue        : #1f77b4</pre></div>
            <div class='colorinfo' style="background-color:#aec7e8; color:black"><pre>lightblue   : #aec7e8</pre></div>
            <div class='colorinfo' style="background-color:#ff7f0e; color:black"><pre>orange      : #ff7f0e</pre></div>
            <div class='colorinfo' style="background-color:#ffbb78; color:black"><pre>lightorange : #ffbb78</pre></div>
            <div class='colorinfo' style="background-color:#2ca02c; color:white"><pre>green       : #2ca02c</pre></div>
            <div class='colorinfo' style="background-color:#98df8a; color:black"><pre>lightgreen  : #98df8a</pre></div>
            <div class='colorinfo' style="background-color:#d62728; color:white"><pre>red         : #d62728</pre></div>
            <div class='colorinfo' style="background-color:#ff9896; color:black"><pre>lightred    : #ff9896</pre></div>
            <div class='colorinfo' style="background-color:#9467bd; color:white"><pre>purple      : #9467bd</pre></div>
            <div class='colorinfo' style="background-color:#c5b0d5; color:black"><pre>lightpurple : #c5b0d5</pre></div>
            <div class='colorinfo' style="background-color:#8c564b; color:white"><pre>brown       : #8c564b</pre></div>
            <div class='colorinfo' style="background-color:#c49c94; color:black"><pre>lightbrown  : #c49c94</pre></div>
        </div>
        <div class='colorinfo-column'>
            <div class='colorinfo' style="background-color:#e377c2; color:black"><pre>pink        : #e377c2</pre></div>
            <div class='colorinfo' style="background-color:#f7b6d2; color:black"><pre>lightpink   : #f7b6d2</pre></div>
            <div class='colorinfo' style="background-color:#7f7f7f; color:white"><pre>grey        : #7f7f7f</pre></div>
            <div class='colorinfo' style="background-color:#c7c7c7; color:black"><pre>lightgrey   : #c7c7c7</pre></div>
            <div class='colorinfo' style="background-color:#7f7f7f; color:white"><pre>gray        : #7f7f7f</pre></div>
            <div class='colorinfo' style="background-color:#c7c7c7; color:black"><pre>lightgray   : #c7c7c7</pre></div>
            <div class='colorinfo' style="background-color:#bcbd22; color:black"><pre>olive       : #bcbd22</pre></div>
            <div class='colorinfo' style="background-color:#dbdb8d; color:black"><pre>lightolive  : #dbdb8d</pre></div>
            <div class='colorinfo' style="background-color:#17becf; color:black"><pre>cyan        : #17becf</pre></div>
            <div class='colorinfo' style="background-color:#9edae5; color:black"><pre>lightcyan   : #9edae5</pre></div>
        </div>
    </div>

    <br>
    <hr>
    <h1>Styling Diagram</h1>

    <Diagramatics title="Diagram.fill" subtitle="(color : string) : Diagram" {width} {height}>
        {`
        let sq = square(10).fill('blue');
        draw(sq);
        `}
    </Diagramatics>
    <Diagramatics {width} {height}>
        {`
        // color can be given as colorname or hex color code

        let sq = square(10).fill('#d62728');
        draw(sq);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.stroke" subtitle="(color : string) : Diagram" {width} {height}>
        {`
        let sq = square(10).stroke('red');
        draw(sq);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.opacity" subtitle="(opacity : number) : Diagram" {width} {height}>
        {`
        // opacity is between 0 and 1
        let sq = square(10).fill('blue').opacity(0.5);
        draw(sq);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.strokewidth" subtitle="(width : number) : Diagram" {width} {height}>
        {`
        let sq = square(10).strokewidth(4);
        draw(sq);
        `}
    </Diagramatics>


    <hr>
    <h1>Styling Stroke</h1>
    <Diagramatics title="Diagram.strokelinecap" subtitle="(linecap : 'butt' | 'round' | 'square') : Diagram" {width} {height}>
        {`
        let l   = line(V2(0,0), V2(0,1)).strokewidth(12);
        let l0 = l.strokelinecap('butt');
        let l1 = l.strokelinecap('square');
        let l2 = l.strokelinecap('round');

        let ls = distribute_horizontal([l0,l1,l2], 0.2);

        // highlight to make it easier to see
        let lhighlight = ls.children.map(x => l.stroke('lightred').strokewidth(2).position(x.origin));

        draw(ls, ...lhighlight);
        `}
    </Diagramatics>

    <Diagramatics title="Diagram.strokelinejoin" subtitle="(linejoin : 'miter' | 'round' | 'bevel') : Diagram" {width} {height}>
        {`
        // this style is based on svg w3c standard
        // more info : https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin

        let c = curve([V2(0,0), V2(0.5,0.5), V2(1,0)]).strokewidth(12);
        let c0 = c.strokelinejoin('miter');
        let c1 = c.strokelinejoin('round');
        let c2 = c.strokelinejoin('bevel');

        let cs = distribute_vertical([c0,c1,c2], 0.2);

        // highlight to make it easier to see
        let chighlight = cs.children.map(x => c.stroke('lightred').strokewidth(2).position(x.origin));

        draw(cs, ...chighlight);
        `}
    </Diagramatics>

    <Diagramatics title="Diagram.strokedasharray" subtitle="(dasharray : number[]) : Diagram" {width} {height}>
        {`
        // this style is based on svg w3c standard
        // more info : https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray

        let l = line(V2(0,0), V2(1,0)).strokewidth(12);
        // Dashes and gaps of the same size
        let l0 = l.strokedasharray([20]);
        let l1 = l.strokedasharray([10]);

        // Dashes starting with a gap
        let l2 = l.strokedasharray([0,10,0]);

        // Dashes and gaps of different sizes
        let l3 = l.strokedasharray([40,10]);

        // Dashes and gaps of various sizes with an odd number of values
        let l4 = l.strokedasharray([40,10,20]);

        // Dashes and gaps of various sizes with an even number of values
        let l5 = l.strokedasharray([40,10,20,30]);

        let lines = distribute_vertical([l0,l1,l2,l3,l4,l5], 0.2);
        draw(lines);
        `}
    </Diagramatics>

    <Diagramatics title="Diagram.vectoreffect" subtitle="(vectoreffect : 'none' | 'non-scaling-stroke') : Diagram" {width} {height}>
        {`
        let l = line(V2(0,0), V2(2,0));

        // the default is 'non-scaling-stroke', which is calculated relative to the screen.
        // so a strokewidth 1 will always be 1 pixel wide, 
        // and doesn't care about the coordinate system of the diagram.
        let l0 = l.vectoreffect('non-scaling-stroke').strokewidth(1);

        // if using 'none', the strokewidth will be relative to the coordinate system of the diagram.
        // for example, this line have the length of 2 unit
        // so a strokewidth of 1 will be 1 unit wide on the coordinate system of the diagram.
        let l1 = l.vectoreffect('none').strokewidth(1);

        let lines = distribute_vertical([l0,l1], 1.5);
        draw(lines);
        `}
    </Diagramatics>

    <hr>
    <h1>Styling Text</h1>
    <Diagramatics title="Diagram.fontfamily" subtitle="(fontfamily : string) : Diagram" {width} {height}>
        {`
        let sq = square(10).stroke('lightgrey');
        let tx = text('hello').fontfamily('sans-serif');
        draw(sq, tx);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.fontsize" subtitle="(fontsize : number) : Diagram" {width} {height}>
        {`
        let sq = square(10).stroke('lightgrey');
        let tx = text('hello').fontsize(50);
        draw(sq, tx);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.fontweight" subtitle="(fontweight : 'normal' | 'bold' | 'bolder' | 'lighter' | number ) : Diagram" {width} {height}>
        {`
        let sq = square(10).stroke('lightgrey');
        let tx = text('hello').fontweight('bold');
        draw(sq, tx);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.fontstyle" subtitle="(fontstyle : 'normal' | 'italic') : Diagram" {width} {height}>
        {`
        let sq = square(10).stroke('lightgrey');
        let tx = text('hello').fontstyle('italic');
        draw(sq, tx);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.move_origin_text" subtitle="(anchor : string) : Diagram" {width} {height}>
        {`
        // anchors can be :
        // 'top-left', 'top-center', 'top-right',
        // 'center-left', 'center-center', 'center-right',
        // 'bottom-left', 'bottom-center', 'bottom-right',

        let sq  = square(10).stroke('lightgrey');
        let tx1 = text('hello').move_origin_text('bottom-right').position(V2(0,0));
        let tx2 = text('there').move_origin_text('top-left').position(V2(0,0));
        draw(sq, tx1, tx2);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.textangle" subtitle="(angle : number) : Diagram" {width} {height}>
        {`
        let sq  = square(10).stroke('lightgrey');
        let tx = text('hello').textangle(to_radian(45));
        draw(sq, tx);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.fontscale" subtitle="(fontscale : 'auto' | number) : Diagram" {width} {height}>
        {`
        // just like stroke's vectoreffect property
        // texts can also be automatically scaled to the screen
        // or scaled relative to the coordinate system of the diagram by putting in a number

        let sq = square(10).stroke('lightgrey');
        let txa = text('auto').fontsize(24).fontscale('auto')   .translate(V2(0,1));
        let txb = text('absolute').fontsize(24).fontscale(0.1).translate(V2(0,-1));
        draw(sq, txa, txb);
        `}
    </Diagramatics>
    <Diagramatics {width} {height}>
        {`
        // the square here is 2 times bigger than the previous example
        // notice that the 'absolute' text stays the same size 
        // relative to the coordinate system of the diagram

        let sq = square(20).stroke('lightgrey');
        let txa = text('auto').fontsize(24).fontscale('auto')   .translate(V2(0,2));
        let txb = text('absolute').fontsize(24).fontscale(0.1).translate(V2(0,-2));
        draw(sq, txa, txb);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.textfill" subtitle="(color : string) : Diagram" {width} {height}>
        {`
        let sq = square(10).stroke('lightgrey');
        let tx = text('hello').textfill('blue');
        draw(sq, tx);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.textstroke" subtitle="(color : string) : Diagram" {width} {height}>
        {`
        let sq = square(10).stroke('lightgrey');
        let tx = text('hello').fontweight('bold').textstroke('blue');
        draw(sq, tx);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.textstrokewidth" subtitle="(width : number) : Diagram" {width} {height}>
        {`
        let sq = square(10).stroke('lightgrey');
        let tx = text('hello').fontweight('bold').textstroke('blue').textstrokewidth(5);
        draw(sq, tx);
        `}
    </Diagramatics>

    <Diagramatics title="Diagram.text_tovar" subtitle="() : Diagram" {width} {height}>
        {`
        // convert the text into mathematical italic
        // equivalent to using \`textvar\`

        let sq = square(10).stroke('lightgrey');
        let tx = text('hello').text_tovar();
        draw(sq, tx);
        `}
    </Diagramatics>
    <Diagramatics title="Diagram.text_totext" subtitle="() : Diagram" {width} {height}>
        {`
        // convert the text from mathematical italic

        let sq = square(10).stroke('lightgrey');
        let tx = text('hello').text_tovar().text_totext();
        draw(sq, tx);
        `}
    </Diagramatics>


    <hr>
    <h1>Applying the same style multiple time</h1>
    Let's say you want to draw multiple objects with the same style.
    You can try to apply the style to each object, but that's tedious.
    And if you want to change the style, you have to manually change it for each object.
    <Diagramatics {width} {height}>
        {`
        let p3 = regular_polygon(3,10).position(V2(-10,10))
            .fill('lightblue').stroke('blue').strokewidth(2).strokedasharray([5]);
        let p4 = regular_polygon(4,10).position(V2(-10,-10))
            .fill('lightblue').stroke('blue').strokewidth(2).strokedasharray([5]);
        let p5 = regular_polygon(5,10).position(V2(10,10))
            .fill('lightblue').stroke('blue').strokewidth(2).strokedasharray([5]);
        let p6 = regular_polygon(6,10).position(V2(10,-10))
            .fill('lightblue').stroke('blue').strokewidth(2).strokedasharray([5]);

        draw(p3,p4,p5,p6);
        `}
    </Diagramatics>

    To make it simpler, you can use <code>Diagram.apply</code> and passing it a function that will style the diagram.
    <Diagramatics title="Diagram.apply" subtitle="(func : (d : Diagram) => Diagram) : Diagram" {width} {height}>
        {`
        let style = (d) => d.fill('lightblue').stroke('blue').strokewidth(2).strokedasharray([5]);

        let p3 = regular_polygon(3,10).position(V2(-10, 10)).apply(style);
        let p4 = regular_polygon(4,10).position(V2(-10,-10)).apply(style);
        let p5 = regular_polygon(5,10).position(V2( 10, 10)).apply(style);
        let p6 = regular_polygon(6,10).position(V2( 10,-10)).apply(style);

        draw(p3,p4,p5,p6);
        `}
    </Diagramatics>

    You can also combine the diagram first, and style the parent Diagram. This will apply the styles to all the children.
    <Diagramatics title="diagram_combine" subtitle="(...diagrams : Diagram[]) : Diagram" {width} {height}>
        {`
        let p3 = regular_polygon(3,10).position(V2(-10, 10));
        let p4 = regular_polygon(4,10).position(V2(-10,-10));
        let p5 = regular_polygon(5,10).position(V2( 10, 10));
        let p6 = regular_polygon(6,10).position(V2( 10,-10));
        let ps = diagram_combine(p3,p4,p5,p6)
                    .fill('lightblue').stroke('blue').strokewidth(2).strokedasharray([5]);

        draw(ps);
        `}
    </Diagramatics>

    Or you can change the default style of the diagram by changing the values is <code>default_diagram_style</code>.
    <Diagramatics title="default_diagram_style" {width} {height}>
        {`
        default_diagram_style["fill"]             = 'lightblue';
        default_diagram_style["stroke"]           = 'blue';
        default_diagram_style["stroke-width"]     = 2;
        default_diagram_style["stroke-dasharray"] = [5];

        let p3 = regular_polygon(3,10).position(V2(-10, 10));
        let p4 = regular_polygon(4,10).position(V2(-10,-10));
        let p5 = regular_polygon(5,10).position(V2( 10, 10));
        let p6 = regular_polygon(6,10).position(V2( 10,-10));

        draw(p3,p4,p5,p6);
        `}
    </Diagramatics>

    <!-- for (let s in default_diagram_style)  -->
    <!-- for (let s in default_text_diagram_style) -->
    <!-- for (let s in default_textdata) -->
    This also works for <code>default_text_diagram_style</code> and <code>default_textdata</code>.
    <Diagramatics title="default_text_diagram_style" {width} height={10}>
        {`
        // "fill"             : string,
        // "stroke"           : string,
        // "stroke-width"     : number,
        // "stroke-linecap"   : string,
        // "stroke-dasharray" : number[],
        // "stroke-linejoin"  : string,
        // "vector-effect"    : string,
        // "opacity"          : number,
        `}
    </Diagramatics>
    <!-- "text"             : "", -->
    <!-- "font-family"      : "Latin Modern Math, sans-serif", -->
    <!-- "font-size"        : "18", -->
    <!-- "font-weight"      : "normal", -->
    <!-- "text-anchor"      : "middle", -->
    <!-- "dominant-baseline": "middle", -->
    <!-- "angle"            : "0", -->
    <!-- "font-style"       : "normal", -->
    <!-- "font-scale"       : "auto", -->
    <Diagramatics title="default_textdata" {width} height={10}>
        {`
        // "text"              : string,
        // "font-family"       : string,
        // "font-size"         : number,
        // "font-weight"       : string,
        // "text-anchor"       : string,
        // "dominant-baseline" : string,
        // "angle"             : number,
        // "font-style"        : string,
        // "font-scale"        : number,
        `}
    </Diagramatics>

    You can reset the default style by calling <code>reset_default_styles()</code>.

</div>
