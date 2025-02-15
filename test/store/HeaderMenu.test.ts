import { describe, it, expect, beforeEach } from 'vitest';
import { useHeaderMenu } from '../../src/store/HeaderMenu';

describe('HeaderMenu Store', () => {
    beforeEach(() => {
        useHeaderMenu.setState({ isNotesMenuOpen: false, isSettingsMenuOpen: false });
    });

    it('should initialize with both menus closed', () => {
        const state = useHeaderMenu.getState();
        expect(state.isNotesMenuOpen).toBe(false);
        expect(state.isSettingsMenuOpen).toBe(false);
    });

    it('should toggle notes menu and close settings menu', () => {
        useHeaderMenu.getState().toggleNotesMenu();
        
        const state = useHeaderMenu.getState();
        expect(state.isNotesMenuOpen).toBe(true);
        expect(state.isSettingsMenuOpen).toBe(false);
    });

    it('should toggle settings menu and close notes menu', () => {
        useHeaderMenu.getState().toggleSettingsMenu();
        
        const state = useHeaderMenu.getState();
        expect(state.isSettingsMenuOpen).toBe(true);
        expect(state.isNotesMenuOpen).toBe(false);
    });

    it('should close notes menu when already open', () => {
        useHeaderMenu.setState({ isNotesMenuOpen: true, isSettingsMenuOpen: false });
        useHeaderMenu.getState().toggleNotesMenu();
        
        const state = useHeaderMenu.getState();
        expect(state.isNotesMenuOpen).toBe(false);
        expect(state.isSettingsMenuOpen).toBe(false);
    });
});
