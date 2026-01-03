import express from "express";
import upload, { pathExtractor } from "@/middleware/media/multer-middleware.js";
import { ProductController, mediaPaths } from "@/controllers/admin/product-controller.js";
import { Validator, MediaController } from "@utils/api";
import { idArraySchema, product, productQuerySchema } from "@schema/ecom";
import { productService, mediaService } from "@/classes/services/dependency-injection.js";
import { generalLogger } from "@/utils/logger.js";

const router: express.Router = express.Router();

const mediaController = new MediaController(
    mediaService,
    mediaPaths
);
const productController = new ProductController(productService, mediaService, generalLogger);

const validator = new Validator(mediaController).validator

const productMedia = upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "sideImages", maxCount: 6 },
]);


// post 
router.post(
    "/product", productMedia, pathExtractor, validator({
        body: product
    }), productController.upload
);

// put
router.put(
    "/product/:id",
    productMedia,
    pathExtractor,
    validator({
        body: product
    }),
    productController.update
);

// delete 
router.delete(
    "/product/:id",
    productController.delete
);

//detete
router.delete(
    "/products",
    productController.deleteMany
);

// get
router.get("/product/status", productController.status);

// patch
router.patch(
    "/product/status/:status",
    validator({
        body: idArraySchema,
        params: productQuerySchema.pick({
            status: true
        }).required()
    }),
    productController.changeStatus
)

export { router as productAdminRouter };