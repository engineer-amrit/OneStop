// src/classes/BaseController.ts
import type { Prisma } from "@database/prisma-ecom";
import { prisma } from "../../config/db.js";
import { BlockHandler, MediaController } from "@utils/api";


class BlockHandlerTx extends BlockHandler<Prisma.TransactionClient> {
  protected override async execute(body: (tx?: Prisma.TransactionClient) => Promise<void>) {
    await prisma.$transaction(async (tx) => {
      await body(tx);
    });
  }
}

export class MediaControllerTx extends MediaController<Prisma.TransactionClient> {
  protected override async execute(body: (context?: Prisma.TransactionClient | undefined) => Promise<void>): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await body(tx);
    });
  }
}

const blockHandlerTx = new BlockHandlerTx();
const blockHandler = new BlockHandler();
export class Block {
  createControllerTx = blockHandlerTx.createController.bind(blockHandlerTx)
  createController = blockHandler.createController.bind(blockHandler)
  createMiddlewareTx = blockHandlerTx.createMiddleware.bind(blockHandlerTx)
  createMiddleware = blockHandler.createMiddleware.bind(blockHandler)
}

export const block = new Block();


