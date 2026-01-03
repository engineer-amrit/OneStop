import type { Secret } from "@app/schema";
import { CustomError, ensureDirectoryExists } from "@utils/api";
import path from "path";
import fs from "fs";

export interface Config {
    dir: string;
    fileName?: string;
    data?: Secret;
}



export class SecretUtils {
    private nodeEnv?: Secret["nodeEnv"];
    private dir: string;
    private projectName?: string;
    protected fileName?: string;
    private filePath?: string;
    private secrets?: Secret["secrets"];

    constructor(config: Config) {
        if (config.fileName) {
            this.fileName = config.fileName;
            this.filePath = path.join(config.dir, this.fileName);
        }
        if (config.data) {
            const { secrets, nodeEnv, projectName } = config.data;
            this.secrets = secrets;
            this.nodeEnv = nodeEnv;
            this.projectName = projectName;
            this.fileName = `${this.projectName}.${this.nodeEnv}.env`;
            this.filePath = path.join(config.dir, this.fileName);
        }

        this.dir = config.dir;
        // ensure directory exists
        ensureDirectoryExists(this.dir);
    }

    isFileExists() {
        // check if file exists at this.filePath
        if (!this.filePath) return false;
        return fs.existsSync(this.filePath);
    }

    createFile() {
        // create file at this.filePath
        if (!this.filePath) return;
        return fs.writeFileSync(this.filePath, '');
    }

    appendToFile() {
        // append data to file
        if (!this.filePath || !this.secrets) return;
        const fileData = Object.entries(this.secrets)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n') + '\n';
        fs.appendFileSync(this.filePath, fileData);
    }

    listFiles() {
        // list all files in this.dir
        return fs.readdirSync(this.dir);
    }

    listFileContent() {
        // read file content at this.filePath in json format
        if (!this.filePath) return {};
        const content = fs.readFileSync(this.filePath, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim() !== '');
        const data: Record<string, string> = {};
        lines.forEach(line => {
            const [key, value] = line.split('=');
            if (key && value)
                data[key] = value;
        });
        return data;
    }

    isduplicateKey() {
        if (!this.filePath || !this.secrets) return false;
        const content = this.listFileContent();
        const keys = Object.keys(content);
        const newKeys = Object.keys(this.secrets);
        for (const key of newKeys) {
            if (keys.includes(key)) {
                return true;
            }
        }
        return false;
    }

    updateSecretValue(key: string, value: string) {
        if (!this.filePath) return;
        const content = this.listFileContent();
        if (!content[key]) throw new CustomError({
            status: 404,
            message: `Key ${key} not found in file`,
        });
        content[key] = value;
        const fileData = Object.entries(content)
            .map(([k, v]) => `${k}=${v}`)
            .join('\n') + '\n';
        fs.writeFileSync(this.filePath, fileData);
    }

    renameKey(oldKey: string, newKey: string) {
        if (!this.filePath) return;
        const content = this.listFileContent();
        if (content[oldKey]) {
            content[newKey] = content[oldKey];
            delete content[oldKey];
            const fileData = Object.entries(content)
                .map(([k, v]) => `${k}=${v}`)
                .join('\n') + '\n';
            fs.writeFileSync(this.filePath, fileData);
        }
    }

    deleteKey(key: string) {
        if (!this.filePath) return;
        const content = this.listFileContent();
        if (content[key]) {
            delete content[key];
            const fileData = Object.entries(content)
                .map(([k, v]) => `${k}=${v}`)
                .join('\n') + '\n';
            fs.writeFileSync(this.filePath, fileData);
        }
    }

    deleteFile() {
        if (!this.filePath) return;
        if (this.isFileExists()) {
            fs.unlinkSync(this.filePath);
        }
    }

    renameFile(newFileName: string) {
        if (!this.filePath) return;
        const newFilePath = path.join(this.dir, newFileName);
        if (this.isFileExists()) {
            fs.renameSync(this.filePath, newFilePath);
            this.fileName = newFileName;
            this.filePath = newFilePath;
        }
    }

}