import { get } from "svelte/store";
import { listingTabIndex } from "./store";

export class ListingTabServices {
    tabs = [
        {
            id: 0,
            label: "Todos",
            active: true,
            fn: (listing) => listing,
        },
        {
            id: 1,
            label: "Escolhidos",
            active: false,
            fn: (listing) =>
            listing.filter((product) => {
                if (product.purchased === true) return true;
            }),
        },
        {
            id: 2,
            label: "Restantes",
            active: false,
            fn: (listing) =>
            listing.filter((product) => {
                if (product.purchased === false) return true;
            }),
        },
        {
            id: 3,
            label: "%",
            active: false,
            fn: (listing) => listing,
        }
    ];

    setTab = (id) => {
        this.tabs.map((tab) => {
            if (tab.label === id) listingTabIndex.set(tab.id);

            tab.active = tab.id === id;
        });
    };

    isTab = (id) => this.tabs[id].active;
    
    getTab = () => this.tabs.filter(t => t.id === get(listingTabIndex));

    filterTab(listing) {
        return this.tabs.find((tab) => tab.active).fn(listing);
    }
}
