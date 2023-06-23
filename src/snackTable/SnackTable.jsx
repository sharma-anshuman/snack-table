import React from "react";
import { UseFilters } from "./context/FilterContext";

const SnackTable = () => {
  const { filterObj, dispatch } = UseFilters();
  return (
    <div>
      <h1>Snack Table</h1>
      <input
        onChange={(event) =>
          dispatch({ type: "search", payload: event.target.value, col: 0 })
        }
        value={filterObj.searchQuery}
        placeholder="Search with products or ingredients..."
        type="text"
      />

      <table className="border-separate">
        <tbody>
          <tr>
            <th
              onClick={() => dispatch({ type: "sort", payload: "id", col: 0 })}
            >
              ID
            </th>
            <th
              onClick={() =>
                dispatch({ type: "sort", payload: "product_name", col: 1 })
              }
            >
              Product Name
            </th>
            <th
              onClick={() =>
                dispatch({ type: "sort", payload: "product_weight", col: 2 })
              }
            >
              Product Weight
            </th>
            <th
              onClick={() =>
                dispatch({ type: "sort", payload: "price", col: 3 })
              }
            >
              Price (INR)
            </th>
            <th
              onClick={() =>
                dispatch({ type: "sort", payload: "calories", col: 4 })
              }
            >
              Calories
            </th>
            <th>Ingredients</th>
          </tr>

          {filterObj.snacksToShow.map(
            ({
              id,
              product_name: name,
              product_weight: weight,
              price,
              calories,
              ingredients,
            }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{weight}</td>
                <td>{price}</td>
                <td>{calories}</td>
                <td>{ingredients.reduce((acc, item) => acc + ", " + item)}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SnackTable;
