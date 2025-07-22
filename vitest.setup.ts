import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import indexeddb from "fake-indexeddb";
import { server } from "./src/mocks/node";
import { Crypto } from "@peculiar/webcrypto";

const cryptoModule = new Crypto();

afterEach(() => {
  cleanup();
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

globalThis.indexedDB = indexeddb;

Object.defineProperty(globalThis, "crypto", {
  get() {
    return cryptoModule;
  },
});

globalThis.window = Object.create(window);
const url = "http://dummy.com";
Object.defineProperty(window, "location", {
  value: {
    href: url,
  },
  writable: true,
});
