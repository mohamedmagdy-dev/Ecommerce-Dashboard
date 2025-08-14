export default function PageWrapper({ children }) {
  return (
    <div className="bg-[var(--color-secondary-light)] dark:bg-[#1a1d21] p-5 min-h-[calc(100svh-64px)]">
      {children}
    </div>
  );
}
