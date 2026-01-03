import type { NodeType, NodeWhereInput, Prisma, PrismaClient } from "@database/prisma-ecom";
import type { NodeDto, NodeKeys } from "ecom";

interface CommonNode {
    type: NodeType;
    parentId?: string;
}

interface NodeWithName extends CommonNode {
    name: string;
}

interface NodeWithValue extends CommonNode {
    value: number;
}

type Node = NodeWithName | NodeWithValue;

export class NodeService {
    constructor(private prisma: PrismaClient) {
    }
    async findById(id: string, tx: Prisma.TransactionClient = this.prisma) {
        return await tx.node.findUnique({ where: { id } });
    }

    async findByAll(data: Node, tx: Prisma.TransactionClient = this.prisma) {
        return await tx.node.findFirst({ where: data });
    }
    async findOrCreate(data: Node, tx: Prisma.TransactionClient = this.prisma) {
        let node = await this.findByAll(data, tx);
        if (!node) {
            node = await this.create(data, tx);
        }
        return node;
    }
    async findMany(where: NodeWhereInput, tx: Prisma.TransactionClient = this.prisma) {
        return await tx.node.findMany({ where });
    }
    async listInType(type: NodeType[], tx: Prisma.TransactionClient = this.prisma): Promise<NodeDto[]> {
        return await tx.node.findMany({ where: { type: { in: type } }, include: { children: true } });
    }
    async create(data: Node, tx: Prisma.TransactionClient = this.prisma) {
        return await tx.node.create({ data });
    }
    async update(data: Node, id: string, tx: Prisma.TransactionClient = this.prisma) {
        return await tx.node.update({
            where: { id },
            data
        })
    }
    async delete(id: string, tx: Prisma.TransactionClient = this.prisma) {
        return tx.node.delete({ where: { id } });
    }
    async findOrCreateMany(data: Node[], tx: Prisma.TransactionClient = this.prisma) {
        const results = [];
        for (const item of data) {
            const node = await this.findOrCreate(item, tx);
            results.push(node);
        }
        return results;
    }
    async deleteMany(ids: string[], tx: Prisma.TransactionClient = this.prisma) {
        return await tx.node.deleteMany({ where: { id: { in: ids } } });
    }
    async list(tx: Prisma.TransactionClient = this.prisma) {
        return await tx.node.findMany();
    }
    async listByType(type: NodeType, tx: Prisma.TransactionClient = this.prisma): Promise<NodeDto[]> {
        return await tx.node.findMany({ where: { type }, include: { children: true } });
    }
    async listByParent(parentId: string, tx: Prisma.TransactionClient = this.prisma) {
        return await tx.node.findMany({ where: { parentId } });
    }

    getValue = {
        UNIT: "units",
        CATEGORY: "categories",
        BRAND: "brands",
        GST: "gsts",
    } satisfies Record<Exclude<NodeType, "SUBCATEGORY">, NodeKeys>;
}