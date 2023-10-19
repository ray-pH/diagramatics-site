<script lang="ts">
    import { basicSetup } from "codemirror"
    import { espresso } from 'thememirror';
    import { EditorView, keymap } from "@codemirror/view"
    import { indentWithTab } from "@codemirror/commands"
    import { javascript } from "@codemirror/lang-javascript"
    import { onMount } from "svelte";
    import { code_str, eval_status, eval_msg } from './stores';
    import { browser } from "$app/environment";

    let initial_str = 
`let sq  = square(10);
let sq2 = square(4).fill('lightblue'); 
draw(sq, sq2);`;

    let status : 'success' | 'waiting' | 'error' = 'waiting';
    eval_status.subscribe((st) => { status = st; });
    let msg : string = '';
    eval_msg.subscribe((m) => { msg = m; });

    const status_str = {
        'success' : 'success',
        'waiting' : '...',
        'error' : 'error',
    };

    function extension_update_listener() { 
        return EditorView.updateListener.of( (v) => {
            if (v.docChanged) {
                code_str.set(v.state.doc.toString());
                if (browser) localStorage.setItem('editorCode',v.state.doc.toString());
            }
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

        // let editor = new EditorView({
        new EditorView({
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
        <span id="editor-header-info" class={status}>{status_str[status]}</span>
        <div id="editor-header-desc">
            {#if status == 'error'}{msg}{/if}
        </div>
    </div>
    <div id="editor" bind:this={editor_div}>
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
    /*margin: 0px 5px 10px 5px;*/
    height: 25px;
    align-items: center;
    align-content: center;
    vertical-align: middle;
}
#editor-header-text{
    font-weight: 600;
    padding-left: 10px;
    float: left;
}
.editor-footer{
    margin: 10px 5px 0px 0px;
}
#editor-header-info{
    font-size: 0.9em;
    padding : 1px 10px;
    border-radius: 8px;
    float: right;
}
#editor-header-info.success{
    background-color: #aec7e8;
}
#editor-header-info.waiting{
    background-color: #c7c7c7;
}
#editor-header-info.error{
    background-color: #ff9896;
}
#editor-header-desc{
    font-size: 0.8em;
    /* margin-top: 10px; */
    margin-right: 10px;
    float: right;
}


</style>
