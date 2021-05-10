import { ORDER_NOW } from "../actions/order";
import OrderItem from "../../models/OrderItem";

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_NOW:
      const date = new Date()
      const newOrder = new OrderItem(
        date.toString(),
        action.orderedData.items,
        action.orderedData.totalAmount,
        date.toLocaleDateString() +' '+ date.toLocaleTimeString()
      );
      return {...state,orders : state.orders.concat(newOrder)}

    default:
      return state;
  }
};

export default orderReducer;
