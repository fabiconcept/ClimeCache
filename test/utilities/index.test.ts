import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLocation, getCountrySvg, generateId } from '../../src/utilities';
import { WeatherApi } from '../../src/utilities/WeatherApi';

// Mock WeatherApi
vi.mock('../../src/utilities/WeatherApi', () => ({
    WeatherApi: vi.fn().mockImplementation(() => ({
        getReverseAddress: vi.fn().mockResolvedValue({
            results: [{
                state: 'London',
                country: 'United Kingdom',
                county: 'Greater London',
                formatted: 'London, UK'
            }]
        })
    }))
}));

describe('Utility Functions', () => {
    describe('generateId', () => {
        it('should generate a string of correct length', () => {
            const id = generateId();
            expect(id).toHaveLength(7);
        });
    });

    describe('getCountrySvg', () => {
        it('should handle empty input gracefully', () => {
            const result = getCountrySvg('');
            expect(result).toBeUndefined();
        });
    });

    describe('getLocation', () => {
        const mockGeolocation = {
            getCurrentPosition: vi.fn()
        };

        beforeEach(() => {
            // Mock navigator.geolocation
            Object.defineProperty(global.navigator, 'geolocation', {
                value: mockGeolocation,
                writable: true
            });
        });

        it('should handle successful geolocation', async () => {
            mockGeolocation.getCurrentPosition.mockImplementation((success) =>
                success({
                    coords: {
                        latitude: 51.5074,
                        longitude: -0.1278
                    }
                })
            );

            const [location, error] = await getLocation();
            expect(error).toBeNull();
            expect(location).toBeDefined();
        });
    });
});
