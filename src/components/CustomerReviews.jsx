import Rate from "./ui/Rate";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get("/Api/reviewsSummary.json");
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
    <>
      {!isLoading && (
        <div>
          <div className="bg-[#f5f7fa] px-2 py-1 dark:bg-[#282b2e] flex items-center justify-between rounded mb-3">
            <Rate showText={false} rate={reviews.rating} />
            <span className="text-sm dark:text-white text-[var(--color-primary-dark)] font-bold">
              {reviews.rating} out of 5
            </span>
          </div>
          <span className="text-gray-400 mb-5 text-sm block text-center">
            Total {reviews.totalReviews}k reviews
          </span>
          {/* Progress */}
          <div>
            {/*  */}
            {reviews.breakdown.map((star, index) => {
              return (
                <div key={index}>
                  <div className="mb-1 text-sm font-medium flex justify-between dark:text-[var(--color-text-500)]">
                    <span>{star.name}</span>
                    <span>({star.count})</span>
                  </div>
                  <div className="w-full bg-[#f0f3f7] rounded-full h-1.5 mb-4 dark:bg-[#2a2d30]">
                    <div
                      style={{
                        width: `${star.percentage}%`,
                        backgroundColor: star.color,
                      }}
                      className=" h-1.5 rounded-full"
                    ></div>
                  </div>
                </div>
              );
            })}
            {/*  */}
          </div>
        </div>
      )}
    </>
  );
}
