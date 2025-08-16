import { useEffect, useState } from "react";
import axios from "axios";
import Rate from "../components/ui/Rate";
export default function ProductReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get("/Api/ProductsReviews.json");
        setReviews(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(true);
      }
    }
    getCategories();
  }, []);

  return (
    <div className="flex flex-col gap-5 h-[300px] overflow-y-auto">
      {!isLoading &&
        reviews.map((category) => {
          return (
            <div
              key={category.id}
              className="p-3 flex flex-col items-center text-center justify-center border border-dashed border-gray-200 rounded-lg  dark:border-gray-700"
            >
              <img src={category.userAvatar} alt="avatar" />

              <h5 className="mb-1 text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                {category.userName}
              </h5>
              <Rate rate={category.rating} />
              <p className=" text-sm text-gray-500 dark:text-gray-400">
                {category.review}
              </p>
            </div>
          );
        })}
    </div>
  );
}
