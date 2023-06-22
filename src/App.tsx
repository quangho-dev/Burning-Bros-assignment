import React, { useState, useRef, useCallback } from "react";
import useProductSearch from "./hooks/useProductSearch";
import ProductList from "./components/ProductList";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [skip, setSkip] = useState<number>(20);

  const limit = 20;

  const { products, hasMore, loading, error } = useProductSearch(
    query,
    limit,
    skip
  );

  const observer = useRef<IntersectionObserver | null>();
  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkip((prevSkip) => prevSkip + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  return (
    <>
      <h1 className="title">Product List</h1>

      <ProductList
        products={products}
        query={query}
        handleSearch={handleSearch}
        lastProductElementRef={lastProductElementRef}
      />

      <div className="loading-and-error-container">
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error"}</div>
      </div>
    </>
  );
}

export default App;
