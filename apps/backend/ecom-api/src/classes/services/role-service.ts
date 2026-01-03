import type { PrismaClient, RoleType } from "@database/prisma-ecom";
export class RoleService {
    constructor(private prisma: PrismaClient) {
    }
    async create(name: RoleType) {
        return this.prisma.role.create({ data: { name } });
    }
    async update(id: string, name: RoleType) {
        return this.prisma.role.update({
            where: { id }, data: {
                name
            }
        });
    }
    async delete(id: string) {
        return this.prisma.role.delete({ where: { id } });
    }
    async getById(id: string) {
        return this.prisma.role.findUnique({ where: { id } });
    }
    async list() {
        return this.prisma.role.findMany();
    }
    async findByType(name: RoleType) {
        return this.prisma.role.findUnique({ where: { name } });
    }
}