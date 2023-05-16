import { IApiCallState, ICart } from "@/models/shopperz.model";
import { SinglyLinkedList } from "@/utils/SinglyLinkedList";
import React, { useMemo } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaCcMastercard, FaCcVisa, FaEquals } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import CartItem from "./CartItem";
import { nanoid } from "@reduxjs/toolkit";

interface CartProps {
  cartItems?: Array<ICart>;
  apiCallState: IApiCallState;
  // linkedlist: SinglyLinkedList;
}
export default function Cart({ cartItems = [], apiCallState }: CartProps) {
  return (
    <div className="cart-wrapper">
      <header className="w-full py-6 flex items-center justify-between border-b-2 border-Grey-400 mb-4">
        <h3 className="capitalize font-semibold text-xl">your cart</h3>
        <p className="text-gray-500">( {cartItems.length} )</p>
      </header>
      {cartItems?.length < 1 ? (
        <div className="cart-isEmpty">
          <span className="flex bg-sky-100 text-6xl text-sky-700 rounded-full shadow p-7">
            <HiOutlineShoppingBag />
          </span>
          <p className="text-sky-700 capitalize mt-2">no items in your cart</p>
          <button className="bg-sky-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-sky-600 mt-12">
            show products
          </button>
        </div>
      ) : null}
      {apiCallState.isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-48">
          <span className="w-10 h-10 border-4 border-blue-700 rounded-full border-l-transparent animate-spin"></span>
        </div>
      ) : null}
      {cartItems.length > 0 && !apiCallState.isLoading ? (
        <ul className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem key={nanoid(5)} itemData={item} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}