import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../../src/utilities/Hooks/useDebounce';

describe('useDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should return initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('initial', 500));
        expect(result.current).toBe('initial');
    });

    it('should debounce value updates', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'initial', delay: 500 } }
        );

        // Update the value
        rerender({ value: 'updated', delay: 500 });

        // Value should not have changed yet
        expect(result.current).toBe('initial');

        // Fast-forward time
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // Now the value should be updated
        expect(result.current).toBe('updated');
    });

    it('should handle multiple rapid updates', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'initial', delay: 500 } }
        );

        // Multiple rapid updates
        rerender({ value: 'update1', delay: 500 });
        rerender({ value: 'update2', delay: 500 });
        rerender({ value: 'update3', delay: 500 });

        // Value should still be initial
        expect(result.current).toBe('initial');

        // Advance time partially
        act(() => {
            vi.advanceTimersByTime(300);
        });

        // Should still be initial
        expect(result.current).toBe('initial');

        // Advance remaining time
        act(() => {
            vi.advanceTimersByTime(200);
        });

        // Should now be the final update
        expect(result.current).toBe('update3');
    });

    it('should handle delay changes', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'initial', delay: 500 } }
        );

        // Update with different delay
        rerender({ value: 'updated', delay: 1000 });

        // Advance time by original delay
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // Value should not have changed yet
        expect(result.current).toBe('initial');

        // Advance remaining time
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // Now the value should be updated
        expect(result.current).toBe('updated');
    });
});
