export const getStorageOr = (key, def) => {
    const resource = localStorage[key];

    switch(resource) {
        case "true":
            return true
        case "false":
            return false
        case undefined:
            return def
        default:
            return localStorage[key]
    }
}