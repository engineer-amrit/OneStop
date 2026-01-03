import fs from "fs";
import path from "path";
import os from "os";

const CONFIG_PATH = path.join(os.homedir(), ".envctl/config.json");

export function loadConfig() {
    if (!fs.existsSync(CONFIG_PATH)) {
        console.error("CLI config not found. Run: envctl init")
        process.exit(1);
    }

    return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}
