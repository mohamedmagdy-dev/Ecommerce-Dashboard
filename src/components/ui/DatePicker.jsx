export default function DatePicker({ style, getDate }) {
  return (
    <input
      onInput={(e) => getDate(e.target.value)}
      type="date"
      className={` ${style} border max-sm:grow border-[var(--color-text-900)] dark:border-white dark:text-white dark:bg-[var(--color-primary-dark)] text-[var(--color-text-900)] text-sm h-[40px] px-3 rounded bg-white cursor-pointer`}
    />
  );
}
