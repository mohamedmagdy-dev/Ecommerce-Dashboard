import GiftImg from "../assets/imgs/giftbox.png";
import EmailIcon from "@mui/icons-material/Email";
export default function ReferBox() {
  return (
    <div className="bg-[#f5f7fa] p-5 dark:bg-[#282b2e] mt-10 flex items-center justify-center flex-col shadow-sm rounded">
      <img src={GiftImg} alt="gift box" className="mb-3" />
      <h3 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-bold">
        Invite New Seller
      </h3>
      <p className="text-sm text-center my-2 text-[var(--color-text-800)]">
        Refer a new seller to us and earn $100 per refer.
      </p>
      <button className="mt-2 text-sm bg-[var(--color-purple)] text-white cursor-pointer rounded-full flex items-center gap-2 h-[40px] pr-4">
        <span className="rounded-full bg-[#536394] flex items-center justify-center h-[40px] w-[40px]">
          <EmailIcon fontSize="" />
        </span>
        Invite Now
      </button>
    </div>
  );
}
