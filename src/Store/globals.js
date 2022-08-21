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
const writtenModeStorage = getStorageOr("writtenMode", false);
export const writtenMode = writable(writtenModeStorage);

// Tour: Into & Guideline
const tourGuideline = {
    listing:     getStorageOr("listingTour", true),
    listingItem: getStorageOr("listingItemTour", true),
    writtenMode:    getStorageOr("writtenModeTour", "guideline")
}

// Listing Tour
export const listingTour = writable(tourGuideline.listing);
listingTour.subscribe(value => localStorage.listingTour = value);

// Listing Item Tour
export const listingItemTour = writable(tourGuideline.listingItem);
listingItemTour.subscribe(value => localStorage.listingItemTour = value);

// Text Mode Tour
export const writtenModeTour = writable(tourGuideline.writtenMode);
writtenModeTour.subscribe(value => localStorage.writtenModeTour = value);