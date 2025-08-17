export default function H3({ title,style }) {
  return <h3 className={`text-gray-400 my-5 font-semibold dark:text-[var(--color-text-500)] ${style}`}>{title}</h3>;
}
