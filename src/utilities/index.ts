import { ForecastDay } from "../types/currentWeather";
import { Country } from "../types";
import { WeatherApi } from "./WeatherApi";
import countriesData from "./country.json";

type LocationData = {
    city?: string;
    country: string;
    state?: string;
    formatted?: string;
} | null;

type LocationError = string | null;

export const getLocation = async (): Promise<[LocationData, LocationError]> => {
    if (!("geolocation" in navigator)) {
        return [null, "Geolocation is not supported by your browser."];
    }

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const weatherAPI = new WeatherApi();
                try {
                    const response = await weatherAPI.getReverseAddress({ lat: latitude, lon: longitude });
                    const { results } = response;
                    resolve([
                        {
                            city: results[0].state,
                            country: results[0].country,
                            state: results[0].county,
                            formatted: results[0].formatted
                        },
                        null,
                    ]);
                } catch (err) {
                    resolve([null, "Failed to fetch location details."]);
                }
            },
            (error) => {
                resolve([null, error.message]);
            }
        );
    });
};

export const getCountrySvg = (country: string) => {
    const countriesDataCopy = [...countriesData] as Country[];
    const countryData = countriesDataCopy.find((item) => {
        return country.toLowerCase().trim() === item.name.toLowerCase();
    });
    return countryData?.flag_image;
}

// a function to generate a unique string id for each note
export const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
}

export const getSuffix = (day: ForecastDay) => {
    switch (day.date.split("").splice(9).join("")) {
        case "1":
            return "st";
        case "2":
            return "nd";
        case "3":
            return "rd";

        default:
            return "th";
    }
}

export const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export function detectOS(): ("windows" | "macos" | "linux" | "unknown" | "ios" | "android") {
    // Check if we're in a browser environment
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        const ua = navigator.userAgent.toLowerCase();

        if (ua.includes("windows")) return "windows";
        if (ua.includes("mac")) {
            // Distinguish between iOS and macOS
            if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) return "ios";
            return "macos";
        }
        if (ua.includes("android")) return "android";
        if (ua.includes("linux")) return "linux";

        return "unknown";
    }

    // Otherwise we're in a Node.js (server) environment
    try {
        const os = require("os");
        const platform = os.platform();

        if (platform === "win32") return "windows";
        if (platform === "darwin") return "macos";
        if (platform === "linux") return "linux";
        return "unknown";
    } catch {
        return "unknown";
    }
}
