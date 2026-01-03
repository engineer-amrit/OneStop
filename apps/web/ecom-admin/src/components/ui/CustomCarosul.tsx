import * as React from "react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BeatLoader } from "react-spinners";

export function ImgCarousel({
  images,
  size,
}: {
  images: string[];
  size: string;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      style={{
        width: `${size}`,
      }}
      className={`m-auto size-fit max-w-sm`}
    >
      <Carousel setApi={setApi} className="">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <Card img={img} size={size} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
      <span className="dots flex justify-center gap-1 p-3">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`size-[min(0.6640625rem,2.5vw)] cursor-pointer rounded-full ${index === current - 1 ? "bg-white" : "bg-secondary"
              }`}
          ></span>
        ))}
      </span>
    </div>
  );
}

const Card = ({ img, size }: { img: string; size: string }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div
          style={{
            height: `${size}`,
            width: `${size}`,
          }}
          className="absolute flex items-center justify-center bg-secondary"
        >
          <BeatLoader color="#fff" size={20} />
        </div>
      )}

      <img
        onLoad={() => setLoading(false)}
        // src={`/cdn/?url=${img}&w=500&h=500`}
        // srcSet={
        //   `/cdn/?url=${img}&w=300&h=300 300w,` +
        //   `/cdn/?url=${img}&w=400&h=400 400w,` +
        //   `/cdn/?url=${img}&w=500&h=500 500w`
        // }
        src={img}

        style={{
          height: `${size}`,
          width: `${size}`,
        }}
        className={`rounded-xl object-contain`}
        alt={img.split("/").slice(-1)[0].split(".")[0] || ""}
      />
    </>
  );
};
