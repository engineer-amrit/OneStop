// scripts/changes.ts
import { readStdin } from './stdin.js';

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
    return args[allowIndex + 1]?.split(',').map(s => s.trim()) || [];
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

    if (args.includes('--apps')) {
        const data = items.filter(i => i.name.includes("apps"))
            .map(getImageName);
        console.log(JSON.stringify(data));
    }
    else if (args.includes("--allow")) {
        const allowList = getAllowList(args);
        const data = items.filter(i => allowList.includes(i.name)
        )
            .map(getImageName);
        console.log(JSON.stringify(data));

    } else {
        console.log(JSON.stringify(items));
    }
}
