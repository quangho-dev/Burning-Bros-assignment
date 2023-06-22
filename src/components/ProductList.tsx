import React from "react";
import SingleProduct from "./SingleProduct";
import TheLastProductInList from "./TheLastProductInList";
import SearchInput from "./SearchInput";
import { Product } from "../models/models";

interface Props {
  products: Array<Product>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  lastProductElementRef: (node: HTMLElement | null) => void;
}

const ProductList: React.FC<Props> = ({
  products,
  handleSearch,
  query,
  lastProductElementRef,
}) => {
  return (
    <div className="product-list-container">
      <SearchInput query={query} handleSearch={handleSearch} />

      <div>
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <TheLastProductInList
                product={product}
                lastProductElementRef={lastProductElementRef}
              />
            );
          } else {
            return <SingleProduct product={product} />;
          }
        })}
      </div>
    </div>
  );
};

export default ProductList;
