import { type PrismaClient, type Prisma, NodeType } from "@database/prisma-ecom";
import type { Variant } from "@schema/ecom";
import type { NodeService } from "./node-service.js";

export class VariantService {
    constructor(private prisma: PrismaClient, private node: NodeService) {
    }
    async createMany(
        data: Variant[],
        productId: string,
        tx: Prisma.TransactionClient = this.prisma
    ) {
        const units = [...new Set(data.map(v => ({
            type: NodeType.UNIT,
            name: v.unit
        })))];

        // 1. create nodes (safe, deduped)
        const unitNodes = await this.node.findOrCreateMany(units, tx);
        // 2. fetch nodes

        const unitMap = new Map(
            unitNodes.map(n => [n.name!, n.id])
        );

        // 3. create variants
        return await tx.variant.createMany({
            data: data.map((v) => {
                const { unit, ...rest } = v;
                return {
                    ...rest,
                    productId,
                    unitId: unitMap.get(unit)!,
                    name: `${v.magnitude} ${v.unit}`,
                }
            }),
        });

    }
    async create(data: Variant, productId: string, tx: Prisma.TransactionClient = this.prisma) {
        const { unit, ...rest } = data;
        const unitId = await this.node.findOrCreate({
            type: NodeType.UNIT,
            name: unit
        }, tx).then(e => e.id);

        const name = `${rest.magnitude} ${unit}`;

        return await tx.variant.create({
            data: {
                ...rest,
                unitId,
                productId,
                name,
            }
        })
    }
    async delete(id: string, tx: Prisma.TransactionClient = this.prisma) {
        return tx.variant.delete({ where: { id } });
    }
    async deleteMany(productId: string, tx: Prisma.TransactionClient = this.prisma) {
        return tx.variant.deleteMany({ where: { productId } });
    }
}