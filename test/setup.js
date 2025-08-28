/*// src/test/setup.js
import '@testing-library/jest-dom/vitest';
import { afterEach, expect, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Hooka in jest-dom matchers (toBeInTheDocument, etc.)
expect.extend(matchers);

// Städar DOM efter varje test
afterEach(() => {
  cleanup();
});

// (valfritt) tysta konsolloggar från avsiktliga fel i testerna
vi.spyOn(console, 'error').mockImplementation(() => {}); */
