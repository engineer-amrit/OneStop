import build from 'esbuild';
console.log('Building scripts package...');

build.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outdir: 'tools',
    platform: 'node',
    target: ['node14'],
    format: "esm"
}).catch(() => process.exit(1));

console.log('Build complete.');
