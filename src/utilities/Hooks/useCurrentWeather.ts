import { useEffect, useState } from "react";
import { WeatherApi } from "../WeatherApi";
import { LocalStorageToolkit } from "../localStorage";
import { CurrentWeatherApiResponse } from "../../types/currentWeather";

interface CityWeatherData {
    feelsLike: number;
    weather_descriptions: string;
    timestamp: number;
    defaultIcon: string;
    description: string;
}

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface KnownCity {
    city: string;
    country: string;
}

interface WeatherHookProps {
    knownCity: KnownCity;
    unknownCity?: string;
    myLocation?: boolean;
}

export const useCurrentWeather = ({ knownCity, unknownCity, myLocation }: WeatherHookProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [cityData, setCityData] = useState<Omit<CityWeatherData, 'timestamp'> | null>(null);
    const [cityFullData, setCityFullData] = useState<CurrentWeatherApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Use either unknownCity or knownCity for queries
    const getLocationQuery = () => {
        if (unknownCity) return unknownCity;
        return `${knownCity.city}, ${knownCity.country}`;
    };

    const getCacheKey = () => {
        if (unknownCity && !myLocation) {
            return `weather_${unknownCity}`.toLowerCase();
        }
        if (unknownCity && myLocation) {
            return `my-current-weather`;
        }
        return `weather_${knownCity.city}_${knownCity.country}`.toLowerCase();
    };

    const getFromCache = (): string | null => {
        const cacheKey = getCacheKey();

        return LocalStorageToolkit.getItem<string>(cacheKey);
    };

    const setToCache = (data: CurrentWeatherApiResponse) => {
        const cacheKey = getCacheKey();
        const cacheItem = {
            data,
            timestamp: Date.now()
        };
        LocalStorageToolkit.setItem(cacheKey, JSON.stringify(cacheItem));
    };

    const isCacheValid = (timestamp: number): boolean => {
        return Date.now() - timestamp < CACHE_DURATION;
    };

    const fetchWeatherData = async (): Promise<boolean> => {
        setIsLoading(true);
        try {
            const weatherAPI = new WeatherApi();
            const locationQuery = getLocationQuery();
            const apiResponse = await weatherAPI.getCurrentWeatherForecast(locationQuery);

            if ('error' in apiResponse) {
                throw new Error((apiResponse as { error: { message: string } }).error.message ?? 'Failed to fetch weather data.');
            }

            const response = apiResponse as CurrentWeatherApiResponse;
            const weatherData: CityWeatherData = {
                feelsLike: response.current.feelslike_c,
                weather_descriptions: response.current.condition.text,
                timestamp: Date.now(),
                defaultIcon: response.current.condition.icon ?? "",
                description: response.current.condition.text ?? ""
            };

            setToCache(response);
            setCityData({
                feelsLike: weatherData.feelsLike,
                weather_descriptions: weatherData.weather_descriptions,
                defaultIcon: response.current.condition.icon ?? "",
                description: response.current.condition.text ?? ""
            });
            setCityFullData(response);
            return true;
        } catch (error) {
            const data = getFromCache();

            const usableCache = typeof (data) === 'string' ? JSON.parse(data) : data;
            if (data) {

                setCityData({
                    feelsLike: usableCache.data.current.feelslike_c,
                    weather_descriptions: usableCache.data.current.condition.text,
                    defaultIcon: usableCache.data.current.condition.icon ?? "",
                    description: usableCache.data.current.condition.text ?? ""
                });
                setCityFullData(usableCache.data);
                return true;
            }

            setError(`${error ?? 'Failed to fetch weather data.'}`);
            console.error('Error fetching weather data:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const setupRefreshTimeout = (expiryTime: number) => {
        return setTimeout(async () => {
            const success = await fetchWeatherData();
            if (success) {
                // Only set up the next timeout if the fetch was successful
                setupRefreshTimeout(CACHE_DURATION);
            }
        }, expiryTime);
    };

    useEffect(() => {
        // Return early if no valid location is provided
        if (!unknownCity && (!knownCity.city || !knownCity.country)) return;

        let timeoutId: NodeJS.Timeout;

        const loadData = async () => {
            const cached = getFromCache();

            const usableCache = typeof (cached) === 'string' ? JSON.parse(cached) : cached;

            if (cached && isCacheValid(usableCache.timestamp)) {

                const parsedCache = usableCache;
                setCityData({
                    feelsLike: parsedCache.data.current.feelslike_c,
                    weather_descriptions: parsedCache.data.current.condition.text,
                    defaultIcon: parsedCache.data.current.condition.icon ?? "",
                    description: parsedCache.data.current.condition.text ?? ""
                });
                setCityFullData(parsedCache.data);

                const timeToExpiry = (parsedCache.timestamp + CACHE_DURATION) - Date.now();
                timeoutId = setupRefreshTimeout(timeToExpiry);
            } else {
                const success = await fetchWeatherData();
                if (success) {
                    timeoutId = setupRefreshTimeout(CACHE_DURATION);
                }
            }
        };

        loadData();

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [unknownCity, knownCity.city, knownCity.country]);

    return [isLoading, cityData, cityFullData, error] as const;
};