import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAutocompleteHook } from '../../../src/utilities/Hooks/useAutoComplete';
import { WeatherApi } from '../../../src/utilities/WeatherApi';

// Mock dependencies
vi.mock('../../../src/utilities/WeatherApi', () => ({
    WeatherApi: vi.fn().mockImplementation(() => ({
        getAutocomplete: vi.fn().mockResolvedValue({
            features: [
                { properties: { formatted: 'London, UK' } },
                { properties: { formatted: 'London, CA' } }
            ]
        })
    }))
}));

vi.mock('../../../src/store/Autocomplete', () => ({
    useAutocomplete: () => ({
        setAutocomplete: vi.fn(),
        clear: vi.fn()
    })
}));

vi.mock('../../../src/store/Search', () => ({
    useSearch: () => ({
        selectedCity: ''
    })
}));

describe('useAutocompleteHook', () => {
    it('should return loading state', () => {
        const { result } = renderHook(() => useAutocompleteHook({ searchTerm: 'London' }));
        const [loading] = result.current;
        
        expect(loading).toBeDefined();
        expect(typeof loading).toBe('boolean');
    });
});
