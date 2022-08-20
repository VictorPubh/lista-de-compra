import { getStorageOr } from '../Utils/getStorageOr';
import { writable } from 'svelte/store';

// If the value is don't undefined, a Listing has focus
export const listingIndex = writable(undefined);

const listsStorage = localStorage.lists;
const listsStorageArray = JSON.parse(listsStorage || "{}");
const hasListsStorage = Array.isArray(listsStorageArray);

export const lists = writable(hasListsStorage ? listsStorageArray : []);
lists.subscribe(value => localStorage.lists = JSON.stringify(value));

// Text Mode (Boolean)
const textModeStorage = getStorageOr("textMode", false);
export const textMode = writable(textModeStorage);

// Tour: Into & Guideline
const tourGuideline = {
    listing:     getStorageOr("listingTour", true),
    listingItem: getStorageOr("listingItemTour", true),
    textMode:    getStorageOr("textModeTour", "guideline")
}

// Listing Tour
export const listingTour = writable(tourGuideline.listing);
listingTour.subscribe(value => localStorage.listingTour = value);

// Listing Item Tour
export const listingItemTour = writable(tourGuideline.listingItem);
listingItemTour.subscribe(value => localStorage.listingItemTour = value);

// Text Mode Tour
export const textModeTour = writable(tourGuideline.textMode);
textModeTour.subscribe(value => localStorage.textModeTour = value);