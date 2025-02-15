import { describe, it, expect } from 'vitest';
import { LocalStorageToolkit } from '../../src/utilities/localStorage';

describe('LocalStorageToolkit', () => {
    it('should set and get an item correctly', () => {
        const testData = { name: 'Test' };
        LocalStorageToolkit.setItem('test-key', testData);
        const retrieved = LocalStorageToolkit.getItem('test-key');
        expect(retrieved).toEqual(testData);
    });
});
