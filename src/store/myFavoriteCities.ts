import { create } from "zustand";
import { LocalStorageToolkit } from "../utilities/localStorage";

interface MyFavoriteCitiesState {
    myFavoriteCities: { city: string; country: string }[];
    setMyFavoriteCities: (
        myFavoriteCities: { city: string; country: string }[]
    ) => void;
    addCity: (city: string, country: string) => void;
    removeCity: (city: string, country: string) => void;
    clearFavourites: () => void;
}

export const useMyFavoriteCities = create<MyFavoriteCitiesState>((set, get) => ({
    myFavoriteCities: [],
    setMyFavoriteCities: (myFavoriteCities) => set({ myFavoriteCities }),
    addCity: (city, country) => {
        const state = get();
        const updatedFavoriteCities = [
            ...state.myFavoriteCities,
            { city, country },
        ];
        set({
            myFavoriteCities: updatedFavoriteCities,
        });
        LocalStorageToolkit.setItem("my-favorite-cities", updatedFavoriteCities);
    },
    removeCity: (city, country) => {
        const state = get();

        if (!confirm(`Are you sure you want to remove ${city}, ${country} from your favorite cities?`)) {
            return;
        }

        const updatedFavoriteCities = state.myFavoriteCities.filter(
            (c) => `${c.city}, ${c.country}` !== `${city}, ${country}`
        );

        set({
            myFavoriteCities: updatedFavoriteCities,
        });
        LocalStorageToolkit.setItem("my-favorite-cities", updatedFavoriteCities);
    },
    clearFavourites: () => {
        if (!confirm("Are you sure you want to clear your favorite cities?")) return;
        set({
            myFavoriteCities: [],
        });
        LocalStorageToolkit.setItem("my-favorite-cities", []);
    },
}));