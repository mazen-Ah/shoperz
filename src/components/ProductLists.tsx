import React from "react";
import ColumnProduct from "./ColumnProduct";
import {
  shoperzApi,
  useGetMegaOfferProductsQuery,
  useGetTopRatedProductsQuery,
} from "@/services/shoperzApi.service";
import Headtitle from "./Headtitle";
import { useInView } from "react-intersection-observer";
import { wrapper } from "@/redux/store";

type Props = {};

const ProductLists = (props: Props) => {
  const { ref, inView, entry } = useInView();
  console.log(props);
  const {
    data: topRatedProducts,
    isLoading: loadingTopRatedProducts,
    isSuccess: successTopRatedProducts,
  } = useGetTopRatedProductsQuery(
    { limit: 5 },
    { skip: !inView ? true : false }
  ); // if this section is not in view dont fetch data
  const {
    data: megaOfferProducts,
    isLoading: loadingMegaOfferProducts,
    isSuccess: successMegaOfferProducts,
  } = useGetMegaOfferProductsQuery(
    { limit: 5 },
    { skip: !inView ? true : false }
  ); // if this section is not in view dont fetch data

  return (
    <div ref={ref} className="bg-gray-100 px-4">
      <div className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start gap-4">
        <ul className="grid grid-flow-row my-6">
          <Headtitle title={"Top Rated"} />

          {!loadingTopRatedProducts && successTopRatedProducts
            ? topRatedProducts.data.products.map((product) => (
                <ColumnProduct key={product._id} product={product} />
              ))
            : null}
        </ul>
        <ul className="grid grid-flow-row my-6">
          <Headtitle title={"Best sellers"} />

          {!loadingTopRatedProducts && successTopRatedProducts
            ? topRatedProducts.data.products.map((product) => (
                <ColumnProduct key={product._id} product={product} />
              ))
            : null}
        </ul>
        <ul className="grid grid-flow-row my-6">
          <Headtitle title={"Mega Offers"} />

          {!loadingMegaOfferProducts && successMegaOfferProducts
            ? megaOfferProducts.data.products.map((product) => (
                <ColumnProduct key={product._id} product={product} />
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default ProductLists;

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ dispatch, getState }) => {
//     console.log("get static props inside home product list component");
//     await dispatch(
//       shoperzApi.endpoints.getMegaOfferProducts.initiate({ limit: 5 })
//     );
//     const megaOffers = shoperzApi.endpoints.getMegaOfferProducts.select({
//       limit: 5,
//     });
//     await Promise.all(dispatch(shoperzApi.util.getRunningQueriesThunk()));
//     console.log(getState());

//     return {
//       props: megaOffers || 0,
//     };
//   }
// );
