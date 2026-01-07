export { };
declare global {
    interface Window {
        __ENV__: {
            SERVER_URL: string;
            NODE_ENV: 'development' | 'production';
        };
    }
}