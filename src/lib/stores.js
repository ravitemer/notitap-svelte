import { writable } from 'svelte/store';

//TODO:change this
export const slashVisible = writable(false);
export const slashItems = writable([]);
export const slashLocation = writable({ x: 0, y: 0, height: 0 });
export const slashProps = writable({ editor: null, range: null });
export const desktopMenu = writable(true);
export const components = writable([]);
export const editorWidth = writable(0);
export const jsonContent = writable("");
