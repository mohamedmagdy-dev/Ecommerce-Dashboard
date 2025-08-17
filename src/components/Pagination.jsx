import clsx from "clsx";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap   w-fit justify-center px-3 py-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(
          "cursor-pointer px-4  mr-2 border select-none border-[var(--color-primary-light)]  rounded-sm",
          currentPage === 1
            ? "opacity-55  dark:text-gray-200"
            : "text-[#41528a]",
          currentPage !== 1 && "cursor-pointer"
        )}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={clsx(
            "cursor-pointer flex justify-center select-none items-center w-8 h-8 font-bold rounded-sm",
            currentPage === i + 1
              ? "text-white bg-[var(--color-primary-light)]"
              : "bg-white shadow-sm"
          )}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(
          " px-4  ml-2 border select-none border-[var(--color-primary-light)]  rounded-sm",
          currentPage === totalPages
            ? "opacity-55 dark:text-gray-200"
            : "text-[#41528a]",
          currentPage !== totalPages && "cursor-pointer"
        )}
      >
        Next
      </button>
    </div>
  );
}
