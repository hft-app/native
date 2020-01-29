export function parseDate(date) {
    let parts = date.trim().split(".");
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
}
