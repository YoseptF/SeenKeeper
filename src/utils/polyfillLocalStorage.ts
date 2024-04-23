// @ts-nocheck
const localStorageMock = {
  getItem: () => null,
  setItem: () => null
};

if (typeof window === "undefined") {
  global.localStorage = localStorageMock;
  global.window = {};
  global.window.localStorage = localStorageMock;
}