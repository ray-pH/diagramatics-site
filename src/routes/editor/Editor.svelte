<script lang="ts">
    import {basicSetup} from "codemirror"
    import {espresso} from 'thememirror';
    import {EditorView, keymap} from "@codemirror/view"
    import {indentWithTab} from "@codemirror/commands"
    import {javascript} from "@codemirror/lang-javascript"
    import {onMount} from "svelte";


    import { sss } from './stores';

    export let initial_str : string = "";

    function extension_update_listener() { 
        return EditorView.updateListener.of( (v) => {
            if (v.docChanged) sss.set(v.state.doc.toString());
        });
    }

    let extension_fixed_height = EditorView.theme({
        "&": {
            height: "300px",
            borderRadius: "15px",
        },
        "&.cm-editor.cm-focused": {
            outline: "none"
        },
        ".cm-scroller": {overflow: "auto"}
    })

    let editor_div : HTMLDivElement;
    onMount (() => {
        let editor = new EditorView({
            doc: initial_str,
            extensions: [
                basicSetup, 
                javascript(),
                espresso,
                keymap.of([indentWithTab]),
                extension_update_listener(),
                extension_fixed_height,
            ],
            parent: editor_div,
        })
    })
</script>

<div class="editor-container">
    <div class="editor-header">
        <span id="editor-header-text">Editor</span>
    </div>
    <div id="editor" bind:this={editor_div}>
    </div>
    <div class="editor-footer">
        <span id="editor-footer-info" class="error">success</span>
        <div id="editor-footer-desc"></div>
    </div>
</div>

<style>
.editor-container{
    font-family: Ubuntu, sans-serif;
    padding: 10px;
    background-color: #DDD;
    border-radius: 15px;
}
.editor-header{
    font-weight: 600;
    margin: 0px 5px 5px 5px;
}
.editor-footer{
    margin: 10px 5px 0px 0px;
}
#editor-footer-info{
    padding : 5px 10px;
    border-radius: 10px;
}
#editor-footer-info.success{
    background-color: #aec7e8;
}
#editor-footer-info.waiting{
    background-color: #c7c7c7;
}
#editor-footer-info.error{
    background-color: #ff9896;
}
#editor-footer-desc{
    display: inline-block;
    font-size: 0.8em;
    /* margin-top: 10px; */
    margin-left: 10px;
}


</style>
