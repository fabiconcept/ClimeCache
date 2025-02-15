export const LocalStorageToolkit = {
    setItem<T>(key: string, value: T): void {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error saving to localStorage: ${error}`);
        }
    },

    getItem<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) as T : null;
        } catch (error) {
            console.error(`Error reading from localStorage: ${error}`);
            return null;
        }
    },

    removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item from localStorage: ${error}`);
        }
    },

    clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error(`Error clearing localStorage: ${error}`);
        }
    },

    hasKey(key: string): boolean {
        return localStorage.getItem(key) !== null;
    },

    getKeys(): string[] {
        return Object.keys(localStorage);
    }
};
