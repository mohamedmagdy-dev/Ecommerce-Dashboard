// redux
import { useSelector } from "react-redux";
// components
import RecentActivity from "../components/RecentActivity";
import DatePicker from "../components/ui/DatePicker";
import { GreenButton, BlueButton } from "../components/ui/Buttons";
import PageWrapper from "../components/PageWrapper";
import StatueCards from "../components/StatueCards";
// Icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import MicrowaveIcon from "@mui/icons-material/Microwave";

export default function Home() {
  const { user } = useSelector((state) => state.user);
  return (
    <PageWrapper>
      {/* Row 1*/}
      <div className="flex justify-between flex-wrap gap-5 mb-5">
        {/* Hello Text */}
        <div>
          <h2 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-bold">
            Good Morning, Anna!
          </h2>
          <p className="text-sm text-[var(--color-text-800)]">
            Here's what's happening with your store today.
          </p>
        </div>
        {/* Action Button */}
        <div className="flex items-center gap-5 flex-wrap ">
          <DatePicker />
          <div className="flex gap-5">
            <GreenButton title="Add Product">
              <LibraryAddIcon fontSize="" />
            </GreenButton>
            <BlueButton>
              <MicrowaveIcon fontSize="small" />
            </BlueButton>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <StatueCards />
      {/* <RecentActivity /> */}
    </PageWrapper>
  );
}
