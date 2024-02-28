import React from "react";
import Link from "next/link";
import Product from "../../types/Product"

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`}>
        <img src={`/assets/${product.slug}.png`} alt={product.name} />
      </Link>
      <header>
        <p>{product.name}</p>
      </header>
      <footer>
        <Link href={`/products/${product.slug}`} className="more">
          See More
        </Link>
        <div>
          <span className="pill">{product.category}</span>
        </div>
      </footer>
    </article>
  );
}
