<svelte:head>
    <title>Example : Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!---->
    <!-- <link href="../assets/fonts/ubuntu.css" rel="stylesheet"> -->
    <!-- <link href="../assets/fonts/lm-math.css" rel="stylesheet"> -->
    <!---->
    <!-- <link href="./style.css" rel="stylesheet"> -->
    <!-- <link href="../style.css" rel="stylesheet"> -->
    <!-- <link href="../lib/diagramatics.css" rel="stylesheet"> -->
    <!-- <link href="./lib/lightfair.css" rel="stylesheet"> -->

    <!-- <script src="./index.js" type="module"></script> -->
</svelte:head>

<script>
    import Header from '../Header.svelte'
    import Diagramatics from '../Diagramatics.svelte'
    import 'diagramatics/css/diagramatics.css'
</script>
<style>
    hr{
        width: 95%;
        border-top: 1px dashed rgba(0,0,0,0.3);
    }
</style>

<Header />
<Diagramatics title="Simple Squares">
    {`
    let big_rect   = square(150).fill('lightblue').stroke('none');
    let small_rect = square(20).fill('blue').rotate(Math.PI/4);
    let r1 = small_rect.position(big_rect.get_anchor('top-left'));
    let r2 = small_rect.position(big_rect.get_anchor('top-right'));
    let r3 = small_rect.position(big_rect.get_anchor('bottom-left'));
    let r4 = small_rect.position(big_rect.get_anchor('bottom-right'));
    draw(big_rect, r1, r2, r3, r4);
    `}
</Diagramatics>
<hr>

<Diagramatics title="Interactive Slider">
    {`
    int.draw_function = (inp) => {
        let x = inp['x'];

        let big_circ   = circle(50);
        let small_rect = square(20).fill('blue').translate(V2(x,0));
        draw(big_circ, small_rect);
    };

    int.slider('x', -50, 50, 0);
    int.draw();
    `}
</Diagramatics>
<hr>

<Diagramatics title="Plotting Function">
    {`
    let opt = {
        xrange : [-1.5, 4],
        yrange : [-1.5, 4],
    }
    let ax = xyaxes(opt);
    let f = x => x**2;
    let g = x => Math.sin(x);
    let graph_f = plotf(f, opt).stroke('red').strokewidth(2);
    let graph_g = plotf(g, opt).stroke('blue').strokewidth(2);
    draw(ax, graph_f, graph_g);
    `}
</Diagramatics>
<hr>


<Diagramatics title="Area Under Curve">
    {`
    let opt = {
        xrange : [-2, 2],
        yrange : [-1, 2],
    }
    let axes = axes_empty(opt);
    let f = x => Math.cos(x);
    let graph_f = plotf(f, opt).stroke('blue').strokewidth(3);

    let a = -0.5;
    let b = 1.0;

    let under_f = under_curvef(f, a, b, opt).fill('blue').opacity(0.5).stroke('none');
    let pa = circle(0.05).position(V2(a, f(a)))
      .fill('blue').stroke('none');
    let pb = circle(0.05).position(V2(b, f(b)))
    .fill('blue').stroke('none');

    let ticka = xtickmark(a, 'a');
    let tickb = xtickmark(b, 'b');
    let labela = textvar('f(a)').move_origin_text('bottom-right').position(V2(a, f(a)));
    let labelb = textvar('f(b)').move_origin_text('bottom-left').position(V2(b, f(b)));

    let labels = labela.combine(labelb).translate(V2(0, 0.1)).fill('blue');
    let texts = diagram_combine(ticka, tickb, labels, pa, pb);

    draw(axes, under_f, graph_f, texts);
    `}
</Diagramatics>
<hr>


<Diagramatics title="Sierpiński triangle">
    {`
    int.draw_function = (inp) => {
        let n = inp['n'];

        let s0 = regular_polygon_side(3, 50)
            .position().fill('lightblue').stroke('none');
        let snext = (s) => diagram_combine(
            s,
            s.translate(V2(50,0)),
            s.translate(V2(25,50*Math.sqrt(3)/2)),
        ).scale(V2(0.5,0.5)).position().flatten();
        let sn = (n) => {
            if (n == 0) return s0;
            else return snext(sn(n-1));
        }
        let a = sn(n);
        draw(a);
    };

    int.slider('n', 0, 4, 1, 1);
    int.draw();
    `}
</Diagramatics>
<hr>


