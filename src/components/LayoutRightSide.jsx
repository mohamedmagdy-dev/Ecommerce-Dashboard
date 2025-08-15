import clsx from "clsx";
import { useEffect, useRef } from "react";

export default function LayoutRightSide({ toggleRightMenu, toggleRMenuFun }) {
  const layoutRef = useRef(null);
  const layoutStyle = clsx(
    "p-3 shadow-sm max-[400px]:w-[calc(100%-54px)] min-md:min-w-[240px] min-md:max-w-[240px] overflow-y-auto bg-white fixed  min-md:sticky max-md:min-h-screen min-md:top-0 right-0 duration-200 max-md:transform max-md:translate-x-[100%] ",
    toggleRightMenu && "!translate-x-[0] "
  );

  // handel Close Layout By Click any where
  useEffect(() => {
    function handelCloseLayout(event) {
      if (
        toggleRightMenu &&
        layoutRef.current &&
        !layoutRef.current.contains(event.target) &&
        window.innerWidth < 1024
      ) {
        toggleRMenuFun();
      }
    }
    document.addEventListener("mousedown", handelCloseLayout);
    return () => {
      document.removeEventListener("mousedown", handelCloseLayout);
    };
  }, [toggleRightMenu,toggleRMenuFun]);

  function SideLayout() {
    return (
      <div className={layoutStyle} ref={layoutRef}>
        Recent ActivityRecent Activity
      </div>
    );
  }

  return <>{toggleRightMenu && <SideLayout />}</>;
}
