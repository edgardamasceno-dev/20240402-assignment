import { removeAccents } from './';

export function normalize(str) {
    return removeAccents(str).toLowerCase();
}