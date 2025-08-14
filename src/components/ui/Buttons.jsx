import clsx from "clsx";

const globalStyle = `
duration-200
px-3
h-[40px]
 flex 
 cursor-pointer 
 rounded-sm
items-center
justify-center
text-sm
`;

export function GreenButton({ title, children }) {
  return (
    <button
      className={clsx(
        ` text-[var(--color-green)]  hover:bg-[var(--color-green)] focus:bg-[var(--color-green)] focus:text-white gap-2  hover:text-white bg-[var(--color-lightGreen)]   `,
        globalStyle
      )}
    >
      {children}
      {!!title && title}
    </button>
  );
}

export function BlueButton({ title, children }) {
  return (
    <button
      className={clsx(
        ` text-[var(--color-blue)]  hover:bg-[var(--color-blue)] focus:bg-[var(--color-blue)] focus:text-white hover:text-white bg-[var(--color-lightBlue)]   w-[40px]`,
        globalStyle
      )}
    >
      {children}
      {!!title && title}
    </button>
  );
}
