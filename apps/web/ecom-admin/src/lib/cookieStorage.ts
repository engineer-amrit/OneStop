class CookieStorage {
    getItem(key: string) {
        const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }
}

export const cookieStorage = new CookieStorage();