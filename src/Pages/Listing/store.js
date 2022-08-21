import { writable } from "svelte/store";

export const quantityInput = writable(undefined);
export const productInput = writable(undefined);
export const valueInput = writable(undefined);

export const listingFocused = writable({
    id: undefined,
    limit: undefined,
    name: undefined,
    content: [{
        id: undefined,
        name: undefined,
        quantity: undefined,
        value: 0,
        purchaset: 0
    }]
});