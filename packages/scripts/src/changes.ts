// scripts/changes.ts
import path from 'path';
import { readStdin } from './stdin.js';
import fs from 'fs';

type Item = {
    name: string;
    path: string;
};

interface Affected {
    packageManager: string;
    packages: {
        count: number;
        items: Item[];
    };
}

const getAllowList = (args: string[]): string[] => {
    const allowIndex = args.indexOf('--allow');
    if (allowIndex === -1 || allowIndex === args.length - 1) {
        return [];
    }
    // formate --allow pkg1 pkg2 pkg3
    return args.slice(allowIndex + 1).filter(arg => !arg.startsWith('--'));
}

const getImageName = (iteam: Item) => {
    return {
        ...iteam,
        imageName: iteam.name.replace('@', '').replace('/', '-')
    }
}

export async function runChanges(args: string[]) {
    const input = await readStdin();
    const affected: Affected = JSON.parse(input);
    const items = affected.packages.items;

    let data

    if (args.includes('--apps')) {
        data = items.filter(i => i.name.includes("apps"))
            .map(getImageName);
    }
    else if (args.includes("--allow")) {
        const allowList = getAllowList(args);
        data = items.filter(i => allowList.includes(i.name)
        )
            .map(getImageName);

    } else {
        throw new Error('No valid filter provided. Use --apps or --allow [list]');
    }

    // Output matrix.txt for GitHub Actions at current working directory
    let outputPath = path.resolve(process.cwd(), "../../", 'matrix.txt');
    outputPath = path.normalize(outputPath);
    fs.writeFileSync(outputPath, JSON.stringify(data), 'utf8');
}
