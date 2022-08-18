import { writable } from 'svelte/store';

// If the value is don't undefined, a Listing has focus
export const listingIndex = writable(undefined);

const listsStorage = localStorage.lists;
const listsStorageArray = JSON.parse(listsStorage || "{}");
const hasListsStorage = Array.isArray(listsStorageArray);

export const lists = writable(hasListsStorage ? listsStorageArray : []);

lists.subscribe(value => localStorage.lists = JSON.stringify(value));

// Text Mode
const textModeStorage = localStorage.textMode;
const hasTextModeStorage = typeof textModeStorage !== "undefined";

export const textMode = writable(hasTextModeStorage ? textModeStorage : false);

// textMode.subscribe(value => localStorage.textMode = value);


// Tour: Into & Guideline

// Text Mode Tour
const textModeTourStorage = localStorage.textModeTour;
const hasTextModeTour = typeof textModeTourStorage !== "undefined";

export const textModeTour = writable(hasTextModeTour ? textModeTourStorage : "guideline");
textModeTour.subscribe(value => localStorage.textModeTour = value);

// Listing Tour
const listingTourStorage = localStorage.listingTour;
const hasListingTour = typeof listingTourStorage !== "undefined";

export const listingTour = writable(hasListingTour ? listingTourStorage : true);
listingTour.subscribe(value => localStorage.listingTour = value);

// Listing Item Tour
const listingItemTourStorage = localStorage.listingItemTour;
const hasListingItemTour = typeof listingItemTourStorage !== "undefined";

export const listingItemTour = writable(hasListingItemTour ? listingItemTourStorage : true);
listingItemTour.subscribe(value => localStorage.listingItemTour = value);