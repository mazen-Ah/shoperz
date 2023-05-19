import type { Metadata } from "next";
import Slider from "@/components/Slider";
import ShopFeats from "@/components/ShopFeats";
import SlidesProducts from "@/components/SlidesProducts";
import Head from "next/head";
import CategorySection from "@/components/CategorySection";
import BestSellers from "@/components/BestSellers";
import BigDeals from "@/components/BigDeals";
import Banners from "@/components/Banners";
import ProductLists from "@/components/ProductLists";
import Brands from "@/components/Brands";

export default function Home() {
  return (
    <>
      <Head>
        <title>Shoperz | home </title>
      </Head>
      <main className="">
        <Slider />
        <section className="container max-w-5xl mx-auto">
          <ShopFeats />
          <SlidesProducts />
        </section>
        {/* <CategorySection /> */}
        {/* <BestSellers /> */}
        {/* <Banners /> */}
        {/* <BigDeals /> */}
        {/* <Brands /> */}
        {/* <ProductLists /> */}
      </main>
    </>
  );
}
