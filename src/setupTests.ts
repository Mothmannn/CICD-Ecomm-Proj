import "@testing-library/jest-dom";
import 'whatwg-fetch';

//@ts-expect-error -- Jest environment setup for TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from "util";
Object.assign(globalThis, { TextEncoder, TextDecoder });