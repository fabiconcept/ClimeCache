import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCurrentWeather } from '../../../src/utilities/Hooks/useCurrentWeather';
import { LocalStorageToolkit } from '../../../src/utilities/localStorage';

// Mock WeatherApi
vi.mock('../../../src/utilities/WeatherApi', () => ({
    WeatherApi: vi.fn().mockImplementation(() => ({
        getCurrentWeather: vi.fn().mockResolvedValue({
            current: {
                feelslike: 20,
                weather_descriptions: ['Sunny']
            }
        })
    }))
}));

// Mock LocalStorageToolkit
vi.mock('../../../src/utilities/localStorage', () => ({
    LocalStorageToolkit: {
        getItem: vi.fn().mockReturnValue(null),
        setItem: vi.fn()
    }
}));

describe('useCurrentWeather', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch and return weather data for known city', async () => {
        const { result } = renderHook(() => useCurrentWeather({
            knownCity: { city: 'London', country: 'UK' }
        }));

        // Initial state should be loading
        expect(result.current[0]).toBe(true);
        expect(result.current[1]).toBe(null);
        expect(result.current[2]).toBe(null);

        // Wait for data to be loaded
        await waitFor(() => {
            expect(result.current[0]).toBe(false);
            expect(result.current[1]).toEqual({
                feelsLike: 20,
                weather_descriptions: 'Sunny'
            });
        });
    });

    it('should use cached data when available', async () => {
        const cachedData = {
            timestamp: Date.now(),
            data: {
                current: {
                    feelslike: 25,
                    weather_descriptions: ['Cloudy']
                }
            }
        };

        vi.mocked(LocalStorageToolkit.getItem).mockReturnValue(JSON.stringify(cachedData));

        const { result } = renderHook(() => useCurrentWeather({
            knownCity: { city: 'London', country: 'UK' }
        }));

        await waitFor(() => {
            const [loading, data] = result.current;
            expect(loading).toBe(false);
            expect(data).toEqual({
                feelsLike: 25,
                weather_descriptions: 'Cloudy'
            });
        });
    });
});
