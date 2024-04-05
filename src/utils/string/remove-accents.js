export function removeAccents(str) {
    let normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    normalizedStr = normalizedStr.replace(/[^a-zA-Z0-9\s]/g, "");
    return normalizedStr;
}
