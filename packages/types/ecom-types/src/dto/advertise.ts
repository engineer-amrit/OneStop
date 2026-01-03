import { ApiSuccess } from "common";

export type AdvertiseType = 'BANNER' | 'POPUP';

export interface AdvertiseDTO {
    id: string;
    type: AdvertiseType;
    createdAt: Date;
    updatedAt: Date;
    message: string | null;
    title: string;
    image: string | null;
    videoUrl: string | null;
    redirectUrl: string | null;
}

export type AdvertiseDTOResponse = ApiSuccess<"advertises", AdvertiseDTO[]>;