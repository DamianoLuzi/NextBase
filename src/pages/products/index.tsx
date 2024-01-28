import React from "react";
import supabase from "../../../supabase";
import ProductCard from "../../products/components/Card";
import Product from "../../types/Product";

interface ProductsPageProps {
  products: Product[];
}

const ProductsPage = ({ products }: ProductsPageProps) => {
  //console.log(products.forEach((p) => console.log(Object.keys(p))));
  console.log(products);
  return (
    <>
      <div className="section bg-blue">
        <div className="container">
          <div className="section-intro">
            <h1>Latest Products</h1>
          </div>
        </div>
      </div>
      <div className="section small">
        <div className="container">
          <ul className="product-card-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const { data: products, error } = await supabase.from("product").select("*");

  return {
    props: {
      products: products || [],
    },
  };
}

export default ProductsPage;


/*import React from "react";
import { supabase } from "../../../supabase";
import ProductCard from "../../products/components/Card";

export default function ProductsPage({products}) {
    console.log(products);
    return(
      <>
        <div className="section bg-blue">
          <div className="container">
            <div className="section-intro">
              <h1>Latest Products</h1>
            </div>
          </div>
        </div>
        <div className="section small">
          <div className ="container">
            <ul className = "product-card-grid">
              {products.map(product => (
                <ProductCard key = {product.id} product = {product}/>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
}

export async function getStaticProps() {
    let {data : products, error} = await supabase
    .from("product")
    .select("*")
    return {
      props : {
        products,
      },
    };
}*/
