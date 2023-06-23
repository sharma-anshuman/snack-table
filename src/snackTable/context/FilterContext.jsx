import React, { createContext, useContext, useReducer } from "react";
import { snacks as snack } from "../db/SnackDB";

const MainFilterContext = createContext();

const FilterContext = ({ children }) => {
  const filterHandler = (acc, { type, payload, col }) => {
    switch (type) {
      case "search": {
        console.log('here');
        return {
          ...acc,
          searchQuery: payload,
          snacksToShow: acc.snacks.filter(
            ({ product_name: product, ingredients }) =>
              product.toLowerCase().includes(payload.toLowerCase()) ||
              ingredients.reduce(
                (flag, item) => (item.toLowerCase().includes(payload.toLowerCase()) ? true : flag),
                false
              )
          ),
        };
      }

      case "sort": {
        console.log("here in sort");
        return {
          ...acc,
          snacksToShow: [...acc.snacks].sort((a, b) =>
            acc.sortBy[col] ? b[payload] - a[payload] : a[payload] - b[payload]
          ),
          sortBy: [...acc.map((flag, idx) => (idx === col ? !flag : flag))],
        };
      }
    }
  };

  const [filterObj, dispatch] = useReducer(filterHandler, {
    snacks: [...snack],
    snacksToShow: [...snack],
    searchQuery: "",
    sortType: "",
    sortBy: [false, false, false, false, false, false],
  });

  const elements = { filterObj, dispatch };

  return (
    <MainFilterContext.Provider value={elements}>
      {children}
    </MainFilterContext.Provider>
  );
};

export const UseFilters = () => {
  return useContext(MainFilterContext);
};

export default FilterContext;
