import { z } from 'zod';

enum AdvertiseType {
    BANNER = 'BANNER',
    POPUP = 'POPUP',
}


const advertiseSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be at most 100 characters'),
    type: z.enum([AdvertiseType.BANNER, AdvertiseType.POPUP]),
    image: z.string().min(1, 'Image is required').optional(),
    message: z.string().optional(),
    videoUrl: z.string().optional(),
    redirectUrl: z.string().optional(),
    isDraft: z.string().transform((val) => val === "true"),
}).superRefine((data, ctx) => {
    const { type } = data
    switch (type) {
        case AdvertiseType.BANNER:
            // either image or videoUrl must be provided
            if (!data.image && !data.videoUrl) {
                ctx.addIssue({
                    code: "custom",
                    path: ['image'],
                    message: 'Either image or videoUrl must be provided for BANNER type',
                });
            }

        case AdvertiseType.POPUP:
            // either message or image must be provided
            if (!data.message && !data.image) {
                ctx.addIssue({
                    code: "custom",
                    path: ['image'],
                    message: 'Either message or image must be provided for POPUP type',
                });
            }
    }
});


export { AdvertiseType, advertiseSchema };
export type Advertise = z.infer<typeof advertiseSchema>;