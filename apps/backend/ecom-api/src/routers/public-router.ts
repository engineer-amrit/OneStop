import { PublicController } from "../controllers/public/public-controller.js";
import express from "express";
import { nodeQuarySchema, productParamSchema, productQuerySchema } from "@schema/ecom";
import { blockHandler, Validator } from "@utils/api";
import { advertiseService, nodeService, productService } from "@/classes/services/dependency-injection.js";

const validator = new Validator(blockHandler).validator;

export const publicController = new PublicController(
    productService,
    nodeService,
    advertiseService
);

const router: express.Router = express.Router();

// get
router.get(
    "/product",
    validator({
        query: productQuerySchema
    })
    , publicController.products
);
router.get(
    "/product/:slug/:id",
    validator({
        params: productParamSchema
    }),
    publicController.getProduct
);

router.get(
    "/node",
    validator({
        query: nodeQuarySchema
    }),
    publicController.nodeList
)

router.get(
    "/search",
    publicController.search
);

router.get("/product-suggestions/:search", validator({
    params: productQuerySchema.pick({
        search: true
    }).required()
}), publicController.suggestions);

router.get("/advertises", publicController.advertises);

export default router;