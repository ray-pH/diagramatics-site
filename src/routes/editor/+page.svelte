<svelte:head>
    <title>Editor : Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
</svelte:head>

<script lang="ts">
    import Header from '../Header.svelte'
    import Editor from './Editor.svelte'
    import DiagramEditor from './DiagramEditor.svelte';
    import 'diagramatics/css/diagramatics.css'
    import { base } from '$app/paths';
</script>

<Header />

<div class="container">
    <DiagramEditor/>
    <Editor/>
</div>
