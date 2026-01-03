import { CustomError } from "@utils/api";
import { SecretUtils, type Config } from "./utils/secret-utils.js";

export class EnvService extends SecretUtils {

    constructor(config: Config) {
        super(config);

    }

    create() {
        // if file exists, throew error
        if (this.isFileExists()) {
            throw new CustomError({
                status: 400,
                message: "Secret file " + this.fileName + " already exists",
            })
            // else create file
        }

        this.createFile();

        // append data to file
        this.appendToFile();

        return this.fileName
    }

    update() {

        // if file does not exist, throw error
        if (!this.isFileExists()) {
            throw new CustomError({
                status: 404,
                message: "Secret file " + this.fileName + " does not exist",
            })
        }

        if (this.isduplicateKey()) {
            throw new CustomError({
                status: 400,
                message: "Duplicate keys found in secret data",
            })
        }

        this.appendToFile();

        return this.fileName
    }
}