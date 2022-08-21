import { getStorageOr } from "../Utils/storageOperators";
import { writable } from "svelte/store";

const isPremiumStorage = getStorageOr("isPremium", true);
export const isPremium = writable(isPremiumStorage);