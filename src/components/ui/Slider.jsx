import clsx from "clsx";
import { useState } from "react";
export default function Slider({ main, thumbnails }) {
  const [mainImg, setMainImg] = useState(main);
  return (
    <div className="grid gap-4 select-none min-lg:w-[320px] ">
      <div className="h-[258px]">
        <img
          className=" h-full max-w-full rounded-lg"
          src={mainImg}
          alt="Main Img"
        />
      </div>
      <div className={clsx("grid gap-4", `grid-cols-${thumbnails.length}`)}>
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
                className="h-auto max-w-full rounded-lg"
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
