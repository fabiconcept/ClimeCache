import { describe, it, expect, beforeEach } from 'vitest';
import { useSearch } from '../../src/store/Search';

describe('Search Store', () => {
    beforeEach(() => {
        useSearch.setState({ searchTerm: '', selectedCity: '' });
    });

    it('should initialize with empty search term and selected city', () => {
        const state = useSearch.getState();
        expect(state.searchTerm).toBe('');
        expect(state.selectedCity).toBe('');
    });

    it('should set search term', () => {
        const searchTerm = 'London';
        useSearch.getState().setSearchTerm(searchTerm);
        
        const state = useSearch.getState();
        expect(state.searchTerm).toBe(searchTerm);
    });

    it('should set selected city', () => {
        const selectedCity = 'London, UK';
        useSearch.getState().setSelectedCity(selectedCity);
        
        const state = useSearch.getState();
        expect(state.selectedCity).toBe(selectedCity);
    });

    it('should allow updating both search term and selected city independently', () => {
        const searchTerm = 'Lon';
        const selectedCity = 'London, UK';
        
        useSearch.getState().setSearchTerm(searchTerm);
        useSearch.getState().setSelectedCity(selectedCity);
        
        const state = useSearch.getState();
        expect(state.searchTerm).toBe(searchTerm);
        expect(state.selectedCity).toBe(selectedCity);
    });
});
