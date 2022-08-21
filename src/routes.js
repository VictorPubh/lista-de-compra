import Home from "./Pages/Home/index.svelte";
import Listing from "./Pages/Listing/index.svelte";
import Written from "./Pages/Written/index.svelte";

import { isPremium } from "./Store/router";
import { get } from "svelte/store";

import Layout from "./Pages/Layout.svelte";
import LayoutListing from "./Pages/LayoutListing.svelte";

export const routes = [
    {
        name: "/",
        component: Home,
        layout: Layout
    },
    {
        name: "listing/:id",
        component: Listing,
        layout: LayoutListing
    },
    {
        name: "edit/:id",
        component: Written,
        layout: LayoutListing,
        onlyIf: {
            guard: get(isPremium),
            redirect: '/'
        }
    },
    {
        name: "404",
        redirectTo: "/"
    }
];