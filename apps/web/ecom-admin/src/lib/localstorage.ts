const setStorageItem = (key: string, value: string) => {
    localStorage.setItem(key, value)
}
const getStorageItem = (key: string): string | null => {
    return localStorage.getItem(key)
}
const removeStorageItem = (key: string) => {
    localStorage.removeItem(key)
}
export { setStorageItem, getStorageItem, removeStorageItem }