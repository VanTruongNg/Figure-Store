import { useState } from "react";
import { useAppSelector } from "../../../common/redux";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";

const Pagination = ({ itemsPerPage }: any) => {
  const products = useAppSelector((state) => state.home.products);
  const checkedCategories = useAppSelector(
    (state) => state.home.checkedCategories
  );
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const navigate = useNavigate();

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    const newStart = newOffset + 1;

    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  const Items = ({
    currentItems,
    selectedCategories,
  }: {
    currentItems: any[];
    selectedCategories: any[];
  }) => {
    const isScaleFigureSelected = selectedCategories.some(
      (category: any) => category.name === "Scale Figure"
    );

    const filterItems = currentItems.filter((item: any) => {
      const matchesCategory = selectedCategories.some(
        (category: any) => category.name === item.category[0].name
      );

      const matchesScale = isScaleFigureSelected
        ? item.scale !== "Non Scale"
        : true;
      if (isScaleFigureSelected) {
        return (
          matchesScale && (selectedCategories.length === 1 || matchesCategory)
        );
      } else {
        return selectedCategories.length === 0 || matchesCategory;
      }
    });

    return (
      <>
        {filterItems.map((item: any) => (
          <div key={item.id} className="w-full">
            <ProductCard item={item} navigate={navigate} />
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items
          currentItems={currentItems}
          selectedCategories={checkedCategories}
        />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, products.length)} of{" "}
          {products.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
