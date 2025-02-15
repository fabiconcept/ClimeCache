import { create } from "zustand";

export type AutocompleteState = {
    autocomplete: string[];
    setAutocomplete: (autocomplete: string[]) => void;
    clear: () => void;
}

export const useAutocomplete = create<AutocompleteState>((set) => ({
    autocomplete: [],
    setAutocomplete: (autocomplete: string[]) => set({ autocomplete }),
    clear: () => set({ autocomplete: [] })
}));