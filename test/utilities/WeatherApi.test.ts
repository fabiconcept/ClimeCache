import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WeatherApi } from '../../src/utilities/WeatherApi';

describe('WeatherApi', () => {
    let api: WeatherApi;
    let fetchSpy: any;

    beforeEach(() => {
        // Mock fetch globally
        fetchSpy = vi.spyOn(global, 'fetch');
        api = new WeatherApi();
    });

    describe('getCurrentWeather', () => {
        it('should fetch weather data successfully', async () => {
            const mockWeatherData = {
                current: {
                    temperature: 20,
                    weather_descriptions: ['Sunny']
                }
            };

            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockWeatherData)
            });

            const result = await api.getCurrentWeather('London');
            expect(result).toEqual(mockWeatherData);
        });
    });

    describe('getAutocomplete', () => {
        it('should fetch autocomplete data successfully', async () => {
            const mockAutocompleteData = {
                results: [
                    { city: 'London', country: 'UK' }
                ]
            };

            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockAutocompleteData)
            });

            const result = await api.getAutocomplete('London');
            expect(result).toEqual(mockAutocompleteData);
        });
    });

    describe('getReverseAddress', () => {
        it('should fetch reverse geocoding data successfully', async () => {
            const mockGeoData = {
                results: [
                    { formatted: 'London, UK' }
                ]
            };

            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockGeoData)
            });

            const result = await api.getReverseAddress({ lat: 51.5074, lon: -0.1278 });
            expect(result).toEqual(mockGeoData);
        });
    });
});
