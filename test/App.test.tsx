import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from "react";
import App from '../src/App';

// Mock modules before any variable declarations
vi.mock('react-router-dom', () => ({
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Route: ({ element }: { element: React.ReactNode }) => <div>{element}</div>,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
    useSearchParams: () => [new URLSearchParams(), vi.fn()]
}));

vi.mock('../src/utilities', () => ({
    getLocation: () => Promise.resolve([null, null])
}));

vi.mock('../src/utilities/localStorage', () => ({
    LocalStorageToolkit: {
        getItem: () => null,
        setItem: vi.fn()
    }
}));

// Mock zustand stores
vi.mock('../src/store/Location', () => ({
    useLocation: () => ({
        setHasPermissionLocation: vi.fn(),
        setHasError: vi.fn(),
        setLocation: vi.fn()
    })
}));

vi.mock('../src/store/Search', () => ({
    useSearch: () => ({
        setSelectedCity: vi.fn(),
        selectedCity: ''
    })
}));

vi.mock('../src/store/myWorldCities', () => ({
    useMyWorldCities: () => ({
        setMyWorldCities: vi.fn(),
        myWorldCities: []
    })
}));

vi.mock('../src/store/myFavoriteCities', () => ({
    useMyFavoriteCities: () => ({
        setMyFavoriteCities: vi.fn(),
        myFavoriteCities: []
    })
}));

vi.mock('../src/store/myNotes', () => ({
    useMyNotes: () => ({
        noteModalOpen: false,
        populateNotes: vi.fn(),
        myNotes: []
    })
}));

describe('App Component', () => {
    it('renders without crashing', () => {
        render(<App />);
        const appElement = screen.getByTestId('app');
        expect(appElement).toBeDefined();
    });

    it('has the correct CSS class', () => {
        render(<App />);
        const appElement = screen.getByTestId('app');
        expect(appElement).toHaveClass('app');
    });

    it('contains header components', () => {
        render(<App />);
        const headers = screen.getAllByRole('banner');
        expect(headers.length).toBeGreaterThan(0);
    });

    it('renders search inputs with correct placeholder', () => {
        render(<App />);
        const searchInputs = screen.getAllByPlaceholderText('Look up a city...');
        expect(searchInputs.length).toBeGreaterThan(0);
        searchInputs.forEach(input => {
            expect(input).toBeInTheDocument();
        });
    });

    it('renders keyboard shortcut tips', () => {
        render(<App />);
        const shortcutTips = screen.getAllByText('CTRL + K');
        expect(shortcutTips.length).toBeGreaterThan(0);
    });

    it('renders the location label', () => {
        render(<App />);
        const locationLabel = screen.getByText('Location');
        expect(locationLabel).toBeInTheDocument();
    });

    it('renders loading cards initially', () => {
        render(<App />);
        const loadingCards = document.getElementsByClassName('loading-stat-card');
        expect(loadingCards.length).toBeGreaterThan(1);
    });

    it('renders navigation buttons', () => {
        render(<App />);
        const settingsButtons = screen.getAllByTitle('Settings');
        const notesButtons = screen.getAllByTitle('My Notes');

        expect(settingsButtons.length).toBeGreaterThan(0);
        expect(notesButtons.length).toBeGreaterThan(0);

        settingsButtons.forEach(button => {
            expect(button).toHaveClass('header-button');
        });

        notesButtons.forEach(button => {
            expect(button).toHaveClass('header-button');
        });
    });
}); 