import { createSlice } from "@reduxjs/toolkit";
import { AppState, AppStore } from "../store";
import { SinglyLinkedList } from "@/utils/SinglyLinkedList";
import { ICreditCard } from "@/models/shopperz.model";

interface AppStateProps {
  currentComponent: "shopping-cart" | "checkout" | "order-complete";
  orderData: SinglyLinkedList;
  cart: Array<{
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    totalPrice: number;
    currency: string;
    quantity: number;
    images: Array<string>;
  }>;
  paymentMethod: IPaymentMethod[];
  creditCardsList: ICreditCard[];
}

const initialState: AppStateProps = {
  currentComponent: "shopping-cart",
  orderData: new SinglyLinkedList(),
  cart: [],
  paymentMethod: [
    {
      id: "credit-card",
      value: true,
      paymentData: {},
    },
    {
      id: "upon-receipt",
      value: false,
      paymentData: {},
    },
  ],
  creditCardsList: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeCurrentOrderComponent: (state, action) => {
      state.currentComponent = action.payload;
    },
    handleAddToOrderData: (state, action) => {
      state.orderData.push(action.payload);
    },
    handleUpdateOrderData: (state, action) => {
      state.orderData.update(action.payload.oldData, action.payload.newData);
    },
    handleGetOrderDataById: (state, action) => {
      state.orderData.getById(action.payload);
    },
    handleMargefullOrderData: (state, action) => {
      let data = state.orderData.margeAllData();

      if (data) {
        state.orderData.push({ ...data, id: action.payload });
      }
    },
    addCartItems: (state, action) => {
      state.cart.push(...action.payload);
    },
    selectPatmentMethod: (state, action) => {
      let newPaymentMethod = state.paymentMethod.map((method) =>
        method.id === action.payload
          ? { ...method, value: !method.value }
          : { ...method, value: false }
      );
      state.paymentMethod = newPaymentMethod;
    },
    addPaymentData: (state, action) => {
      let newPaymentData = state.paymentMethod.map((data) =>
        data.id === action.payload.id
          ? { ...data, paymentData: action.payload.paymentData }
          : { ...data }
      );
      state.paymentMethod = newPaymentData;
    },
    addToCreditCardsList: (state, action) => {
      let newCreditCardsList = state.creditCardsList.map((card) => ({
        ...card,
        isCurrent: false,
      }));
      state.creditCardsList = [...newCreditCardsList, action.payload];
    },
    removeFromCreditCardsList: (state, action) => {
      let listAfterRemove = state.creditCardsList.filter(
        (cdt) => cdt["card-number"] !== action.payload.cardNumber
      );
      if (listAfterRemove.length > 1) {
        listAfterRemove[listAfterRemove.length - 1].isCurrent = true;
      }
      if (listAfterRemove.length === 0) {
        listAfterRemove[0].isCurrent = true;
      }

      state.creditCardsList = listAfterRemove;
    },
  },
});

export const selectAppState = (state: AppState) => state.app;
export const {
  changeCurrentOrderComponent,
  handleAddToOrderData,
  handleUpdateOrderData,
  handleGetOrderDataById,
  handleMargefullOrderData,
  addCartItems,
  addPaymentData,
  selectPatmentMethod,
  addToCreditCardsList,
  removeFromCreditCardsList,
} = appSlice.actions;
