import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export function getTurboVersion() {
    const idx = process.argv.findIndex(arg => arg === '--turbo-version' || arg === '-tv');
    let lockFile = idx !== -1 && process.argv.length > idx + 1 ? process.argv[idx + 1] : null;

    if (!lockFile || !lockFile.includes("pnpm-lock.yaml")) {
        throw new Error('Lock file path not provided');
    }

    // Resolve relative to repo root (scripts/ -> root)
    lockFile = path.resolve(process.cwd(), '../../', lockFile);
    lockFile = path.normalize(lockFile);

    if (!fs.existsSync(lockFile)) throw new Error(`pnpm-lock.yaml not found at ${lockFile}`);

    const fileContent = fs.readFileSync(lockFile, 'utf8');
    const lock = yaml.load(fileContent) as any;

    try {
        // Access version in v7+ format
        const turboVersion = lock.importers['.'].devDependencies.turbo.version;
        if (!turboVersion) throw new Error();
        // create turbo.txt file in the same directory as pnpm-lock.yaml
        const outputPath = path.join(path.dirname(lockFile), 'turbo.txt');
        fs.writeFileSync(outputPath, turboVersion, 'utf8');
    } catch {
        throw new Error('Turbo not found in pnpm-lock.yaml (v7+ format expected)');
    }
}
