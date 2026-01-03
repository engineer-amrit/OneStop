import express from 'express'
import { Validator } from '@utils/api';
import { advertiseSchema } from '@schema/ecom';
import { MediaController } from '@utils/api';
import { mediaService, advertiseService } from '@/classes/services/dependency-injection.js';
import upload, { pathExtractor } from '@/middleware/media/multer-middleware.js';
import { AdvertiseController } from '@/controllers/admin/advertise-controller.js';
import { accessLogger } from '@/utils/logger.js';


const router: express.Router = express.Router();
const paths = ['image'];
const advertiseMedia = upload.single(paths[0]!);
export const mediaController = new MediaController(
    mediaService,
    paths
);
const validator = new Validator(mediaController).validator
const advertiseController = new AdvertiseController(accessLogger, advertiseService, mediaService);

router.post(
    "/advertise",
    advertiseMedia,
    pathExtractor,
    validator({
        body: advertiseSchema
    }),
    advertiseController.upload
);

export { router as advertiseAdminRouter };