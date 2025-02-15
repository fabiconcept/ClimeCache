import { describe, it, expect, beforeEach } from 'vitest';
import { useAutocomplete } from '../../src/store/Autocomplete';

describe('Autocomplete Store', () => {
    beforeEach(() => {
        useAutocomplete.setState({ autocomplete: [] });
    });

    it('should initialize with empty autocomplete array', () => {
        const state = useAutocomplete.getState();
        expect(state.autocomplete).toEqual([]);
    });

    it('should set autocomplete suggestions', () => {
        const suggestions = ['London, UK', 'Paris, FR'];
        useAutocomplete.getState().setAutocomplete(suggestions);
        
        const state = useAutocomplete.getState();
        expect(state.autocomplete).toEqual(suggestions);
    });

    it('should clear autocomplete suggestions', () => {
        // First set some suggestions
        const suggestions = ['London, UK', 'Paris, FR'];
        useAutocomplete.getState().setAutocomplete(suggestions);
        
        // Then clear them
        useAutocomplete.getState().clear();
        
        const state = useAutocomplete.getState();
        expect(state.autocomplete).toEqual([]);
    });
});
