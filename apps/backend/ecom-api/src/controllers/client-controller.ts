import type { RequestWithUser } from '../middleware/auth/tokenVerifier-middleware.js';
import { block } from "@/classes/controllers/blockHandler.js";
import type { AuthUserDto } from 'ecom';
import type { User, Address, ProductParamType } from '@schema/ecom';
import { blockHandler, type CustomLogger } from '@utils/api';
import type { UserService } from '@/classes/services/user-service.js';
import type { AuthService } from '@/classes/services/auth-service.js';
import type { CookieService } from '@/classes/services/cookie-service.js';
import type { AddressSerivce } from '@/classes/services/address-service.js';


export class ClientController {

  constructor(
    private logger: CustomLogger,
    private userService: UserService,
    private auth: AuthService,
    private cookie: CookieService,
    private address: AddressSerivce
  ) { }
  // Create profile controller
  updateProfile = blockHandler.createController(async (req, res) => {

    const { sub } = (req as RequestWithUser).decoded;
    const data = req.body as User
    const user = await this.userService.update(data, sub)
    res.status(200).json({
      message: "Profile updated successfully",
      user
    });

    this.logger.info(req, {
      action: "Profile updated",
      message: `User profile updated successfully for user ID: ${sub}`,
    });

  }, "Error in profile creation controller");

  // Get user data controller
  userData = block.createController(async (req, res) => {
    const { sub } = (req as RequestWithUser).decoded;
    const user = await this.userService.getById(sub) satisfies AuthUserDto;
    res.status(200).json({
      message: "User data fetched successfully",
      user
    });
  }, "Error in fetching user data controller");

  // Logout controller
  logout = block.createController(async (req, res) => {
    const { sub } = (req as RequestWithUser).decoded;
    await this.auth.logout(sub);
    this.cookie.clearAuth(res);
    this.cookie.clearCsrf(res);

    this.logger.info(req, {
      action: "User logged out",
      message: `User logged out successfully for user ID: ${sub}`,
    });

    res.status(200).json({
      message: "User logged out successfully",
    });

  }, "Error in user logout controller");

  addAddress = block.createController(async (req, res, tx) => {
    const id = (req as RequestWithUser).decoded.sub;
    const data = req.body as Address
    const address = this.address.create(data, id, tx);
    this.logger.info(req, {
      action: "Address added",
      message: "User address added successfully",
    });
    // Send response
    res.status(200).json({
      message: "Address added successfully",
      address
    });
  }, "Error in adding address");

  updateAddress = block.createController(async (req, res, tx) => {
    const id = (req as RequestWithUser).decoded.sub;
    const { id: addressId } = req.params as Pick<ProductParamType, 'id'>;
    const data = req.body as Address
    const address = await this.address.update(data, addressId, id, tx);
    this.logger.info(req, {
      action: "Address updated",
      message: "User address updated successfully",
    })
    // send response
    res.status(200).json({
      message: "Address updated successfully",
      address
    });
  }, "Error in updating address");

  deleteAddress = block.createController(async (req, res) => {
    const { id: addressId } = req.params as Pick<ProductParamType, 'id'>;
    await this.address.delete(addressId);
    this.logger.info(req, {
      action: "Address deleted",
      message: "User address deleted successfully",
    })
    // send response
    res.status(200).json({
      message: "Address deleted successfully",
    });
  }, "Error in deleting address");

  getAddresses = block.createController(async (req, res) => {
    const id = (req as RequestWithUser).decoded.sub;
    const addresses = await this.address.findAll(id);
    res.status(200).json({
      message: "Addresses fetched successfully",
      addresses
    });

  }, "Error in fetching addresses");
}
