import type { Command } from "commander";
import { api } from "../utils/http.js";

export function secretCommands(program: Command) {
    const secret = program.command("secret").description("Secret operations");

    // CREATE SECRET
    secret
        .command("create")
        .requiredOption(
            "-n, --node-env <env>",
            "node environment (production, staging, development)"
        )
        .requiredOption(
            "-p, --project <name>",
            "project name"
        )
        .option(
            "-s, --set <key=value>",
            "set secret key-value pair (repeatable)",
            (value, previous: string[] = []) => {
                previous.push(value);
                return previous;
            },
            []
        )
        .action(async (options) => {
            const { nodeEnv, project, set } = options;

            if (!set.length) {
                throw new Error("At least one --set key=value is required");
            }

            const secrets: Record<string, string> = {};

            for (const pair of set) {
                const [key, ...rest] = pair.split("=");
                if (!key || rest.length === 0) {
                    throw new Error(`Invalid --set format: ${pair}`);
                }
                secrets[key] = rest.join("=");
            }

            const res = await api().post("/v1/secret", {
                nodeEnv,
                projectName: project,
                secrets
            });
            console.log(res.data);

        });


    // UPDATE SECRET (FULL OBJECT)
    secret
        .command("update")
        .argument("<fileName>")
        .argument("<key>")
        .argument("<value>")
        .action(async (fileName, key, value) => {
            await api().put("/v1/secret", {
                fileName,
                secretKey: key,
                secretValue: value
            });
            console.log("Secret updated");
        });

    // UPDATE SECRET VALUE (PATCH)
    secret
        .command("set")
        .argument("<fileName>")
        .argument("<key>")
        .argument("<value>")
        .description("Update secret value only")
        .action(async (fileName, key, value) => {
            await api().patch(`/v1/secret/update/${key}/${fileName}`, {
                secretValue: value
            });
            console.log("Secret value updated");
        });

    // RENAME SECRET KEY
    secret
        .command("rename")
        .argument("<fileName>")
        .argument("<oldKey>")
        .argument("<newKey>")
        .action(async (fileName, oldKey, newKey) => {
            await api().patch(`/v1/secret/rename/${oldKey}/${fileName}`, {
                newKeyName: newKey
            });
            console.log("Secret renamed");
        });

    // DELETE SECRET KEY
    secret
        .command("delete")
        .argument("<fileName>")
        .argument("<key>")
        .action(async (fileName, key) => {
            await api().delete(`/v1/secret/${key}/${fileName}`);
            console.log("Secret deleted");
        });

    // LIST SECRETS
    secret
        .command("list")
        .argument("<fileName>")
        .action(async (fileName) => {
            const res = await api().get(`/v1/secrets/${fileName}`);
            console.log(res.data);
        });
}
