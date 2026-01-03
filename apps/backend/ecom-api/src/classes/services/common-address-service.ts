import type { Prisma, PrismaClient } from "@database/prisma-ecom";
import type { CommonAddress } from "@schema/ecom";

export class CommonAddressService {

    constructor(protected prisma: PrismaClient) { }

    async create(data: CommonAddress, tx: Prisma.TransactionClient = this.prisma) {
        return await tx.commonAddress.create({
            data
        });
    }

    async find(data: CommonAddress, tx: Prisma.TransactionClient = this.prisma) {
        return await tx.commonAddress.findUnique({
            where: {
                state_city_pincode: data
            }
        });
    }

    async findOrCreate(data: CommonAddress, tx: Prisma.TransactionClient = this.prisma) {

        let commonAddress = await this.find(data, tx);

        if (!commonAddress) {
            commonAddress = await this.create(data, tx);
        };
        return commonAddress;
    }
}

