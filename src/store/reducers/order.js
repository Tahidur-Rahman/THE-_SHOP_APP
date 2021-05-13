import { ORDER_NOW, SET_ORDER } from "../actions/order";
import OrderItem from "../../models/OrderItem";

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return { orders: action.orders };
    case ORDER_NOW:
      const newOrder = new OrderItem(
        action.orderedData.id,
        action.orderedData.items,
        action.orderedData.totalAmount,
        action.orderedData.date.toLocaleDateString() +
          " " +
          action.orderedData.date.toLocaleTimeString()
      );
      return { ...state, orders: state.orders.concat(newOrder) };

    default:
      return state;
  }
};

export default orderReducer;
