import React, { createContext, useContext, useReducer } from "react";
import { snacks as snack } from "../db/SnackDB";

const MainFilterContext = createContext();

const FilterContext = ({ children }) => {
  const filterHandler = (acc, { type, payload, col }) => {
    switch (type) {
      case "search": {
        console.log("here");
        return {
          ...acc,
          searchQuery: payload,
          snacksToShow: acc.snacks.filter(
            ({ product_name: product, ingredients }) =>
              product.toLowerCase().includes(payload.toLowerCase()) ||
              ingredients.reduce(
                (flag, item) =>
                  item.toLowerCase().includes(payload.toLowerCase())
                    ? true
                    : flag,
                false
              )
          ),
        };
      }

      case "sort": {
        return {
          ...acc,
          snacksToShow: [...acc.snacks].sort((a, b) =>
            col === 0 || col === 3 || col === 4
              ? acc.sortBy[col]
                ? b[payload] - a[payload]
                : a[payload] - b[payload]
              : col === 2
              ? acc.sortBy[col]
                ? Number(b[payload].slice(0, b[payload].length - 1)) -
                  Number(a[payload].slice(0, a[payload].length - 1))
                : Number(a[payload].slice(0, a[payload].length - 1)) -
                  Number(b[payload].slice(0, b[payload].length - 1))
              : col === 1
              ? acc.sortBy[col]
                ? a[payload] > b[payload]
                  ? -1
                  : 1
                : a[payload] > b[payload]
                ? 1
                : -1
              : col === 5
              ? acc.sortBy[col]
                ? a[payload][0] > b[payload][0]
                  ? -1
                  : 1
                : a[payload][0] > b[payload][0]
                ? 1
                : -1
              : ""
          ),
          sortBy: [
            ...acc.sortBy.map((flag, idx) => (idx === col ? !flag : flag)),
          ],
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
