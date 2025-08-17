import clsx from "clsx";

export function Button({
  title,
  color,
  children,
  style,
  type = "button",
  onClick,
}) {
  const buttonStyle = clsx(
    "min-w-[40px] h-[40px] rounded flex items-center justify-center duration-200 px-3 text-sm rounded-sm gap-2",
    color === "blue" &&
      "text-[var(--color-blue)]  hover:bg-[var(--color-blue)] hover:text-white bg-[var(--color-lightBlue)] dark:bg-[var(--color-darkBlue)] max-md:focus:text-white max-md:focus:bg-[var(--color-blue)]  ",
    color === "green" &&
      "text-[var(--color-green)]  hover:bg-[var(--color-green)] hover:text-white bg-[var(--color-lightGreen)] dark:bg-[var(--color-darkGreen)]  max-md:focus:text-white max-md:focus:bg-[var(--color-green)] ",
    color === "orange" &&
      "text-[var(--color-orange)]  hover:bg-[var(--color-orange)] hover:text-white bg-[var(--color-lightOrange)] dark:bg-[var(--color-darkOrange)]  max-md:focus:text-white max-md:focus:bg-[var(--color-orange)] ",
    color === "purple" &&
      "text-[var(--color-orange)]  hover:bg-[var(--color-orange)] hover:text-white bg-[var(--color-lightOrange)] dark:bg-[var(--color-darkOrange)]  max-md:focus:text-white max-md:focus:bg-[var(--color-orange)] ",
    color === "red" &&
      "text-[#f0657e]  hover:bg-[#f0657e] hover:text-white bg-[#fce7e3] dark:bg-[#402e2e]  max-md:focus:text-white max-md:focus:bg-[#f0657e] ",
    style
  );
  return (
    <button
      className={buttonStyle}
      type={type}
      onClick={onClick ? () => onClick() : undefined}
    >
      {children}
      {!!title && title}
    </button>
  );
}
