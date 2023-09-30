<script lang="ts">
    import { basicSetup } from "codemirror"
    import { espresso } from 'thememirror';
    import { EditorView, keymap } from "@codemirror/view"
    import { indentWithTab } from "@codemirror/commands"
    import { javascript } from "@codemirror/lang-javascript"
    import { onMount } from "svelte";
    import { code_str, eval_status } from './stores';
    import { browser } from "$app/environment";

    export let initial_str : string = "";

    let status : 'success' | 'waiting' | 'error' = 'waiting';
    eval_status.subscribe((st) => { status = st; });

    const status_str = {
        'success' : 'success',
        'waiting' : '...',
        'error' : 'error',
    };

    function extension_update_listener() { 
        return EditorView.updateListener.of( (v) => {
            if (v.docChanged) code_str.set(v.state.doc.toString());
        });
    };

    let extension_fixed_height = EditorView.theme({
        "&": {
            height: "300px",
            borderRadius: "15px",
        },
        "&.cm-editor.cm-focused": {
            outline: "none"
        },
        ".cm-scroller": {overflow: "auto"}
    });

    function load_editor_code(){
        // first check if there is code in url
        // if not, then check if there is code in localstorage
        // if not, then use initial_str
        
        //let url_code = load_code_from_url();
        //if (url_code != '') return url_code;

        let code : string | null = '';
        if (browser) code = localStorage.getItem('editorCode');
        return code ? code : initial_str;
    }

    let editor_div : HTMLDivElement;
    onMount (() => {
        let init_doc = load_editor_code();

        let editor = new EditorView({
            doc: init_doc,
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

        // init diagram
        code_str.set(init_doc);
    });
</script>

<div class="editor-container">
    <div class="editor-header">
        <span id="editor-header-text">Editor</span>
    </div>
    <div id="editor" bind:this={editor_div}>
    </div>
    <div class="editor-footer">
        <span id="editor-footer-info" class={status}>{status_str[status]}</span>
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
