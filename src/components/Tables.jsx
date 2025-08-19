export default function Table({ thead = [], TableRows }) {
  return (
    <div className="overflow-x-auto  ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className=" uppercase bg-[#f5f7fa] dark:bg-[#282b2e] dark:text-[var(--color-text-500)]">
          <tr>
            {!!thead &&
              thead.map((th, index) => {
                return (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-[var(--color-text-800)] whitespace-nowrap"
                  >
                    {th}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          <TableRows />
        </tbody>
      </table>
    </div>
  );
}
