import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";

export default function NoResult({ title, desc }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-10 px-5 
      
                    text-center 
                    border-gray-300 dark:border-gray-600 
                    bg-gray-50 dark:bg-[var(--color-secondary-900)] 
                    text-gray-600 dark:text-[var(--color-text-500)] 
                    "
    >
      <div
        className="flex items-center justify-center w-16 h-16 
                      rounded-full bg-gray-200 dark:bg-gray-700 mb-4"
      >
        <TempleBuddhistIcon
          className="text-gray-500 dark:text-gray-300"
          fontSize="large"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
        {desc}
      </p>
    </div>
  );
}
