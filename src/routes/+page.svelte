<svelte:head>
    <title>Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
</svelte:head>

<script>
    import Header from './Header.svelte'
    import Diagramatics from './Diagramatics.svelte'
    import 'diagramatics/css/diagramatics.css'
    import { base } from '$app/paths';
</script>

<Header/>
<div class="main">
    <h1 class="title">Diagramatics</h1>
    <img src="{base}/assets/diagramatics_logo.png" alt="Diagramatics Logo" id="main_logo"/>
    <div class="text-container">
        <em>Diagramatics</em> is a JavaScript/TypeScript library that makes it easy to create <em>interactive diagrams</em>, especially math and physics diagrams. It provides a simple high-level API for creating and manipulating diagram elements and interactive controls.
    </div>

    <div class="text-container"><hr></div>

    <h2 class="title">Examples</h2>
    <div class="text-container center">
        <Diagramatics>
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
        <Diagramatics>
            {`
            let big_rect   = square(150).fill('lightblue').stroke('none');
            let small_rect = square(20).fill('blue').rotate(Math.PI/4);
            let r1 = small_rect.position(big_rect.get_anchor('top-left'));
            let r2 = small_rect.position(big_rect.get_anchor('top-right'));
            let r3 = small_rect.position(big_rect.get_anchor('bottom-left'));
            let r4 = small_rect.position(big_rect.get_anchor('bottom-right'));
            draw(big_rect, r1, r2, r3, r4);
            `}
        </Diagramatics><br>
        <a href="{base}/examples/">More examples</a>
    </div>

    <div class="text-container"><hr></div>
    <h2 class="title">Usage</h2>
    <div class="text-container center">
        You can try online in the <a href="{base}/editor/">editor</a><br>
        Or see the <a href="{base}/guides/usage/">Guides</a> for more details.
    </div>

    <div class="text-container"><hr></div>

</div>



<!-- 'blue'        : '#1f77b4', -->
<!-- 'lightblue'   : '#aec7e8', -->
<style>
    .title {
        font-size: 3rem;
    }
    .title::first-letter{
        background-color: #aec7e8;
        padding-left: 0.2em;
        border-radius: 0.3em 0 0.3em 0;
    }
    #main_logo {
        margin-top: -3.4rem;
    }
    .main {
        font-family: 'Ubuntu', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .text-container{
        font-size: 1.2rem;
        width: 60%;
    }
    .center {
        align-items: center;
        text-align: center;
    }
    a, a:visited {
        color: #1f77b4;
    }
    em {
        color: #1f77b4;
        font-style: normal;
        font-weight: bold;
    }
    hr{
        width: 95%;
        border-top: 1px dashed rgba(0,0,0,0.3);
        margin: 5rem 0;
    }
</style>
