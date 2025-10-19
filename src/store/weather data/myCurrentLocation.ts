import { create } from "zustand";
import { WeatherApi } from "../../utilities/WeatherApi";
import { CurrentWeatherApiResponse } from "../../types/currentWeather";
import { LocalStorageToolkit } from "../../utilities/localStorage";

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const CACHE_KEY = "my-current-weather";

interface CacheData {
    data: CurrentWeatherApiResponse;
    timestamp: number;
}

interface WeatherState {
    status: 'success' | 'error' | 'loading';
    error: string | null;
    weatherData: CurrentWeatherApiResponse | null;
    loadMyWeatherData: (location: string) => Promise<void>;
}

const isCacheValid = (timestamp: number): boolean => {
    return Date.now() - timestamp < CACHE_DURATION;
};

export const useMyCurrentLocation = create<WeatherState>((set) => {
    const loadFreshWeatherData = async (location: string): Promise<boolean> => {
        const weatherAPI = new WeatherApi();

        set({
            status: 'loading',
            error: null,
            weatherData: null
        });

        try {
            const response = await weatherAPI.getCurrentWeather(location);

            if ('success' in response) {
                throw new Error((response as unknown as {error: {info: string}}).error.info ?? 'Failed to fetch weather data.');
            }

            const weatherData = response as CurrentWeatherApiResponse;

            set({
                status: 'success',
                error: null,
                weatherData
            });

            LocalStorageToolkit.setItem(CACHE_KEY, {
                data: weatherData,
                timestamp: Date.now()
            });

            return true;

        } catch (error) {
            console.error('Error fetching weather data:', error);

            // Check for cached data as fallback
            const cached = LocalStorageToolkit.getItem(CACHE_KEY) as CacheData | null;

            if (cached) {
                console.log("Using cached data as fallback");
                set({
                    status: 'success',
                    error: null,
                    weatherData: cached.data
                });
                return true;
            }

            // Only set error state if no cached data is available
            set({
                status: 'error',
                error: `${error}`,
                weatherData: null
            });
            return false;
        }
    };

    return {
        status: 'success',
        error: null,
        weatherData: null,

        loadMyWeatherData: async (location: string) => {
            const cached = LocalStorageToolkit.getItem(CACHE_KEY) as CacheData | null;

            if (cached && isCacheValid(cached.timestamp)) {
                console.log("Using cached weather data");
                set({
                    status: 'success',
                    error: null,
                    weatherData: cached.data
                });
                return;
            }

            await loadFreshWeatherData(location);
        }
    };
});