import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { config } from 'dotenv'

config({ path: '.env.local' });

// Mock window.location
const mockLocation = {
  pathname: '/',
  search: '',
  hash: '',
  origin: 'http://localhost:3000',
  href: 'http://localhost:3000/',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  protocol: 'http:',
  assign: vi.fn(),
  reload: vi.fn(),
  replace: vi.fn(),
  toString: () => 'http://localhost:3000/'
};

// Setup window.location
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true
});
