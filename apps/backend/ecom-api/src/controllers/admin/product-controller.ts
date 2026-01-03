import { generalLogger } from "@/utils/logger.js";
import { MediaControllerTx } from "@/classes/controllers/blockHandler.js";
import type { ProductService } from "@/classes/services/product-service.js";
import type { IdArray, Product, ProductParamType, ProductQuery } from "@schema/ecom";
import { blockHandler, type CustomLogger, type Media } from "@utils/api";
import type { ProductStatusDto } from "ecom";
import { mediaService } from "@/classes/services/dependency-injection.js";

export const mediaPaths = ["thumbnail", "sideImages", "banner"];
const mediaController = new MediaControllerTx(
    mediaService,
    mediaPaths
);

export class ProductController {

    constructor(
        private product: ProductService,
        private media: Media,
        private logger: CustomLogger
    ) { }

    upload = mediaController.createController(async (req, res, tx) => {
        const data = req.body as Product;
        // ensure files are present
        await this.media.checkImagesExist([req.body.thumbnail, ...(req.body.sideImages)]);

        const product = await this.product.create(data, tx);

        res.status(201).json({
            message: "Product created successfully",
            product
        });

        generalLogger.info(req, {
            action: "Product created",
            message: `Product ${product.name} created successfully`,
        });

    }, "Error in creating product");

    update = mediaController.createController(async (req, res, tx) => {
        const { id } = req.params as Pick<ProductParamType, "id">;
        const data = req.body as Product;

        // ensure files are present
        await this.media.checkImagesExist([req.body.thumbnail, ...(req.body.sideImages)]);

        const product = await this.product.update(data, id, tx);

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

        generalLogger.info(req, {
            action: "Product updated",
            message: `Product ${product.name} updated successfully`,
        });

    }, "Error in updating product");

    delete = blockHandler.createController(async (req, res) => {
        const { id } = req.params;
        if (!id) {
            throw new Error("Product ID is required for deletion");
        }
        const product = await this.product.delete(id);

        await this.media.deleteFiles([product.thumbnail, ...(product.sideImages || [])], req);

        res.status(200).json({
            message: "Product deleted successfully",
            product
        });

        generalLogger.info(req, {
            action: "Product deleted",
            message: `Product with id ${id} deleted successfully`,
        });

    }, "Error in deleting product");

    status = blockHandler.createController(async (_, res) => {
        const data = await this.product.getStatusCounts();

        res.status(200).json({
            message: "Product status fetched successfully",
            productStatus: data
        } satisfies ProductStatusDto);
    }, "Error in fetching product status");

    changeStatus = blockHandler.createController(async (req, res, tx) => {
        const { ids } = req.body as IdArray
        const { status } = req.params as Required<Pick<ProductQuery, "status">>
        await this.product.changeStatus(ids, status, tx);

        res.status(200).json({
            message: "Product status changed successfully",
        });

        this.logger.info(req, {
            action: "Product status changed",
            message: `Product status changed to ${status} for ids: ${ids.join(", ")}`,
        });
    }, "Error in changing product status");

    deleteMany = blockHandler.createController(async (req, res, tx) => {
        const { ids } = req.body as IdArray;
        const products = await this.product.findManyByIds(ids, tx, {
            thumbnail: true,
            sideImages: true
        });
        await this.product.deleteMany(ids, tx);

        // collect all media paths
        const mediaPaths: string[] = [];
        products.forEach(prod => {
            mediaPaths.push(prod.thumbnail);
            if (prod.sideImages) {
                mediaPaths.push(...prod.sideImages);
            }
        });
        await this.media.deleteFiles(mediaPaths, req);

        res.status(200).json({
            message: "Products deleted successfully",
        });
    }, "Error in deleting multiple products");
}
