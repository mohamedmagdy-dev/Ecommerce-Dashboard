export default function OrderSummary({
  subTotal,
  discount,
  shipping,
  tax,
  total,
}) {
  return (
    <table className="w-full text-sm ">
      <tbody>
        <tr className="dark:text-gray-300">
          <td className="pb-4">Sub Total :</td>
          <td className="text-end pb-4">${subTotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td className="pb-4 dark:text-gray-300">
            Discount{" "}
            {discount > 0 && <span className="text-gray-400">(VELZON15)</span>}:
          </td>
          <td className="text-end text-red-500 pb-4">
            -${discount.toFixed(2)}
          </td>
        </tr>
        <tr className="dark:text-gray-300">
          <td className="pb-4">Shipping Charge :</td>
          <td className="text-end pb-4">${shipping.toFixed(2)}</td>
        </tr>
        <tr className="dark:text-gray-300">
          <td className="pb-4">Estimated Tax (12.5%) :</td>
          <td className="text-end pb-4">${tax.toFixed(2)}</td>
        </tr>
        <tr className="font-semibold border-t border-dashed border-gray-200 dark:border-[#94a3d465] pt-3 dark:text-gray-300">
          <td>Total (USD) :</td>
          <td className="text-end pt-3">${total.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
}
