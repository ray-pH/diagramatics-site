<svelte:head>
    <title>Bar Chart - Guide : Diagramatics</title>
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
    <Navigation page="bar"/>

    <h1>Bar Options</h1>
    All the bar function can be configured by passing in <code>bar_options</code>, which is an object with the following properties:
    <pre style="
        background: #f8f8f8;
        border-radius: 10px;
        margin:10px;
        padding: 20px;
        width: fit-content;
        ">
    gap      : number,
    yrange?  : [number, number],
    yticks?  : number[],
    bbox?    : [Vector2, Vector2],
    ticksize : number,
    </pre>

    <h1>Plotting</h1>

    You can prepare the data in the form of <code>datavalues : number[]</code> and <code>datanames : string[]</code>.

    <Diagramatics title="bar.plot" subtitle="(datavalues : number[], bar_options? : Partial<bar_options>) : Diagram" {width} {height}>
        {`
        let data = [10, 8, 12, 15, 7];
        let b    = bar.plot(data);
        draw(b);
        `}
    </Diagramatics>

    <Diagramatics title="bar.xaxes" subtitle="(datanames : string[], bar_options? : Partial<bar_options>) : Diagram" {width} height={height2}>
        {`
        let datanames = ['a', 'b', 'c', 'x', 'ye'];
        let xx        = bar.xaxes(datanames);
        draw(xx);
        `}
    </Diagramatics>

    <!-- export function yaxes(datavalues : number[], bar_options : Partial<bar_options> = {}) : Diagram { -->
    <Diagramatics title="bar.yaxes" subtitle="(datavalues : number[], bar_options? : Partial<bar_options>) : Diagram" {width} height={height2}>
        {`
        let data = [10, 8, 12, 15, 7];
        let yy   = bar.yaxes(data);
        draw(yy);
        `}
    </Diagramatics>

    <h1>Plot the entire thing</h1>
    <Diagramatics {width} {height}>
        {`
        let baropt = {
            yrange : [0, 20],
        }
        let data = [10, 8, 12, 15, 7];
        let name = ['orange', 'apple', 'c', 'd', 'ye'];
        let b    = bar.plot(data, baropt).fill('lightblue');
        let xx   = bar.xaxes(name, baropt).move_origin_text('top-left').textangle(to_radian(30));
        let yy   = bar.yaxes(data, baropt);
        draw(b, xx, yy);
        `}
    </Diagramatics>


    <h1>Interact with standard plot</h1>

    bar data can be translated into <code>axes_options</code> by setting <code>xrange</code> into <code>[-1, data.length]</code>.

    <Diagramatics {width} {height}>
        {`
        let data = [10, 8, 12, 15, 7];
        let name = ['a', 'b', 'c', 'd', 'e'];

        let baropt = {
            yrange : [0, 20],
            bbox   : [V2(0,0), V2(10,10)],
        }
        let axopt = {
            xrange : [-1, data.length],
            yrange : baropt.yrange,
            bbox   : baropt.bbox,
        }
        let ax_f = axes_transform(axopt);

        let b    = bar.plot(data, baropt).fill('lightblue');
        let xx   = bar.xaxes(name, baropt);
        let yy   = bar.yaxes(data, baropt);

        let p    = plot(range(0, data.length), data, axopt).strokedasharray([5]);
        let c    = circle(0.2).fill('red').position(ax_f(V2(2, data[2])));

        draw(b, xx, yy, p, c);
        `}
    </Diagramatics>


</div>

