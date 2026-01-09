import { runEnv } from './generate-env.js';
import { runChanges } from './changes.js';
import { getTurboVersion } from './getTurboVersion.js';

const args = process.argv.slice(2);

const hasEnv = args.includes('-e') || args.includes('--env');
const hasChanges = args.includes('-c') || args.includes('--changes');
const hasTurboVersion = args.includes('-tv') || args.includes('--turbo-version');

if (hasEnv && hasChanges) {
    console.error('❌ Use only one mode at a time');
    process.exit(1);
}

(async () => {
    if (hasEnv) {
        runEnv();
        return;
    }

    if (hasChanges) {
        await runChanges(args);
        return;
    }

    if (hasTurboVersion) {
        const version = getTurboVersion();
        console.log(version);
        return;
    }

    console.error(`
❌ No mode specified

Usage:
  -e, --env        Generate env.js
  -c, --changes --[filter name]   Read turbo affected JSON from stdin
  -tv, --turbo-version   Get Turbo version from pnpm-lock.yaml

filter name:
  --apps       Filter affected packages to only apps
  --allow     Filter affected packages by allow list (space separated)

Examples:
  pnpm tsx scripts/run.ts --env
  pnpm turbo ls --affected --output=json | pnpm tsx scripts/run.ts --changes --apps
`);
    process.exit(1);
})();
