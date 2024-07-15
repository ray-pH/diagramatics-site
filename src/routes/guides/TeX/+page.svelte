<svelte:head>
    <title>TeX - Guide : Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
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
    
    const hidden_tex_code = `
    // let handletex = (str, conf) => {
    //     return MathJax.tex2svg(str, conf).innerHTML;
    // };
    // let draw_tex = (...diagrams) => {
    //     draw_to_svg_element(diagram_svg, diagram_combine(...diagrams));
    //     handle_tex_in_svg(diagram_svg, handletex);
    // };
        `
</script>

<Header />
<div class="guides-container">

    <Navigation page="TeX"/>
    
    <h1>Rendering TeX expression</h1>
    
    <a href="https://jsitor.com/DJqa7rQPlW">(JSitor example)</a>.
    
    <p>
    To make the system more flexible and to make Diagramatics not dependent on any specific TeX rendering library,
    Diagramatics provides a way to render TeX expressions using whatever library the user wants.
    </p>
    
    <p>
    You just need to provide a function that takes a TeX string and returns the rendered SVG string.
    </p>
    
    <Diagramatics title="handle_tex_in_svg" subtitle="(svg : SVGElement, texhandler : (texstr : string\, config : any) => string)" {width} height={10}>
        {`
        // \`svg\` is the SVG element where the TeX expressions are to be rendered.
        // \`texhandler\` is a function that takes a TeX string and returns the rendered SVG string.
        `}
    </Diagramatics>
    
    <p>
    One example of texhandler is using MathJax.
    </p>
    <p>
    You can call the <code>handle_tex_in_svg</code> function separately, or you can call it inside the <code>draw</code> function.
    </p>
    
    <Diagramatics title="draw_tex" {width} height={10}>
        {`
        // you can load MathJax from CDN
        // If you don't want to load the whole MathJax, you can load only the tex-svg.js module
        // <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"><`+`/script>
        
        let handletex = (str, conf) => {
            return MathJax.tex2svg(str, conf).innerHTML;
        };
        let draw_tex = (...diagrams) => {
            draw_to_svg_element(diagram_svg, diagram_combine(...diagrams));
            handle_tex_in_svg(diagram_svg, handletex);
        };
        `}
    </Diagramatics>
    
    Diagramatics will recognize any text object in the form "$...$" (or "$$...$$" for display style) as a <b>TeX object</b>.
    <br>
    <br>
    
    <Diagramatics {width} {height} hidden_code={hidden_tex_code}>
        {`
        let sq = square(20);
        let tx = text('$$\\\\nabla^2\\\\phi = 0$$').fontsize(24);
        draw_tex(sq, tx);
        `}
    </Diagramatics>

</div>