<Diagramatics title="Free Body Diagram">
    {`
    default_diagram_style['stroke-width'] = 2;
    default_textdata['font-size'] = 21;

    let angle = from_degree(30);
    let horizontal = line(V2(0,0), V2(8,0))
        .stroke('gray').strokedasharray([5,5]);
    let plane = line(V2(0,0), Vdir(angle).scale(10)).stroke('gray');

    let sq = square(4).move_origin('bottom-center')
        .position(plane.parametric_point(0.5)).rotate(angle)
        .fill('lightblue').stroke('none');
    let csq = sq.get_anchor('center-center');

    let arrow_head_size = 0.12;


    let vx = V2(1,0); let vy = V2(0,1); let vnx = V2(-1,0); let vny = V2(0,-1);
    let forces_annotation = diagram_combine(
        annotation.vector(vny.scale(3.5), 'Mg', V2(0.6,0.2), arrow_head_size)
            .position(csq),
        annotation.vector(Vdir(angle + Math.PI/2).scale(5), 'N', V2(0.6,0.2), arrow_head_size)
            .position(plane.parametric_point(0.6)),
        annotation.vector(Vdir(angle).scale(1.2), 'f', V2(0.0,-0.6), arrow_head_size)
            .position(plane.parametric_point(0.6)),
        annotation.vector(Vdir(angle).scale(2), 'F', V2(-0.5,-1.0), arrow_head_size)
            .move_origin(Vdir(angle).scale(2)).position(sq.parametric_point(0.5,0)),
    );
    let angle_annotation = annotation.angle([V2(1,0), V2(0,0), Vdir(angle)], '\\\\theta', 1, V2(0.5,0.1));

    draw (horizontal, sq, plane, forces_annotation, angle_annotation);
    `}
</Diagramatics>
<hr>


<Diagramatics title="Spring Oscillation">
    {`
    let x0 = 50;
    let amplitude = 25;
    let omega = 1;

    int.draw_function = (inp) => {
        let t = inp['t'];
        let x = x0 + amplitude * Math.cos(omega * t);
        
        let wall  = line(V2(0,0), V2(0,20)).strokewidth(2);
        let floor = line(V2(0,0), V2(100,0)).strokewidth(2);
        let box   = square(20).position(V2(x,10))
            .fill('lightblue').stroke('none');

        let p1 = wall.get_anchor('center-right');
        let p2 = box.get_anchor('center-left');
        let spring = mechanics.spring(p1,p2, 2, 10, 1.2);
        draw(box, wall, floor, spring)
    }

    let period = 2*Math.PI/omega;
    int.slider('t', 0, 2*period, period/4, 0.1, 2);
    int.draw();
    `}
</Diagramatics>
<hr>


<Diagramatics title="Diagramatics Logo">
    {`
    // base
    let base0 = circle(50);
    let base1 = circle(35).translate(V2(-40,-20));
    let base2 = circle(35).translate(V2( 40,-20));
    let base_raw  = diagram_combine(base0, base1, base2);

    let base_stroke = base_raw.stroke('black').strokewidth(4);
    let base_fill   = base_raw.fill('white').stroke('none');
    let base_dashed = base_raw.stroke('gray').strokewidth(2).strokedasharray([5,5]).opacity(0.5);
    let base = diagram_combine(base_stroke, base_fill, base_dashed);

    // beans
    let pivot = V2(0,0);
    let bean0 = circle(24).scale(V2(1,1.5))
        .move_origin('bottom-center').position().translate(V2(0,60))
        .strokewidth(2);
    let angle_sep = from_degree(36);
    let bean1 = bean0.rotate(angle_sep/2*3, pivot);
    let bean2 = bean0.rotate(angle_sep/2, pivot);
    let bean3 = bean2.hflip(0);
    let bean4 = bean1.hflip(0);

    let bean_arc_r1 = bean0.origin.length();
    let bean_arc1 = arc(bean_arc_r1, 3*angle_sep).rotate(angle_sep)
        .strokedasharray([5,5]).stroke('gray').opacity(0.5).strokewidth(2);
    let bean_arc_r2 = bean0.get_anchor('center-center').length();
    let bean_arc2 = arc(bean_arc_r2, 3*angle_sep).rotate(angle_sep)
        .strokedasharray([5,5]).stroke('gray').opacity(0.5).strokewidth(2);
    let bean_line_1 = line(V2(0,0), bean2.get_anchor('center-center'));
    let bean_line_2 = line(V2(0,0), bean3.get_anchor('center-center'));
    let bean_lines = bean_line_1.combine(bean_line_2)
        .strokedasharray([5,5]).stroke('gray').opacity(0.5).strokewidth(2);

    // accents
    let basebg1 = base1.translate(V2(10,-5));
    let basebg2 = base2.translate(V2(5,5));
    let basebg  = basebg1.combine(basebg2).fill('lightblue').stroke('none');
    let beanbg  = bean2.combine(bean3)
        .rotate(from_degree(-4), pivot).fill('lightblue').stroke('none');


    draw(
        beanbg, basebg,
        base, bean1, bean2, bean3, bean4,
        bean_arc1, bean_arc2, bean_lines,
    );
    `}
</Diagramatics>
<hr>


<!-- <Diagramatics title=""> -->
<!--     {` -->
<!--     `} -->
<!-- </Diagramatics> -->
<!-- <hr> -->
