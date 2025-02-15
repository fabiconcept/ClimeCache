import { create } from "zustand";

interface SearchState {
    searchTerm: string;
    selectedCity: string;
    setSelectedCity: (selectedCity: string) => void;
    setSearchTerm: (searchTerm: string) => void;
}

export const useSearch = create<SearchState>((set) => ({
    searchTerm: "",
    selectedCity: "",
    setSelectedCity: (selectedCity: string) => set({ selectedCity }),
    setSearchTerm: (searchTerm: string) => set({ searchTerm }),
}));