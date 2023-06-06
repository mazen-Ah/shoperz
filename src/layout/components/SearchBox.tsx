import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSearchProductsMutation } from "@/services/shoperzApi.service";
import dynamic from "next/dynamic";
import QuickLoadingModul from "../QuickLoadingModul";

const SearchResultList = dynamic(() => import("./SearchResultList"), {
  loading: () => <QuickLoadingModul />,
});

export default function SearchBox() {
  const [query, setquery] = useState("");
  const [fetchSearchProducts, productsResponse] = useSearchProductsMutation();
  useEffect(() => {
    let handlerId: NodeJS.Timeout;
    if (Boolean(query)) {
      handlerId = setTimeout(() => {
        fetchSearchProducts(query);
      }, 600);
    }

    return () => {
      clearTimeout(handlerId);
    };
  }, [query]);
  console.log(productsResponse.data?.data.products);
  return (
    <form action="" className="shoperz-searchbox">
      <input
        type="search"
        name="search-for-products"
        id="app-search-field"
        placeholder="search for products .."
        className="shoperz-searchbox-input "
        value={query}
        onChange={({ target: { value } }) => setquery(value)}
      />
      <select
        name="select-category"
        id="categories"
        value={"all categories"}
        className="shoperz-searchbox-select"
      >
        <option value="all categories">all categories</option>
        <option value="electronics">electronics</option>
        <option value="ketchin">ketchin</option>
        <option value="garden">garden</option>
        <option value="sports">sports</option>
        <option value="mens">mens</option>
        <option value="womens">womens</option>
        <option value="computers & accessories">computers & accessories</option>
        <option value="mobiles & accessories">mobiles & accessories</option>
        <option value="helthey">helthey</option>
        <option value="gifts">gifts</option>
        <option value="toys">toys</option>
        <option value="TV & Audio">TV & Audio</option>
      </select>
      <button type="submit" id="search0btn" className="shoperz-searchbox-btn">
        <BsSearch />
      </button>
      {productsResponse.data?.data.products &&
      query !== "" &&
      productsResponse.data?.data.paginition.length >= 1 ? (
        <SearchResultList
          setQueryField={setquery}
          searchData={productsResponse.data?.data.products || []}
          resultsLength={productsResponse.data?.data.paginition.length || 0}
        />
      ) : null}
    </form>
  );
}