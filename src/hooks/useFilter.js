import { useState } from "react";

const useFilter = (expense, callback) => {
  const [query, setQuery] = useState("");
  const filteredData = expense?.filter((expense) =>
    callback(expense).toLowerCase().includes(query)
  );
  return [filteredData, setQuery, query];
};

export default useFilter;



 