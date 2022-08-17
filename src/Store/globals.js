import { writable } from 'svelte/store';

// If the value is don't undefined, a Listing has focus
export const listingIndex = writable(undefined);

const listsStorage = localStorage.lists;
const listsStorageArray = JSON.parse(listsStorage || "{}");
const hasListsStorage = Array.isArray(listsStorageArray);

export const lists = writable(hasListsStorage ? listsStorageArray : []);

lists.subscribe(value => localStorage.lists = JSON.stringify(value));

// Instructions & Tips
const hasHelpStorage = localStorage.hasHelp;
const hasHelpObject = JSON.parse(hasHelpStorage || "[]");
const hasHasHelpStorage = (typeof hasHelpObject.tips == "boolean" && typeof hasHelpObject.instructions == "boolean");

export const hasHelp = writable(hasHasHelpStorage ? hasHelpObject : {
    tips: true,
    instructions: true,
});

hasHelp.subscribe(value => localStorage.hasHelp = JSON.stringify(value));

// Text Mode
const textModeStorage = localStorage.textMode;
const hasTextModeStorage = typeof textModeStorage !== "undefined";

export const textMode = writable(hasTextModeStorage ? textModeStorage : false);

// textMode.subscribe(value => localStorage.textMode = value);