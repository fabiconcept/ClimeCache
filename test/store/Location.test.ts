import { describe, it, expect, beforeEach } from 'vitest';
import { useLocation } from '../../src/store/Location';

describe('Location Store', () => {
    const defaultLocation = {
        city: '',
        country: '',
        state: '',
        formatted: ''
    };

    beforeEach(() => {
        useLocation.setState({
            status: 'loading',
            location: null,
            error: null,
            hasPermissionLocation: false
        });
    });

    it('should initialize with loading state', () => {
        const state = useLocation.getState();
        expect(state.status).toBe('loading');
        expect(state.location).toBe(null);
        expect(state.error).toBe(null);
        expect(state.hasPermissionLocation).toBe(false);
    });

    it('should set location permission', () => {
        useLocation.getState().setHasPermissionLocation(true);
        
        const state = useLocation.getState();
        expect(state.hasPermissionLocation).toBe(true);
    });

    it('should set location data', () => {
        const locationData = {
            city: 'London',
            country: 'UK',
            state: 'England',
            formatted: 'London, UK'
        };

        useLocation.getState().setLocation(locationData);
        
        const state = useLocation.getState();
        expect(state.status).toBe('success');
        expect(state.location).toEqual(locationData);
        expect(state.error).toBe(null);
    });

    it('should handle clearing location', () => {
        // First set some location data
        const locationData = {
            city: 'London',
            country: 'UK',
            state: 'England',
            formatted: 'London, UK'
        };
        useLocation.getState().setLocation(locationData);

        // Then clear it
        useLocation.getState().clearLocation();
        
        const state = useLocation.getState();
        expect(state.status).toBe('success');  // Status doesn't change on clear
        expect(state.location).toEqual(defaultLocation);
        expect(state.error).toBe(null);
    });

    it('should set error state', () => {
        useLocation.getState().setHasError(true, 'Location not found');
        
        const state = useLocation.getState();
        expect(state.status).toBe('error');
        expect(state.location).toBe(null);
        expect(state.error).toBe('Location not found');
    });
});
