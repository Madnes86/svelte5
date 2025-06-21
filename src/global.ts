import { writable } from 'svelte/store';

export const globalCounter = writable(0);
export const store = writable(1);