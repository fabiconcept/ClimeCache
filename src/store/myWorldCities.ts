import { create } from "zustand";
import { LocalStorageToolkit } from "../utilities/localStorage";
import { WORLD_CITIES } from "../constants/WorldCities";

interface MyWorldCitiesState {
    myWorldCities: { city: string; country: string }[];
    setMyWorldCities: (
        myWorldCities: { city: string; country: string }[]
    ) => void;
    addCity: (city: string, country: string) => void;
    removeCity: (city: string, country: string) => void;
    reset: () => void;
}

export const useMyWorldCities = create<MyWorldCitiesState>((set, get) => ({
    myWorldCities: [],
    setMyWorldCities: (myWorldCities) => set({ myWorldCities }),
    addCity: (city, country) => {
        const state = get();
        const updatedWorldCities = [
            ...state.myWorldCities,
            { city, country },
        ];
        set({
            myWorldCities: updatedWorldCities,
        });
        LocalStorageToolkit.setItem("my-world-cities", updatedWorldCities);
    },
    removeCity: (city, country) => {
        const state = get();

        if (!confirm(`Are you sure you want to remove ${city}, ${country} from your favorite cities?`)) {
            return;
        }

        const updatedWorldCities = state.myWorldCities.filter(
            (c) => `${c.city}, ${c.country}` !== `${city}, ${country}`
        );

        set({
            myWorldCities: updatedWorldCities,
        });
        LocalStorageToolkit.setItem("my-world-cities", updatedWorldCities);
    },
    reset: () => {
        if (!confirm("Are you sure you want to reset your world cities?")) return;
        set({
            myWorldCities: WORLD_CITIES,
        });
        LocalStorageToolkit.setItem("my-world-cities", WORLD_CITIES);
    },
}));