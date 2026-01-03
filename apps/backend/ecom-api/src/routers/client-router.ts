import express from "express";
import { user, address, productParamSchema } from "@schema/ecom";
import { blockHandler, Validator } from "@utils/api";
import { ClientController } from "../controllers/client-controller.js";
import { generalLogger } from "@/utils/logger.js";
import { authService, addressService, cookieService, userService } from "@/classes/services/dependency-injection.js";

const validator = new Validator(blockHandler).validator;

const clientController = new ClientController(
    // dependencies will be injected here
    generalLogger,
    userService,
    authService,
    cookieService,
    addressService
);

const router: express.Router = express.Router();
// post
router.post("/address", validator({ body: address }), clientController.addAddress);


// get
router.get("/", clientController.userData);
router.get("/logout", clientController.logout);
router.get("/address", clientController.getAddresses);

// put
router.put("/profile", validator({ body: user }), clientController.updateProfile);
router.put("/address/:id", validator({
    body: address, params: productParamSchema.pick({
        id: true
    })
}), clientController.updateAddress);

// delete
router.delete("/address/:id", clientController.deleteAddress);

export default router;
