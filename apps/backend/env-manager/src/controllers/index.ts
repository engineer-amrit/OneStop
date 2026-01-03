import type { DeleteSecretFile, DeleteSecretKey, NewFileName, NewKeyName, Secret, SecretValue } from '@app/schema';
import { blockHandler } from '@utils/api';
import { EnvService } from '../services/secret-service.js';

const dir = './secrets';

const createSecret = blockHandler.createController(async (req, res) => {
    const data = req.body as Secret
    const service = new EnvService({
        dir,
        data,
    });
    const result = service.create();
    res.status(201).json({ message: "Secret created successfully", result });
}, "Error in adding secret");

const deletefile = blockHandler.createController(async (req, res) => {
    const fileName = (req.params as DeleteSecretFile).fileName
    const service = new EnvService({
        dir,
        fileName,
    });

    service.deleteFile();
    res.status(200).json({ message: "Secret deleted successfully" });
}, "Error in deleting secret")

const updateSecret = blockHandler.createController(async (req, res) => {
    const data = req.body as Secret
    const service = new EnvService({
        dir,
        data,
    });
    const result = service.update();
    res.status(200).json({ message: "Secret updated successfully", result });
}, "Error in updating secret");

const renameFile = blockHandler.createController(async (req, res) => {
    const fileName = (req.params as DeleteSecretFile).fileName
    const newFileName = (req.body as NewFileName).newFileName;
    const service = new EnvService({
        dir: './secrets',
        fileName,
    });
    service.renameFile(newFileName);
    res.status(200).json({ message: "File renamed successfully" });
}, "Error in renaming file");

const renameSecretKey = blockHandler.createController(async (req, res) => {
    // to be implemented
    const { fileName, secretKey } = (req.params as DeleteSecretKey)

    const service = new EnvService({
        dir,
        fileName,
    });
    service.renameKey(secretKey, (req.body as NewKeyName).newKeyName);
    res.status(200).json({ message: "Secret key renamed successfully" });

}, "Error in renaming secret key");

const deleteSecretKey = blockHandler.createController(async (req, res) => {
    const { fileName, secretKey } = (req.params as DeleteSecretKey)
    const service = new EnvService({
        dir,
        fileName,
    });
    service.deleteKey(secretKey);
    res.status(200).json({ message: "Secret key deleted successfully" });
}, "Error in deleting secret key");

const updateSecretValue = blockHandler.createController(async (req, res) => {
    const { fileName, secretKey } = (req.params as DeleteSecretKey)
    const newValue = (req.body as SecretValue).secretValue;
    const service = new EnvService({
        dir,
        fileName,
    });
    service.updateSecretValue(secretKey, newValue);
    res.status(200).json({ message: "Secret value updated successfully" });
}, "Error in updating secret value");

const listFiles = blockHandler.createController(async (_, res) => {
    const service = new EnvService({ dir });
    const files = service.listFiles();
    res.status(200).json({ files });
}, "Error in listing files");

const listSecrets = blockHandler.createController(async (req, res) => {
    const fileName = req.params.fileName;
    const service = new EnvService({ dir, fileName });
    const secrets = service.listFileContent();
    res.status(200).json({ secrets });
}, "Error in listing secrets");



export { createSecret, renameSecretKey, deletefile, updateSecret, renameFile, deleteSecretKey, updateSecretValue, listFiles, listSecrets };