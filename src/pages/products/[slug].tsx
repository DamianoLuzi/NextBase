import React from "react";
import { supabase } from "../../../supabase";
import Image from "next/image";
import PromoCard from "../../products/components/PromoCard";
import Product from "../../types/Product";

interface ProductPageProps {
  product : Product;
}

export default function ProductPage({product} : ProductPageProps) {
    return(
      <section className = "product-section">
        <article className = "product">
          <div className = "product-wrap">
            <Image width = {1000} height = {3000} src = {`/assets/${product.slug}.png`} alt = {product.name}/>  
          </div>
          <section>
            <header>
              <h3>{product.name}</h3>
            </header>
            <section>
              <div>
                <p>{product.description}</p>
              </div>
            </section>
            </section>
            <section>
              <PromoCard/>
            </section>    
        </article>
      </section>
    );
}

//dynamic routing identified by the products slug
export async function getStaticPaths() {
    const {data : products} = await supabase.from("product").select("slug");
    const paths = products.map(product => ({    //transforming the retrieved data into a params object
        params : {
            slug : product.slug
        }
    }
    ));
    console.log(paths)
    return {
        paths,
        fallback : false,
    };
}

export async function getStaticProps(context) {   //context has the params property created in getStaticPaths
    const slug = context.params.slug
    const {data : product } = await supabase
      .from("product")
      .select("*")
      .eq("slug",slug)  //filtering the slug column
      .single()
    return {
      props : {
        product,
      },
    };
}