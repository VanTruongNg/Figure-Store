import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../common/redux";
import { homeAction } from "../../../store/redux-slices";
import NavTitle from "./NavTitle";
import { useEffect } from "react";

const CategoryFilter = () => {
  const checkedCategories = useAppSelector(
    (state) => state.home.checkedCategories
  );
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.home.categories);

  const handleToggleCategory = (category: any) => {
    dispatch(homeAction.toggleCategory(category));
  };

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={true} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categories.map((item) => (
            <li
              key={item.id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <input
                type="checkbox"
                id={item.id.toString()}
                checked={checkedCategories.some((b: any) => b.id === item.id)}
                onChange={() => handleToggleCategory(item)}
              />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
