export default function PageWrapper({ children, className }) {
  return (
    <div
      className={`bg-[var(--color-secondary-light)] dark:bg-[#1a1d21]  min-h-[100svh] ${className}`}
    >
      {children}
    </div>
  );
}
