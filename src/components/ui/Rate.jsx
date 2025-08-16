import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
export default function Rate(props) {
  let counter = 1;
  let rates = [];

  const fullStars = Math.floor(props.rate);
  const hasHalfStar = props.rate - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    rates.push(
      <StarIcon key={counter} className="text-[#fdc040]" fontSize="small" />
    );
    counter++;
  }

  if (hasHalfStar) {
    rates.push(
      <StarHalfIcon key={counter} className="text-[#fdc040]" fontSize="small" />
    );
    counter++;
  }

  for (let i = 0; i < emptyStars; i++) {
    rates.push(
      <StarBorderIcon
        key={counter}
        className="text-gray-400"
        fontSize="small"
      />
    );
    counter++;
  }

  return (
    <div className="rate my-2 flex gap-5 items-center ">
      <div className="flex">{rates}</div>
      <span className="dark:text-white">({props.rate})</span>
    </div>
  );
}
