import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function TopCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get("/Api/TopCategories.json");
        setCategories(response.data.categories);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(true);
      }
    }
    getCategories();
  }, []);

  return (
    <div className="mt-3 mb-8 ">
      <ol>
        {!isLoading &&
          categories.map((category, index) => {
            return (
              <li
                key={index}
                className="text-sm mb-3 text-[var(--color-text-800)] flex justify-between items-center"
              >
                <span>
                  {index + 1}.{category.categoryName}
                </span>
                <span>({category.count})</span>
              </li>
            );
          })}
      </ol>
      <Link className="block  text-center text-sm underline text-[var(--color-text-900)] dark:text-[var(--color-text-500)] ">
        View all Categories
      </Link>
    </div>
  );
}
