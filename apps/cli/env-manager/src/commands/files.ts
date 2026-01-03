import type { Command } from "commander";
import { api } from "../utils/http.js";

export function fileCommands(program: Command) {
    const file = program.command("file").description("File operations");

    // LIST FILES
    file
        .command("list")
        .description("List all files")
        .action(async () => {
            const res = await api().get("/v1/files");
            console.log(res.data);
        });

    // DELETE FILE  ✅ YOU SAID THIS WAS MISSING
    file
        .command("delete")
        .argument("<fileName>")
        .description("Delete a file")
        .action(async (fileName) => {
            await api().delete(`/v1/file/${fileName}`);
            console.log("File deleted:", fileName);
        });

    // RENAME FILE
    file
        .command("rename")
        .argument("<oldName>")
        .argument("<newName>")
        .description("Rename a file")
        .action(async (oldName, newName) => {
            await api().patch(`/v1/file/rename/${oldName}`, {
                newFileName: newName
            });
            console.log("File renamed");
        });
}
