import type { CustomLogger, Media } from "@utils/api";
import { block } from "@/classes/controllers/blockHandler.js"
import { mediaController } from "@/routers/admin-routes/advertise-router.js";
import type { Advertise, IdArray, ProductParamType } from "@schema/ecom";
import type { AdvertiseService } from "@/classes/services/advertise-service.js";
import type { AdvertiseDTOResponse } from "ecom";

export class AdvertiseController {
    constructor(private logger: CustomLogger,
        private advertise: AdvertiseService,
        private media: Media
    ) { }

    upload = mediaController.createController(async (req, res) => {
        const data = req.body as Advertise

        // ensure image exists
        await this.media.checkPath(req.body.image);

        const advertise = await this.advertise.create(data);

        this.logger.info(req, {
            action: "Advertise uploaded",
            message: `Advertise uploaded successfully`,
        });
        res.status(201).json({
            message: "Advertise uploaded successfully",
            advertise
        });
    }, "Error in uploading advertise");

    update = mediaController.createController(async (req, res) => {
        const { id } = req.params as Pick<ProductParamType, "id">;
        const data = req.body as Advertise
        const advertise = await this.advertise.update(data, id);
        this.logger.info(req, {
            action: "Advertise updated",
            message: `Advertise updated successfully`,
        });
        res.status(200).json({
            message: "Advertise updated successfully",
            advertise
        });
    }, "Error in updating advertise");

    delete = block.createController(async (req, res) => {
        const { id } = req.params as Pick<ProductParamType, "id">;
        await this.advertise.delete(id);
        this.logger.info(req, {
            action: "Advertise deleted",
            message: `Advertise deleted successfully`,
        });
        res.status(200).json({
            message: "Advertise deleted successfully"
        });

    }, "Error in deleting advertise")

    deleteMany = block.createController(async (req, res) => {
        const { ids } = req.body as IdArray
        await this.advertise.deleteMany(ids);
        this.logger.info(req, {
            action: "Advertises deleted",
            message: `Advertises deleted successfully`,
        });
        res.status(200).json({
            message: "Advertises deleted successfully"
        });
    }, "Error in deleting advertises")

    list = block.createController(async (_, res) => {
        const advertises = await this.advertise.list();
        res.status(200).json({
            message: "Advertises fetched successfully",
            advertises
        } satisfies AdvertiseDTOResponse);
    }, "Error in listing advertises")
}

