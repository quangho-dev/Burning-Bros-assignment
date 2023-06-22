import React from "react";
import { Product } from "../models/models";

interface Props {
  product: Product;
}

const SingleProduct: React.FC<Props> = ({ product }) => {
  return (
    <div key={product.id} className="product-card">
      <p>
        <span className="product-name">Name:&nbsp;</span>
        <span>{product.title}</span>
      </p>
      <p>
        <span className="product-price">Price:&nbsp;</span>
        <span>{product.price}</span>
      </p>

      <div className="images-container">
        {product.images.length > 0 &&
          product.images.map((image) => (
            <img src={image} className="single-image" alt="product" />
          ))}
      </div>
    </div>
  );
};

export default SingleProduct;
