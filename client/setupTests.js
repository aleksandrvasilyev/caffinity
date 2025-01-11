/**
 * This file will be imported in all tests automatically by Jest
 */

// Make it automatically mock fetch requests. Docs: https://www.npmjs.com/package/jest-fetch-mock
import jestFetchMock from "jest-fetch-mock";
jestFetchMock.enableMocks();

// For react-testing-library, it will be the DOM mock
import "@testing-library/jest-dom";
const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
