// components
import PageWrapper from "../components/PageWrapper";
import ProductsComponent from "../components/Products";

export default function Products() {
  return (
    <PageWrapper className="p-5 ">
      <div className="bg-white dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm  overflow-x-auto">
        <ProductsComponent />
      </div>
    </PageWrapper>
  );
}
