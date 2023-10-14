<svelte:head>
    <title>Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
</svelte:head>

<script>
    import Header from './Header.svelte'
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
</div>

    <!-- 'blue'        : '#1f77b4', -->
    <!-- 'lightblue'   : '#aec7e8', -->
<style>
    .title {
        font-size: 3rem;
    }
    .title::first-letter{
        background-color: #aec7e8;
        padding-left: 0.5rem;
        border-radius: 0.5rem 0 0.5rem 0;
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
    em {
        color: #1f77b4;
        font-style: normal;
        font-weight: bold;
    }
</style>
