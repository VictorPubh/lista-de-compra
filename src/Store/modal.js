import { get, writable } from 'svelte/store';

export const openModal = writable(false);

const _optsModal = {
    title: undefined,
    message: undefined,
    textConfirm: undefined,
    textCancel: undefined,
    textBack: undefined,
    fn: {
        overlay: () => {},
        confirm: () => {},
        cancel: () => {},
        back: () => {}
    }
};

export const optsModal = writable(_optsModal);

openModal.subscribe(open => optsModal.set(!open ? _optsModal : get(optsModal)));
optsModal.subscribe(opts => openModal.set((opts.title && opts.textConfirm && opts.textCancel)));