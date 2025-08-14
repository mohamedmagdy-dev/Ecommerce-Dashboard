import MenuIcon from "@mui/icons-material/Menu";
export default function ApplicationBar({ handleCollapseMenu, collapseMenu }) {
  const iconStyle = `hidden min-md:inline-flex cursor-pointer
            duration-200
              items-center 
             justify-center p-2 w-10 h-10 
             text-sm text-[var(--color-text-900)]
              dark:text-[var(--color-text-500)] rounded-lg
               hover:bg-gray-100 focus:outline-none focus:ring-2
                focus:ring-gray-200 
                 dark:hover:bg-[var(--color-primary-dark)] dark:focus:ring-[var(--color-primary-dark)]`;
  return (
    <nav className=" h-fit shadow-sm  bg-white dark:bg-[var(--color-secondary-900)] dark:border-gray-700">
      <div className=" p-3  flex items-center gap-4">
        <button
          onClick={() => handleCollapseMenu()}
          // data-collapse-toggle="navbar-hamburger"
          type="button"
          className={iconStyle}
          aria-controls="navbar-hamburger"
          aria-expanded={collapseMenu ? "false" : "true"}
        >
          <MenuIcon />
        </button>
        <h1 className="text-xl text-[var(--color-text-900)] dark:text-[var(--color-text-500)] font-bold">
          Ecommerce Dashboard
        </h1>
      </div>
    </nav>
  );
}
