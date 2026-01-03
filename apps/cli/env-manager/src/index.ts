#!/usr/bin/env node
import { Command } from "commander";
import { fileCommands } from "./commands/files.js";
import { secretCommands } from "./commands/secrets.js";

const program = new Command();

program
    .name("envctl")
    .description("CLI for Secret API")
    .version("1.0.0");

fileCommands(program);
secretCommands(program);

program.parse();
