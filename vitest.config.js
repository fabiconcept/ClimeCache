/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./test/setup.ts'],
        environmentOptions: {
            jsdom: {
                url: 'http://localhost:3000'
            },
            env: {
                VITE_WEATHER_API_KEY: 'eb08aba67c7377889381c45ee2c12c76',
                VITE_WEATHER_AUTOCOMPLETE_API_KEY: 'aab7c22c498c4b0bbf052d573bdbac46',
                VITE_WEATHER_BASE_URL: 'http://api.weatherstack.com',
                VITE_WEATHER_AUTOCOMPLETE_BASE_URL: 'https://api.geoapify.com/v1/geocode'
            }
        }
    },
});