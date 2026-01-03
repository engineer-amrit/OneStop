import { RoleType, type PrismaClient } from "@database/prisma-ecom";
import type { User } from "@schema/ecom";
import type { RoleService } from "./role-service.js";

export class UserService {
    constructor(private prisma: PrismaClient, private role: RoleService) {
    }

    async getUserRole() {
        let role = await this.role.findByType(RoleType.USER);
        if (!role) {
            role = await this.role.create(RoleType.USER);
        }
        return role;
    }
    async init(data: User["phone"]) {
        const role = await this.getUserRole();
        return this.prisma.user.create({
            data: { phone: data, roleId: role.id },
            select: { id: true, phone: true, role: true },
        });
    }
    async create(data: User) {
        const role = await this.getUserRole();
        return this.prisma.user.create({ data: { ...data, roleId: role.id } });
    }
    async update(data: User, id: string) {
        return this.prisma.user.update({ where: { id }, data });
    }
    async delete(id: string) {
        return this.prisma.user.delete({ where: { id } });
    }
    async getById(id: string) {
        return this.prisma.user.findUniqueOrThrow({ where: { id }, include: { role: true } });
    }

    async list() {
        return this.prisma.user.findMany();
    }

    async findByPhone(phone: string) {
        return this.prisma.user.findUnique({ where: { phone }, include: { role: true } });
    }

    async existsByPhone(phone: string) {
        const user = await this.prisma.user.findUnique({ where: { phone } });
        return !!user;
    }

}