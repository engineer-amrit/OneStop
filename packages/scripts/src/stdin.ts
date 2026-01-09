// scripts/stdin.ts
export async function readStdin(): Promise<string> {
    return new Promise(resolve => {
        if (process.stdin.isTTY) {
            throw new Error('--changes must be used with piped input');
        }
        let data = '';
        process.stdin.setEncoding('utf8');
        process.stdin.resume();
        process.stdin.on('data', c => (data += c));
        process.stdin.on('end', () => resolve(data));
    });
}
