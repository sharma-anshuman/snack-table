import React from "react";
import SnackTable from "./snackTable/SnackTable";
import FilterContext from "./snackTable/context/FilterContext";

function App() {
  return (
    <React.Fragment>
      <FilterContext>
        <SnackTable />
      </FilterContext>
    </React.Fragment>
  );
}

export default App;
