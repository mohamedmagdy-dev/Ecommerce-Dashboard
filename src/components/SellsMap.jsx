import { ResponsiveChoropleth } from "@nivo/geo";
import worldCountries from "../../public/Api/world-countries.json";
const salesData = [
  { id: "EGY", value: 1200 },
  { id: "SAU", value: 900 },
  { id: "USA", value: 3000 },
  { id: "FRA", value: 800 },
  { id: "BRA", value: 1500 },
  { id: "CAN", value: 2200 },
  { id: "CHN", value: 2800 },
  { id: "RUS", value: 1700 },
  { id: "IND", value: 2500 },
  { id: "ZAF", value: 600 },
  { id: "AUS", value: 1100 },
  { id: "DEU", value: 1300 },
  { id: "ITA", value: 700 },
  { id: "ESP", value: 950 },
  { id: "JPN", value: 2700 },
];

export default function SellsMap() {
  return (
    <div className=" min-lg:w-80 dark:bg-[var(--color-primary-dark)]  bg-white rounded ">
      <h3 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] font-semibold p-3 border-b border-gray-200 dark:border-[#94a3d465]">
        Sales by Locations
      </h3>
      <div className="h-100 p-4 w-full ">
        <ResponsiveChoropleth
          data={salesData}
          features={worldCountries.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors="blues"
          domain={[0, 3000]}
          unknownColor="#eeeeee"
          label="properties.name"
          valueFormat=">-.0f"
          projectionScale={100}
          projectionTranslation={[0.5, 0.5]}
          borderWidth={0.5}
          borderColor="#333"
        />
      </div>
    </div>
  );
}
