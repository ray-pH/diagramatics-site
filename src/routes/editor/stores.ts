import { writable } from 'svelte/store';

export const code_str    = writable<string>('');
export const eval_status = writable<'success'|'error'|'waiting'>('waiting');
export const eval_msg    = writable<string>('');

// can only be set by DiagramEditor::load_code()
// and is used to communicate to the Editor that the code has been loaded
export const code_loaded_str = writable<string>('');
