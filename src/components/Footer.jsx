export default function Footer() {
  return (
    <footer className="bg-white shadow-sm p-5 gap-5 flex justify-between items-center flex-wrap  dark:bg-[var(--color-secondary-900)] dark:border-gray-700">
      <span className="text-sm text-gray-500  dark:text-gray-400 ">
        © {new Date().getFullYear()}{" "}
        <a href="#" className="hover:underline">
          Mego
        </a>
        . All Rights Reserved.
      </span>
      <span className="text-sm text-gray-500  dark:text-gray-400">
        Design by Themesbrand & Develop by Me :)
      </span>
    </footer>
  );
}
