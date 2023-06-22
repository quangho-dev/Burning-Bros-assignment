import { useEffect, useState } from "react";
import axios from "axios";

export default function useProductSearch(query, limit, skip) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    if (query) {
      setProducts([]);

      axios({
        method: "GET",
        url: `https://dummyjson.com/products/search?q=${query}`,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          console.log("res.data:", res.data);
          setProducts(res.data.products);
          setHasMore(false);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
    } else {
      axios({
        method: "GET",
        url: `https://dummyjson.com/products?skip=${skip}&limit=${limit}&select=title,price,images`,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          console.log("res.data:", res.data);
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
