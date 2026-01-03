import comingsoon from "@/assets/images/Gradient 3D Holographic Modern Coming Soon Twitter Post (1).jpg";
import { useGetData } from "@/hooks/tanStack/useGetData";
import useInfinite from "@/utils/infinite";
import { Banners } from "@/config/Types";
import { useState, useMemo, useEffect } from "react";
import { BeatLoader } from "react-spinners";




interface Imgprops {
    src: string;
    srcSet: string;
    alt: string;
    className: string;
}

const Banner = () => {

    // getting the banners
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetData<Banners>('banners', 'banners');

    // filtering the data
    const banners = useMemo(() => data?.pages.flatMap((el) => el["banners"] as Banners[]) || [], [data]);


    // infinite scrolling
    useInfinite({ isFetchingNextPage, hasNextPage, fetchNextPage })


    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index) => {
                if (index === 50) {
                    return 0;
                }
                return index + 1;
            });
        }, 6000);
        return () => clearInterval(interval);
    }
        , [banners]);

    if (banners.length) return (
        <div className="h-[min(12rem,45.50vw)] w-full relative overflow-hidden">
            <div className="h-[min(12rem,45.50vw)] w-full relative overflow-hidden">
                <div className="absolute flex w-full h-[min(12rem,45.50vw)]" style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: "transform 0.8s ease-in-out"
                }}>
                    {banners.length > 0 && Array.from({ length: 50 }, (_, index) => banners[index % banners.length]) // Repeat banners for 100 items
                        .map((banner, index) => (
                            <Img
                                key={index}
                                src={`cdn/?url=${banner.banner}&w=1920&h=400`}
                                srcSet={`cdn/?url=${banner.banner}&w=960&h=200 960w,cdn/?url=${banner.banner}&w=1920&h=400 1920w`}
                                alt={banner._id}
                                className="h-[min(12rem,45.50vw)] w-full object-fit flex-shrink-0"
                            />
                        ))}
                </div>
            </div>

        </div>
    )
    else return (
        <img src={comingsoon} alt="coming soon" className="h-[min(12rem,45.50vw)] w-full object-fit" />
    )
}

const Img = ({ src, srcSet, alt, className }: Imgprops) => {
    const [imgLoading, setImgLoading] = useState(true);
    return <>
        {imgLoading && (
            <div className="absolute top-0 right-0 bg-slate-200 bottom-0 left-0 z-10 flex items-center justify-center rounded-lg bg-cool-foreground">
                <BeatLoader color="#facc15" size={15}
                    loading={imgLoading}
                />
            </div>
        )}
        <img
            onLoad={() => setImgLoading(false
            )}
            srcSet={srcSet}
            alt={alt}
            src={src} className={className} /></>
}

export default Banner
