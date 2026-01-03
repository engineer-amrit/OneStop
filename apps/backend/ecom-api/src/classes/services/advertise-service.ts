import type { PrismaClient, Prisma } from "@database/prisma-ecom";
import type { Advertise } from "@schema/ecom";
import { AdvertiseDTO } from "ecom";

export class AdvertiseService {
    constructor(private prisma: PrismaClient) {
    }
    async create(data: Advertise, tx: Prisma.TransactionClient = this.prisma) {
        return await tx.advertise.create({
            data
        });
    }
    async update(data: Advertise, id: string, tx: Prisma.TransactionClient = this.prisma) {
        return await tx.advertise.update({
            where: { id },
            data
        });
    }
    async delete(id: string, tx: Prisma.TransactionClient = this.prisma) {
        return await tx.advertise.delete({
            where: { id }
        });
    }
    async deleteMany(ids: string[], tx: Prisma.TransactionClient = this.prisma) {
        return await tx.advertise.deleteMany({
            where: { id: { in: ids } }
        });
    }
    async findManybyIds(ids: string[], tx: Prisma.TransactionClient = this.prisma) {
        return await tx.advertise.findMany({
            where: { id: { in: ids } }
        });
    }

    async list(tx: Prisma.TransactionClient = this.prisma) {
        return await tx.advertise.findMany() satisfies AdvertiseDTO[];
    }
}