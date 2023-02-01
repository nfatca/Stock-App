import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const useSortColumn = (data, columnObj) => {
  // Siralanacak local state (sutun verilerinin local state hali)
  const [sortedData, setSortedData] = useState(data);

  const [column, setColumn] = useState(columnObj);

  //! data state'i her güncellendiğinde local state güncellemesi için
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (arg, type) => {
    setColumn({ ...column, [arg]: column[arg] * -1 });
    setSortedData(
      sortedData
        ?.map((item) => item)
        .sort((a, b) => {
          if (type === "date") {
            // console.log("date");
            return column[arg] * (new Date(a[arg]) - new Date(b[arg]));
          } else if (type === "number") {
            // console.log("number");
            return column[arg] * (a[arg] - b[arg]);
          } else {
            // console.log("text");
            if (column[arg] === 1) {
              return b[arg] > a[arg] ? 1 : b[arg] < a[arg] ? -1 : 0;
            } else {
              return a[arg] > b[arg] ? 1 : a[arg] < b[arg] ? -1 : 0;
            }
          }
        })
    );
  };

  return { sortedData, handleSort, column };
};

export default useSortColumn;
