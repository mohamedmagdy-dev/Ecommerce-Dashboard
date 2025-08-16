import { useEffect, useState } from "react";
import axios from "axios";
export default function RecentActivity() {
  const [activates, setActivates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getActivates() {
      try {
        const response = await axios.get("/Api/RecentActivity.json");
        setActivates(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err)
        setIsLoading(true);
      }
    }
    getActivates();
  }, []);

  function AllActivates() {
    return (
      <ol className="mx-3 relative border-s flex flex-col gap-8 border-dashed border-gray-200 dark:border-gray-700">
        {activates.map((activate, index) => {
          return (
            <li key={index} className=" ms-5">
              <span className="absolute  flex items-center justify-center w-6 h-6 rounded-full -start-3 ">
                <img
                  src={activate.userAvatar}
                  alt="avatar"
                  className="rounded-full"
                />
              </span>
              <h3 className="flex items-center mb-1 text-sm font-semibold text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] ">
                {activate.activityName}
              </h3>
              <p className="mb-2 text-sm font-normal text-[var(--color-text-800)]">
                {activate.activityDesc}
              </p>
              <time className="block mb-2 text-sm font-normal leading-none text-[var(--color-text-800)]">
                {activate.activityTime}
              </time>
            </li>
          );
        })}
      </ol>
    );
  }
  return (
    <div className="h-[400px] overflow-y-auto ">

      {!isLoading && <AllActivates />}
    </div>
  );
}
