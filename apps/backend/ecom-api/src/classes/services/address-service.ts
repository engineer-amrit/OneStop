import type { Prisma, PrismaClient } from "@database/prisma-ecom";
import type { Address } from "@schema/ecom";
import { CustomError } from "@utils/api";
import type { CommonAddressService } from "./common-address-service.js";


export class AddressSerivce {
    constructor(protected prisma: PrismaClient, protected commonAddress: CommonAddressService) { }
    count = async (userId: string, tx: Prisma.TransactionClient = this.prisma) => {
        return await tx.userAddress.count({
            where: { userId }
        });
    }

    findAll = async (userId: string, tx: Prisma.TransactionClient = this.prisma) => {
        return await tx.userAddress.findMany({
            where: { userId },
            orderBy: [
                { isDefault: "desc" }, // ✅ default (true) comes first
                { createdAt: "asc" },  // optional: sort the rest
            ],
        });
    }

    async findById(id: string) {
        return await this.prisma.userAddress.findUniqueOrThrow({ where: { id } });
    }

    async isDuplicate(data: Address, commonAddressId: string, userId: string, tx: Prisma.TransactionClient = this.prisma) {
        const address = await tx.userAddress.findFirst({
            where: {
                streetAddress1: data.streetAddress1,
                streetAddress2: data.streetAddress2,
                commonAddressId,
                userId
            }
        })
        if (address) {
            throw new CustomError(
                {
                    message: "Address already exists",
                    status: 400,
                }
            )
        }
    }

    create = async (data: Address, userId: string, tx: Prisma.TransactionClient = this.prisma) => {
        const { state, city, pincode, ...rest } = data;
        const { id } = await this.commonAddress.findOrCreate({
            state, city, pincode
        }, tx);

        await this.isDuplicate(data, id, userId, tx);

        if (await this.count(userId, tx) == 0) {
            rest.isDefault = true;
        }

        await this.setDefaultAdd(data.isDefault, userId, tx);

        return await tx.userAddress.create({
            data: {
                userId,
                commonAddressId: id,
                ...rest
            }
        });

    }

    async update(data: Address, id: string, userId: string, tx: Prisma.TransactionClient = this.prisma) {
        const { state, city, pincode, ...rest } = data;
        const { id: ID } = await this.commonAddress.findOrCreate({
            state, city, pincode
        });
        await this.isDuplicate(data, ID, userId, tx);
        await this.setDefaultAdd(data.isDefault, userId, tx, id);
        return await tx.userAddress.update({
            where: {
                id
            },
            data: {
                commonAddressId: ID,
                ...rest
            }
        });

    };

    delete = async (id: string, tx: Prisma.TransactionClient = this.prisma) => {
        const { isDefault } = await tx.userAddress.delete({ where: { id } });
        if (isDefault) {
            // find random address and set it as default
            await tx.userAddress.update({
                where: {
                    id
                },
                data: {
                    isDefault: true,
                }
            });
        }
    };

    async setDefaultAdd(isDefault: boolean, userId: string, tx: Prisma.TransactionClient = this.prisma, id?: string,) {
        if (isDefault) {
            // Make this one default → unset all others
            await tx.userAddress.updateMany({
                where: id ? {
                    userId: userId, id: { not: id }
                } : { userId },
                data: { isDefault: false },
            });
        } else if (id) {
            // User is trying to set current default to false
            const current = await this.findById(id);
            if (current.isDefault) {
                // Find another address to promote
                const fallback = await tx.userAddress.findFirst({
                    where: { userId: id, id: { not: id } },
                    orderBy: { createdAt: "asc" },
                });
                if (fallback) {
                    await tx.userAddress.update({
                        where: { id: fallback.id },
                        data: { isDefault: true },
                    });
                }
            }
        }
    }
}
