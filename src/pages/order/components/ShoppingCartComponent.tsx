import React, { useState, useMemo, useEffect } from "react";
import Portal from "../../../hooks/Protal";
import { AiOutlineTransaction } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineLocalShipping } from "react-icons/md";
import Cart from "./Cart";
import { motion } from "framer-motion";
import OfferItem from "./OfferItem";
import { useGetCartItemsQuery } from "@/services/shoperzApi.service";
import { useDispatch } from "react-redux";
import { setCartLength } from "@/redux/slices/app.slice";
import dynamic from "next/dynamic";
import QuickLoadingModul from "@/layout/QuickLoadingModul";

const OrderReport = dynamic(() => import("./OrderSummery"), {
  loading: () => <QuickLoadingModul />,
});
const AlertDialog = dynamic(() => import("./AlertDialog"), {
  loading: () => <QuickLoadingModul />,
});

interface ShoppingCartComponentProps {}
function ShoppingCartComponent() {
  const dispatch = useDispatch();
  const [showConfirmIsUser, setShowConfirmIsUser] = useState(false);
  const [token, setToken] = useState("");

  ////////////////////
  //
  //
  let loggedin = Boolean(token);
  //
  //
  ////////////////////

  const {
    data: userCartData,
    isLoading,
    isError,
    isSuccess,
  } = useGetCartItemsQuery(token, { skip: !Boolean(token) });

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    if (token) {
      setToken(token);
    }
  }, []);
  console.log(userCartData);
  return (
    <motion.article
      variants={{
        visible: { opacity: 1, translateX: "0px" },
        hidden: { opacity: 0, translateX: "-15px" },
      }}
      initial={"hidden"}
      animate={"visible"}
      className="shopping-cart-component"
    >
      <section className="shopping-cart-details">
        <Cart
          cartItems={userCartData?.userCart.items || []}
          total={userCartData?.cartTotal || 0}
          apiCallState={{ isLoading, isError, isSuccess }}
        />
        <OrderReport
          orders={userCartData?.userCart.items || []}
          cartTotal={userCartData?.cartTotal || 0}
          discountedTotal={userCartData?.discountedTotal || 0}
          ProductsQuantity={userCartData?.userCart.items?.length || 0}
          loggedin={loggedin}
          setShowConfirmIsUser={setShowConfirmIsUser}
          apiCallState={{ isLoading, isError, isSuccess }}
        />
        {showConfirmIsUser && (
          <Portal>
            <AlertDialog setShowConfirmIsUser={setShowConfirmIsUser} />
          </Portal>
        )}
      </section>
      <section className="w-full flex flex-col items-center justify-center bg-Grey-100 gap-3">
        <header className="container max-w-5xl mx-auto grid grid-cols-2 capitalize text-Primary-800 text-lg font-medium py-3 max-lg:px-3">
          <p>delivery</p>
          <p> free returns</p>
        </header>
        <ul className="offers-list">
          <OfferItem
            offerdata={{
              Icon: <AiOutlineTransaction />,
              title:
                "Order by 10pm for free next day delivery on Orders overs $100",
              subTitle: "We deliver Monday to Saturday - excluding Holidays",
            }}
          />
          <OfferItem
            offerdata={{
              Icon: <BsBoxSeam />,
              title: "Free next day delivery to stores.",
              subTitle:
                "Home delivery is $4.99 for orders under $100 and is FREE for all orders over $100",
            }}
          />
          <OfferItem
            offerdata={{
              Icon: <MdOutlineLocalShipping />,
              title: "",
              subTitle:
                "30 days to return it to us for a refund. We have made returns SO EASY - you can now return your order to a store or send it with FedEx FOR FREE",
            }}
          />
        </ul>
      </section>
    </motion.article>
  );
}

export default ShoppingCartComponent;
