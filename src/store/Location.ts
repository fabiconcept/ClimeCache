import { create } from "zustand";

// Base types
interface Location {
    city: string;
    country: string;
    state: string;
    formatted: string;
}

interface BaseState {
    hasPermissionLocation: boolean;
    setHasPermissionLocation: (hasPermission: boolean) => void;
    setLocation: (location: Location) => void;
    clearLocation: () => void;
    setHasError: (hasError: boolean, errorMessage: string) => void;
}

// State variants
interface LoadingState extends BaseState {
    status: 'loading';
    location: null;
    error: null;
}

interface ErrorState extends BaseState {
    status: 'error';
    location: null;
    error: string;
}

interface SuccessState extends BaseState {
    status: 'success';
    location: Location;
    error: null;
}

type LocationState = LoadingState | ErrorState | SuccessState;

// Initial location value
const defaultLocation: Location = {
    city: '',
    country: '',
    state: '',
    formatted: '',
};

// Store creation
export const useLocation = create<LocationState>((set) => ({
    status: 'success',
    hasPermissionLocation: false,
    location: defaultLocation,
    error: null,

    setHasPermissionLocation: (hasPermissionLocation) =>
        set({ hasPermissionLocation }),

    setLocation: (location) => set({
        status: 'success',
        location,
        error: null
    }),

    clearLocation: () => set({
        status: 'success',
        location: defaultLocation,
        error: null
    }),

    setHasError: (hasError: boolean, errorMessage: string) => {
        if (hasError) {
            set({
                status: 'error',
                location: null,
                error: errorMessage
            });
        } else {
            set({
                status: 'success',
                location: defaultLocation,
                error: null
            });
        }
    },
}));