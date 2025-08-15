import clsx from "clsx";

export function Button({ title, color, children, style }) {
  const buttonStyle = clsx(
    "min-w-[40px] h-[40px] rounded flex items-center justify-center duration-200 px-3 text-sm rounded-sm gap-2",
    color === "blue" &&
      "text-[var(--color-blue)]  hover:bg-[var(--color-blue)] hover:text-white bg-[var(--color-lightBlue)] dark:bg-[var(--color-darkBlue)] max-md:focus:text-white max-md:focus:bg-[var(--color-blue)]  ",
    color === "green" &&
      "text-[var(--color-green)]  hover:bg-[var(--color-green)] hover:text-white bg-[var(--color-lightGreen)] dark:bg-[var(--color-darkGreen)]  max-md:focus:text-white max-md:focus:bg-[var(--color-green)] ",
    color === "orange" &&
      "text-[var(--color-orange)]  hover:bg-[var(--color-orange)] hover:text-white bg-[var(--color-lightOrange)] dark:bg-[var(--color-darkOrange)]  max-md:focus:text-white max-md:focus:bg-[var(--color-orange)] ",
    color === "purple" &&
      "text-[var(--color-purple)]  hover:bg-[var(--color-purple)] hover:text-white bg-[var(--color-lightPurple)] dark:bg-[var(--color-darkPurple)]  max-md:focus:text-white max-md:focus:bg-[var(--color-purple)] ",
    style
  );
  return (
    <button className={buttonStyle}>
      {children}
      {!!title && title}
    </button>
  );
}
