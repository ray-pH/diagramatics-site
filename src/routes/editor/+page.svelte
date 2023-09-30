<svelte:head>
    <title>Editor : Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/fonts/ubuntu.css" rel="stylesheet">
    <link href="/fonts/lm-math.css" rel="stylesheet">
</svelte:head>

<script lang="ts">
    import Header from '../Header.svelte'
    import Editor from './Editor.svelte'
    import DiagramEditor from './DiagramEditor.svelte';
    import 'diagramatics/css/diagramatics.css'

    let initial_str = "let sq = square(10).fill('blue'); draw(sq);";
</script>

<Header />

<div class="container">
    <DiagramEditor/>
    <Editor {initial_str}/>
</div>
