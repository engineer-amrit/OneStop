import fs from "fs";
import sharp from "sharp";
import { block } from "@/classes/controllers/blockHandler.js";
import { CustomError } from "@utils/api";
import type { ValidReq } from "@utils/api";
import type { NodeQuary, ProductParamType, ProductQuery } from "@schema/ecom";
import type { Node, NodeApi, ProductPaginatedDto } from "ecom";
import type { ProductService } from "@/classes/services/product-service.js";
import type { NodeService } from "@/classes/services/node-service.js";
import type { AdvertiseService } from "@/classes/services/advertise-service.js";

export class PublicController {
    constructor(
        private product: ProductService,
        private node: NodeService,
        private advertise: AdvertiseService
    ) { }
    cdn = block.createController(async (req, res) => {
        const { w, h, url } = req.query as { w?: string; h?: string; url: string };


        if (!url) {
            throw new CustomError({
                status: 400,
                message: "URL query parameter is required.",
                extraDetails: "Please provide a valid URL to the image.",
            });
        }



        // 🔹 Check if the file exists asynchronously
        await fs.promises.access(url);

        // Parse width and height, defaulting to null if not provided
        const width = w ? parseInt(w) : undefined;
        const height = h ? parseInt(h) : undefined;

        // Open file stream
        const fileHandle = await fs.promises.open(url, 'r');
        const readStream = fileHandle.createReadStream();

        let transformer = sharp();

        // Apply resizing without cropping
        if (width || height) {
            transformer = transformer.resize(width, height, { fit: "inside" });
        }

        // Stream the processed image back to the client
        res.type("image/jpeg");

        readStream
            .pipe(transformer)
            .pipe(res)
            .on("finish", async () => {
                await fileHandle.close(); // Close the file descriptor after response ends
            });

        readStream.on("error", async (err) => {
            console.error("Stream Read Error:", err);
            await fileHandle.close();
            res.status(500).send("Error reading file.");
        });

        transformer.on("error", async (err) => {
            console.error("Sharp Processing Error:", err);
            await fileHandle.close();
            res.status(500).send("Error processing image.");
        });
    }, "Error in serving CDN image");

    products = block.createController(async (req, res,) => {
        const ValidQuery = (req as ValidReq).ValidQuery as ProductQuery;

        const data = await this.product.list(ValidQuery);
        res.status(200).json({
            message: "Products fetched successfully",
            ...data
        } satisfies ProductPaginatedDto);
    }, "Error in fetching products");

    search = block.createController(async () => {

    }, "Error in searching products");

    nodeList = block.createController(async (req, res) => {
        const { type, include } = (req as ValidReq).ValidQuery as NodeQuary;

        let node = {} as Node;

        if (type !== "GROUP") {
            const key = this.node.getValue[type];
            node[key] = await this.node.listByType(type)
        } else if (include) {
            const data = await this.node.listInType(include);

            node = data.reduce((acc, curr) => {
                if (curr.type === "SUBCATEGORY") return acc;
                const key = this.node.getValue[curr.type];
                if (!(key in acc)) {
                    acc[key] = [];
                }
                acc[key]!.push(curr);
                return acc;
            }, {} as Node);
        }

        const response: NodeApi = {
            message: "Node fetched successfully",
            nodes: node
        }

        res.status(200).json(response);
    }, "Error in fetching node");

    getProduct = block.createController(async (req, res) => {
        const { id, slug } = req.params as ProductParamType;
        const product = await this.product.get({ id, slug });

        if (!product) {
            throw new CustomError({
                message: "Product not found",
                status: 404
            });
        }

        res.status(200).json({
            message: "Product details fetched successfully",
            product
        });
    }, "Error in fetching product details");

    suggestions = block.createController(async (req, res) => {
        const { search } = req.params as unknown as Required<Pick<ProductQuery, "search">>;
        const suggestions = await this.product.suggestions(search);
        res.status(200).json({
            message: "Product suggestions fetched successfully",
            suggestions
        });
    }, "Error in fetching product suggestions");

    advertises = block.createController(async (_, res) => {
        const advertises = await this.advertise.list();
        res.status(200).json({
            advertises
        });
    }, "Error in fetching advertises");
}