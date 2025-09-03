import clsx from "clsx";
import { useState } from "react";
export default function Slider({ main, thumbnails }) {
  const [mainImg, setMainImg] = useState(main);
  return (
    <div className="grid gap-4 select-none min-lg:w-[320px] sticky top-20">
      <div className="h-[258px] w-full">
        <img
          className=" h-full min-w-full object-cover max-w-full rounded-lg"
          src={mainImg}
          alt="Main Img"
        />
      </div>
      <div
        className={clsx("grid gap-3")}
        style={{ gridTemplateColumns: `repeat(${thumbnails.length},1fr)` }}
      >
        {thumbnails.map((thumb, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => {
                setMainImg(thumb);
              }}
            >
              <img
                className="h-auto max-w-full rounded-sm"
                src={thumb}
                alt="thumbnail"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
