<script lang="ts">
    import { base } from '$app/paths';
</script>

<div class="header">
    <img src="{base}/assets/diagramatics_logo.png" class="header-left" alt="diagramatics logo">
    <a class="header-left"  href="{base}/" id="project-title">Diagramatics</a>
    <a class="header-right" href="https://github.com/ray-pH/diagramatics">GitHub</a>
    <a class="header-right" href="https://photon-ray.xyz/diagramatics/">Docs</a>
    <a class="header-right" href="{base}/guides/usage/">Guides</a>
    <a class="header-right" href="{base}/editor/">Editor</a>
    <a class="header-right" href="{base}/examples/">Examples</a>
    <!-- <span class="header-right">⋅</span> -->
</div>


<style>
    /* 'blue'        : '#1f77b4', */
    /* 'lightblue'   : '#aec7e8', */
    /* 'orange'      : '#ff7f0e', */
    /* 'lightorange' : '#ffbb78', */
    /* 'green'       : '#2ca02c', */
    /* 'lightgreen'  : '#98df8a', */
    /* 'red'         : '#d62728', */
    /* 'lightred'    : '#ff9896', */
    /* 'purple'      : '#9467bd', */
    /* 'lightpurple' : '#c5b0d5', */
    /* 'brown'       : '#8c564b', */
    /* 'lightbrown'  : '#c49c94', */
    /* 'grey'        : '#7f7f7f', */
    /* 'lightgrey'   : '#c7c7c7', */

    .header {
        font-family: Ubuntu;
    }

    .header>img {
        height: 60px;
        vertical-align: top;
        margin-right: 10px;
        background: white;
        border-radius: 40%;
    }

    .header {
        padding: 10px;
        height: 25px;
        vertical-align: top;
        margin-bottom: 30px;
        font-weight: 500;
        border-bottom: solid black 1px;
    }

    #project-title::first-letter {
        background-color: #aec7e8;
        padding-left: 0.2em;
        padding-top: 0.1em;
        padding-bottom: 0.1em;
        border-radius: 0.3em 0 0.3em 0;
    }

    .header>span{
        padding: 5px 10px;
    }
    .header>a {
        text-decoration: none;
        color: black;
        padding: 5px 10px;
        border-radius: 10px;
    }
    .header>a:hover {
        background-color: #aec7e8;
    }
    .header-left {
        float: left;
    }
    .header-right {
        float: right;
    }
</style>

