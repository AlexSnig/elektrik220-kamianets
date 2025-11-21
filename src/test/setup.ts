import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {
      /* deprecated - no-op for testing */
    },
    removeListener: () => {
      /* deprecated - no-op for testing */
    },
    addEventListener: () => {
      /* no-op for testing */
    },
    removeEventListener: () => {
      /* no-op for testing */
    },
    dispatchEvent: () => {
      /* no-op for testing */
    },
  }),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {
    /* no-op for testing */
  }
  disconnect() {
    /* no-op for testing */
  }
  observe() {
    /* no-op for testing */
  }
  takeRecords() {
    return [];
  }
  unobserve() {
    /* no-op for testing */
  }
} as any;

// Mock scrollTo
window.scrollTo = () => {
  /* no-op for testing */
};
