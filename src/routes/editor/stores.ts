import { writable } from 'svelte/store';

export const code_str    = writable<string>('');
export const eval_status = writable<'success'|'error'|'waiting'>('waiting');
