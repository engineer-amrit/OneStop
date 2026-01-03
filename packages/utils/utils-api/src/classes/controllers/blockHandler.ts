import type { Request, Response, NextFunction } from "express";
import { formatError } from "../middlewares/error-formattor.js";


export type ControllerBody<TContext = undefined> =
  undefined extends TContext
  ? (req: Request, res: Response, context?: TContext) => Promise<void> // context optional
  : (req: Request, res: Response, context: TContext) => Promise<void>;  // context required

export class BlockHandler<TContext = undefined> {
  /**
   * Hook for cleanup before passing the error
   */
  protected async beforeErrorHandling(_: Request, __: Response): Promise<void> { }

  /**
   * Default centralized error handling
   */
  protected async errorHandler(error: unknown, errorName: string, next: NextFunction) {
    const formattedError = formatError(error, errorName);
    next(formattedError);
  }

  /**
   * Execute the main controller body. Can be overridden to provide transactions or other context.
   */
  protected async execute(body: (context?: TContext) => Promise<void>): Promise<void> {
    await body(undefined as TContext); // default: no context
  }

  /**
   * Wrap controller function
   */
  createController(body: ControllerBody<TContext>, errorName: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await this.execute(ctx => body(req, res, ctx as TContext));
      } catch (error) {
        await this.beforeErrorHandling(req, res);
        await this.errorHandler(error, errorName, next);
      }
    };
  }

  /**
   * Wrap middleware function
   */
  createMiddleware(body: ControllerBody<TContext>, errorName: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await this.execute(ctx => body(req, res, ctx as TContext));
        next();
      } catch (error) {
        await this.beforeErrorHandling(req, res);
        await this.errorHandler(error, errorName, next);
      }
    };
  }
}

export const blockHandler = new BlockHandler();
