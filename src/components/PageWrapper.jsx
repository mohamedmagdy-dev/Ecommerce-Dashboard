export default function PageWrapper({ children, className = "" }) {
  return (
    <div
      className={`bg-[var(--color-secondary-light)]  dark:bg-[#1a1d21] min-h-[calc(100vh-52px)] min-md:min-h-[calc(100vh-124px)] ${className}`}
    >
      {children}
    </div>
  );
}
