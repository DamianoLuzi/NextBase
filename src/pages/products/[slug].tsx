import React, { useEffect, useState } from "react";
import Image from "next/image";
import PromoCard from "../../products/components/PromoCard";
import Product from "../../types/Product";
import supabase from "../../../supabase/index"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import SubscriberCard from "../../products/components/SubscriberCard";
import ReactPlayer from "react-player";

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {

  const supabaseClient = useSupabaseClient() //using supabase on the client
  const [productContent, setProductContent] = useState(null);
  const session = useSession();    //checking if the user is logged in

  useEffect(() => {       //fetching from the product_content on the client
    async function getProductContent() {
      console.log("product content id", product.product_content_id)
      const { data: productContent } = await supabaseClient
        .from('product_content')
        .select()
        .eq('id', product.product_content_id.toString())
        .single()
      setProductContent(productContent)
    }
    getProductContent()
  }, [supabaseClient])  //fetching is triggered by a change in supabase client
  return (
    <section className="product-section">
      <article className="product">
        <div className="product-wrap">
          {productContent?.download_url && (
            <a href={`/assets/${productContent.download_url}`}
              download
              className="download-link large-button"
            >
              <span className="large-button-text">Download</span>
            </a>)}
          {productContent?.video_url ? (
            <ReactPlayer controls url={productContent.video_url} />
          ) :
            <Image
              width={1000}
              height={3000}
              src={`/assets/${product.slug}.png`}
              alt={product.name}
            />}
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
          {session ? <SubscriberCard /> : <PromoCard />}
        </section>
      </article>
    </section>
  );
}

//dynamic routing identified by the products slug
export async function getStaticPaths() {
  const { data: products } = await supabase.from("product").select("slug");
  const paths = products.map(product => ({    //transforming the retrieved data into a params object
    params: {
      slug: product.slug
    }
  }
  ));
  console.log(paths)
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {   //context has the params property created in getStaticPaths
  const slug = context.params.slug
  const { data: product } = await supabase
    .from("product")
    .select("*")
    .eq("slug", slug)  //filtering the slug column
    .single()
  return {
    props: {
      product,
    },
  };
}