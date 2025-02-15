import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useMyFavoriteCities } from '../../src/store/myFavoriteCities';
import { LocalStorageToolkit } from '../../src/utilities/localStorage';

// Mock LocalStorageToolkit
vi.mock('../../src/utilities/localStorage', () => ({
    LocalStorageToolkit: {
        setItem: vi.fn(),
        getItem: vi.fn()
    }
}));

// Mock window.confirm
const mockConfirm = vi.fn(() => true);
vi.stubGlobal('confirm', mockConfirm);

describe('MyFavoriteCities Store', () => {
    beforeEach(() => {
        useMyFavoriteCities.setState({ myFavoriteCities: [] });
        vi.clearAllMocks();
        mockConfirm.mockClear();
    });

    it('should initialize with empty favorites array', () => {
        const state = useMyFavoriteCities.getState();
        expect(state.myFavoriteCities).toEqual([]);
    });

    it('should add a city to favorites', () => {
        useMyFavoriteCities.getState().addCity('London', 'UK');
        
        const state = useMyFavoriteCities.getState();
        expect(state.myFavoriteCities).toEqual([
            { city: 'London', country: 'UK' }
        ]);
        expect(LocalStorageToolkit.setItem).toHaveBeenCalledWith(
            'my-favorite-cities',
            [{ city: 'London', country: 'UK' }]
        );
    });

    it('should set multiple favorite cities', () => {
        const cities = [
            { city: 'London', country: 'UK' },
            { city: 'Paris', country: 'FR' }
        ];
        
        useMyFavoriteCities.getState().setMyFavoriteCities(cities);
        
        const state = useMyFavoriteCities.getState();
        expect(state.myFavoriteCities).toEqual(cities);
    });

    it('should remove a city from favorites', () => {
        // First add some cities
        useMyFavoriteCities.getState().setMyFavoriteCities([
            { city: 'London', country: 'UK' },
            { city: 'Paris', country: 'FR' }
        ]);

        // Then remove one
        useMyFavoriteCities.getState().removeCity('London', 'UK');
        
        const state = useMyFavoriteCities.getState();
        expect(state.myFavoriteCities).toEqual([
            { city: 'Paris', country: 'FR' }
        ]);
        expect(LocalStorageToolkit.setItem).toHaveBeenCalledWith(
            'my-favorite-cities',
            [{ city: 'Paris', country: 'FR' }]
        );
    });

    it('should clear all favorites', async () => {
        // Mock confirm to return true
        mockConfirm.mockImplementationOnce(() => true);

        // First add some cities
        useMyFavoriteCities.getState().setMyFavoriteCities([
            { city: 'London', country: 'UK' },
            { city: 'Paris', country: 'FR' }
        ]);

        // Then clear them
        await useMyFavoriteCities.getState().clearFavourites();
        
        const state = useMyFavoriteCities.getState();
        expect(state.myFavoriteCities).toEqual([]);
        expect(LocalStorageToolkit.setItem).toHaveBeenCalledWith(
            'my-favorite-cities',
            []
        );
    });
});
