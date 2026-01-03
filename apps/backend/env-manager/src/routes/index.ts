import express, { type Router } from 'express';
import { createSecret, deletefile, deleteSecretKey, listFiles, listSecrets, renameFile, renameSecretKey, updateSecret, updateSecretValue } from '../controllers/index.js';
import { secret, deleteFile, deleteSecret, newFileName, newKeyName, secretValue } from '@app/schema';
import { validator, apiMiddleware } from '@utils/api';
import { env } from '../config/env.js';

const router: Router = express.Router();

router.use(apiMiddleware(env, "x-api-key"));

// Define your routes here
router.post('/v1/secret', validator({ body: secret }), createSecret);

router.put('/v1/secret', validator({ body: secret }), updateSecret);


router.delete('/v1/secret/:secretKey/:fileName', validator({ params: deleteSecret }), deleteSecretKey);

router.delete('/v1/file/:fileName', validator({ params: deleteFile }), deletefile);

router.patch("/v1/file/rename/:fileName", validator({
    params: deleteFile,
    body: newFileName
}), renameFile);

router.patch("/v1/secret/rename/:secretKey/:fileName", validator({
    params: deleteSecret,
    body: newKeyName
}), renameSecretKey);

router.patch("/v1/secret/update/:secretKey/:fileName", validator({
    params: deleteSecret,
    body: secretValue
}), updateSecretValue);

router.get('/v1/files', listFiles);
router.get('/v1/secrets/:fileName', validator({
    params: deleteFile,
}), listSecrets);

export default router;