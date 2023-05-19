import PaymentStatusbar from "@/components/PaymentStatusbar";

import Head from "next/head";
import React from "react";
import CheckoutComponent from "./components/CheckoutComponent";
import OrderCompleteComponent from "./components/OrderCompleteComponent";
import ShoppingCartComponent from "./components/ShoppingCartComponent";
import { selectAppState } from "@/redux/slices/app.slice";
import { useDispatch, useSelector } from "react-redux";

function ShoppingCart() {
  const { currentComponent } = useSelector(selectAppState);
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>order</title>
      </Head>
      <main className="w-full min-h-screen flex items-start justify-start flex-col">
        <PaymentStatusbar currentPage={currentComponent} />
        {currentComponent === "shopping-cart" && <ShoppingCartComponent />}
        {currentComponent === "checkout" && <CheckoutComponent />}
        {currentComponent === "order-complete" && <OrderCompleteComponent />}
      </main>
    </>
  );
}

export default React.memo(ShoppingCart);
