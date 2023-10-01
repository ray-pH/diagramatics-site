<script lang="ts">
    export let page : string = "";
    var pages : string[] = [
        'home', 'shapes', 'transformation', 'style', 'points'
    ];
</script>

<div class="navigation">
    <span class="navigation-title">Guides</span>
    {#each pages as pagename}
        {#if pagename == page}
            <a class="navigation-link current-page" href='/guides/{pagename}/'>{pagename}</a>
        {:else}
            <a class="navigation-link" href='/guides/{pagename}/'>{pagename}</a>
        {/if}
    {/each}
</div>

<style>
.navigation{
    display: flex;
    gap: 5px;
    align-items: center;
    margin: 10px 0px;
}
.navigation-title{
    font-weight: 600;
    font-size: 1.2em;
    color: #aaa
}
.navigation-link{
    background: #1f77b4;
    color: white;
    text-decoration: none;
    border-radius: 15px;
    padding: 8px 10px;
}
.navigation-link:hover{
    background: #aec7e8;
    color: black;
}
.navigation-link.current-page{
    background: #e0e0e0;
    color: black;
    cursor: default;
}
</style>
