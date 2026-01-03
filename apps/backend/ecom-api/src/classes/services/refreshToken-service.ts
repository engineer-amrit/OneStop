import { type PrismaClient, prisma } from "@database/prisma-ecom";
import { CustomError } from "@utils/api";

export class RefreshToken {
    constructor(private prisma: PrismaClient) {
    }
    private EXPIRATION_DAYS = 7;

    async create(userId: string) {
        return await this.prisma.refreshToken.create({
            data: { userId, expiresAt: new Date(Date.now() + this.EXPIRATION_DAYS * 24 * 60 * 60 * 1000) },
        }).then((e) => {
            return e.id;
        });
    }
    async verify(id: string) {
        const data = await this.prisma.refreshToken.delete({ where: { id } })
        if (!data) {
            throw new CustomError({
                status: 401,
                message: "Invalid or expired refresh token.",
                extraDetails: "The provided refresh token does not exist or has already been used.",
            });
        }
        return data;
    }
    async delete(id: string) {
        await this.prisma.refreshToken.delete({ where: { id } });
    }
}

export const refreshTokenService = new RefreshToken(prisma);