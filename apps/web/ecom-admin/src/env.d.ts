export { };
declare global {
    interface Window {
        __ENV__: {
            SERVER_URL: string;
            API_KEY: string;
            NODE_ENV: 'development' | 'production';
        };
    }
}