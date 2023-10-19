<svelte:head>
    <title>Plot - Guide : Diagramatics</title>
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
    var height2 = 150;
</script>

<Header />
<div class="guides-container">
    <Navigation page="plot"/>

    <pre style="
        background: #f8f8f8;
        border-radius: 10px;
        margin:10px;
        padding: 20px;
        width: fit-content;
        ">
    xrange    : [number, number],
    yrange    : [number, number],
    bbox?     : [Vector2, Vector2],
    xticks?   : number[],
    yticks?   : number[],
    n_sample? : number,
    headsize  : number,
    </pre>

    <h1>Plotting</h1>

    <Diagramatics title="plotv" subtitle="(data : Vector2[], axes_options? : Partial<axes_options>) : Diagram" {width} height={height2}>
        {`
        // plot a data in the form of Vector2[]

        let data = [V2(-1,1), V2(0,0), V2(1,1), V2(2,2)]
        let p = plotv(data);
        draw(p);
        `}
    </Diagramatics>

    <Diagramatics title="plot" subtitle="(xdata : number[], ydata : number[], axes_options? : Partial<axes_options>) : Diagram" {width} height={height2}>
        {`
        // plot a data in the form of xdata and ydata

        let xdata = [-1, 0, 1, 2];
        let ydata = [1, 0, 1, 2];
        let p = plot(xdata, ydata);
        draw(p);
        `}
    </Diagramatics>

    <Diagramatics title="plotf" subtitle="(f : (x:number)=>number, axes_options? : Partial<axes_options>) : Diagram" {width} height={height2}>
        {`
        // plot a function

        let f = (x) => Math.sin(x);
        let p = plotf(f);
        draw(p);
        `}
    </Diagramatics>
    <Diagramatics {width} height={height2}>
        {`
        // you can change the domain and range by passing in \`axes_options\`

        let axopt = {
            xrange : [-2*Math.PI, 2*Math.PI],
        }
        let f = (x) => Math.sin(x);
        let p = plotf(f, axopt);
        draw(p);
        `}
    </Diagramatics>
    <Diagramatics {width} height={height2}>
        {`
        // you can change number of sample points by passing in \`axes_options\`

        let axopt = {
            xrange   : [-2*Math.PI, 2*Math.PI],
            n_sample : 10,
        }
        let f = (x) => Math.sin(x);
        let p = plotf(f, axopt);
        draw(p);
        `}
    </Diagramatics>

    <hr>
    <h1>Axes</h1>
    <!-- axes_empty, axes_corner_empty, -->
    <!-- xyaxes, xygrid, xycorneraxes, -->
    <Diagramatics title="axes_empty" subtitle="(axes_options? : Partial<axes_options>) : Diagram" {width} {height}>
        {`
        let ax = axes_empty();
        draw(ax);
        `}
    </Diagramatics>

    <Diagramatics title="axes_corner_empty" subtitle="(axes_options? : Partial<axes_options>) : Diagram" {width} {height}>
        {`
        let ax = axes_corner_empty();
        draw(ax);
        `}
    </Diagramatics>

    <Diagramatics title="xyaxes" subtitle="(axes_options? : Partial<axes_options>) : Diagram" {width} {height}>
        {`
        let ax = xyaxes().fontsize(12);
        draw(ax);
        `}
    </Diagramatics>

    <Diagramatics title="xycorneraxes" subtitle="(axes_options? : Partial<axes_options>) : Diagram" {width} {height}>
        {`
        let ax = xycorneraxes();
        draw(ax);
        `}
    </Diagramatics>

    <Diagramatics title="xygrid" subtitle="(axes_options? : Partial<axes_options>) : Diagram" {width} {height}>
        {`
        let ax = xygrid();
        draw(ax);
        `}
    </Diagramatics>

    <Diagramatics title="xtickmark" 
      subtitle="(x : number, y : number, str : string, axes_options? : Partial<axes_options>) : Diagram" {width} {height}>
        {`
        let ax = axes_empty();
        let ta = xtickmark(0.5, 0, 'a');
        let tb = xtickmark(1.5, 0, 'b');
        let tc = xtickmark(-1,  0, 'c', {ticksize: 1});
        draw(ax, ta, tb, tc);
        `}
    </Diagramatics>
    <Diagramatics title="ytickmark" 
      subtitle="(y : number, x : number, str : string, axes_options? : Partial<axes_options>) : Diagram" {width} {height}>
        {`
        let ax = axes_empty();
        let ta = ytickmark(0.5, 0, 'a');
        let tb = ytickmark(1.5, 0, 'b');
        let tc = ytickmark(-1,  0, 'c', {ticksize: 1});
        draw(ax, ta, tb, tc);
        `}
    </Diagramatics>

    <hr>
    <h1>Size and Position</h1>
    By default, the size of the axes will be equal to the <code>xrange</code> and <code>yrange</code> 
    defined in the <code>axes_options</code>
    <Diagramatics title="" {width} height={height2}>
        {`
        let axopt = {
            xrange : [-20, 20],
            yrange : [-2, 4],
        }
        let ax = xyaxes(axopt).fontsize(12);
        draw(ax);
        `}
    </Diagramatics>

    We can change the size of the axes by passing in <code>bbox</code> in the <code>axes_options</code>.<br><br>
    But, if you want to put something in some specific position, the coordinate system will be different.
    For example, if we try to put a circle in (5,1), this is what we get.
    <Diagramatics title="" {width} {height}>
        {`
        let axopt = {
            xrange : [-20, 20],
            yrange : [-2, 5],
            bbox   : [V2(0,0), V2(10,10)],
            headsize : 0.2,
            ticksize : 0.4,
        }
        let ax = xyaxes(axopt).fontsize(12);
        let p  = V2(5,1);
        let c  = circle(0.2).position(p).fill('blue');
        draw(ax, c);
        `}
    </Diagramatics>

    What we can do to fix that is by using <code>axes_transform()</code>
    <Diagramatics title="axes_transform" subtitle="(opt : axes_options) : \(v \: Vector2\) => Vector2"{width} {height}>
        {`
        let axopt = {
            xrange : [-20, 20],
            yrange : [-2, 5],
            bbox   : [V2(0,0), V2(10,10)],
            headsize : 0.2,
            ticksize : 0.4,
        }
        let transf = axes_transform(axopt); 
        // transf is a function (v : Vector2) => Vector2

        let ax = xyaxes(axopt).fontsize(12);
        let p  = transf(V2(5,1)); // equivalent to \`V2(5,1).apply(transf)\`;
        let c  = circle(0.2).position(p).fill('blue');
        draw(ax, c);
        `}
    </Diagramatics>


    <hr>
    <h1>Styling</h1>
    The plotting functions just return a curve, so you can style it like any other curve.
    <Diagramatics {width} {height}>
        {`
        // you can change the domain and range by passing in \`axes_options\`

        let axopt = {
            xrange : [-Math.PI, Math.PI],
            headsize : 0.1,
        }

        let ax = axes_empty(axopt);
        let f = (x) => Math.sin(x);
        let g = (x) => x*x - 1.5;

        let fplot = plotf(f, axopt).stroke('red').strokewidth(2);
        let gplot = plotf(g, axopt).stroke('blue').strokewidth(2);
        draw(ax, fplot, gplot);
        `}
    </Diagramatics>

</div>

