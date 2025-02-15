import { RequestParams } from "../types";
import { AutocompleteResponse, ReverseGeocodingResponse } from "../types/autoComplete";
import { CurrentApiResponse } from "../types/currentWeather";
import { Endpoints } from "../types/endpoints";

export class WeatherApi {
    private API_KEY: string = "";
    private BASE_URL: string = "";
    private AUTO_COMPLETE_API_KEY: string = "";
    private AUTO_COMPLETE_BASE_URL: string = "";

    constructor() {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const baseUrl = import.meta.env.VITE_WEATHER_BASE_URL;
        const autoCompleteApiKey = import.meta.env.VITE_WEATHER_AUTOCOMPLETE_API_KEY;
        const autoCompleteBaseUrl = import.meta.env.VITE_WEATHER_AUTOCOMPLETE_BASE_URL;

        if (!apiKey)
            throw new Error("Environment variable VITE_WEATHER_API_KEY is missing.");

        if (!baseUrl)
            throw new Error("Environment variable VITE_WEATHER_BASE_URL is missing.");

        if (!autoCompleteApiKey)
            throw new Error("Environment variable VITE_WEATHER_AUTOCOMPLETE_API_KEY is missing.");

        if (!autoCompleteBaseUrl)
            throw new Error("Environment variable VITE_WEATHER_AUTOCOMPLETE_BASE_URL is missing.");

        this.API_KEY = apiKey;
        this.BASE_URL = baseUrl;
        this.AUTO_COMPLETE_API_KEY = autoCompleteApiKey;
        this.AUTO_COMPLETE_BASE_URL = autoCompleteBaseUrl;
    }

    private async request<T>({
        method = "GET",
        body,
        headers = {},
        ...props
    }: RequestParams): Promise<T> {
        const url = props.defaultUrl ?? `${this.BASE_URL}${props.endpoint}&key=${this.API_KEY}`;

        console.log({
            url
        })

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        try {
            const response = await fetch(url, {
                method,
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error: any) {

            console.log({ error });
            if (error.name === "AbortError") {
                throw new Error("Request timed out.");
            }
            throw new Error(`Network error: ${error.message}`);
        }
    }

    // Autocomplete from GEO API
    public async getAutocomplete(query: string) {
        return this.request<AutocompleteResponse>({
            defaultUrl: `${this.AUTO_COMPLETE_BASE_URL}${Endpoints.autoComplete}?text=${encodeURIComponent(query)}&apiKey=${this.AUTO_COMPLETE_API_KEY}`
        });
    }

    // Reverse Geocoding API from GEO API
    public async getReverseAddress(coordinates: { lat: number, lon: number }) {
        return this.request<ReverseGeocodingResponse>({
            defaultUrl: `${this.AUTO_COMPLETE_BASE_URL}${Endpoints.reverse}?lat=${coordinates.lat}&lon=${coordinates.lon}&format=json&apiKey=${this.AUTO_COMPLETE_API_KEY}`
        });
    }

    // Current Weather API from Weather API
    public async getCurrentWeather(location: string) {
        return this.request<CurrentApiResponse>({
            endpoint: `${Endpoints.currentWeather}?q=${location}`,
        });
    }

    // Current Weather forecast API from Weather API
    public async getCurrentWeatherForecast(location: string) {
        return this.request<CurrentApiResponse>({
            endpoint: `${Endpoints.forecastWeather}?q=${location}&days=7&aqi=no&alerts=yes`,
        });
    }
}
