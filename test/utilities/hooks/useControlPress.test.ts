import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useKeyboardShortcut } from '../../../src/utilities/Hooks/useControlPress';

describe('useKeyboardShortcut', () => {
    const shortcuts = ['KeyK', 'KeyS', 'KeyL', 'KeyF'];

    shortcuts.forEach(shortcut => {
        it(`should trigger callback on Ctrl+${shortcut.replace('Key', '')}`, () => {
            const mockTrigger = vi.fn();
            
            renderHook(() => useKeyboardShortcut({ onTrigger: mockTrigger }));

            const event = new KeyboardEvent('keydown', {
                ctrlKey: true,
                code: shortcut
            });
            document.dispatchEvent(event);

            expect(mockTrigger).toHaveBeenCalled();
        });

        it(`should not trigger callback without Ctrl+${shortcut.replace('Key', '')}`, () => {
            const mockTrigger = vi.fn();
            
            renderHook(() => useKeyboardShortcut({ onTrigger: mockTrigger }));

            const event = new KeyboardEvent('keydown', {
                ctrlKey: false,
                code: shortcut
            });
            document.dispatchEvent(event);

            expect(mockTrigger).not.toHaveBeenCalled();
        });
    });
});
