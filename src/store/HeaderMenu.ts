import { create } from "zustand";

interface HeaderMenuState {
    isNotesMenuOpen: boolean;
    isSettingsMenuOpen: boolean;
    toggleNotesMenu: () => void;
    toggleSettingsMenu: () => void;
}

export const useHeaderMenu = create<HeaderMenuState>((set) => ({
    isNotesMenuOpen: false,
    isSettingsMenuOpen: false,
    toggleNotesMenu: () => set((state) => ({
        isNotesMenuOpen: !state.isNotesMenuOpen,
        isSettingsMenuOpen: false,
    })),
    toggleSettingsMenu: () => set((state) => ({
        isSettingsMenuOpen: !state.isSettingsMenuOpen,
        isNotesMenuOpen: false,
    })),
}))