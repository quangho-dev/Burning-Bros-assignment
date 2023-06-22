import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";
import { Product } from "../models/models";

export default function useProductSearch(
  query: string,
  limit: number,
  skip: number
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setProducts([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: Canceler;

    // Search products by name
    if (query) {
      setProducts([]);

      axios({
        method: "GET",
        url: `https://dummyjson.com/products/search?q=${query}`,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setProducts(res.data.products);
          setHasMore(false);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
    } else {
      // Fetch products when scrolling
      axios({
        method: "GET",
        url: `https://dummyjson.com/products?skip=${skip}&limit=${limit}&select=title,price,images`,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setProducts((prevProducts) => {
            return [...prevProducts, ...res.data.products];
          });
          setHasMore(res.data.products.length > 0);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });

      return () => cancel();
    }
  }, [limit, skip, query]);

  return { loading, error, products, hasMore };
}
