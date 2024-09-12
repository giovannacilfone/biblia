import { SelectChangeEvent } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import searchText, { SearchResponse } from "../queries/searchText";

const initialState = { data: [], meta: { page: 0, pageSize: 0, total: 0, pageCount: 0 } };
const useSearch = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [version, setVersion] = useState<string>("rv1960");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [textFound, setTextFound] = useState<SearchResponse>(initialState);

  const onChangeSearch = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(value);
    },
    []
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onChangeVersion = (event: SelectChangeEvent<string>) => {
    setVersion(event.target.value as string);
  };
  const getSearch = async () => {
    if (search.trim() === "") {
      setTextFound(initialState);
      return;
    }
    setLoadingSearch(true);
    try {
      const foundText = await searchText({ version, search, page });
      setTextFound(foundText);
    } catch (error) {
      console.error("Error fetching text:", error);
    } finally {
      setLoadingSearch(false);
    }
  };

  useEffect(() => {
    getSearch();
  }, [version, page, search]);

  return {
    loadingSearch,
    textFound,
    search,
    version,
    onChangeVersion,
    onChangeSearch,
    setSearch,
    handleChange,
    page,
  };
};

export default useSearch;
