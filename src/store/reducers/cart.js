import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ORDER_NOW } from "../actions/orders";
import { DELETE_ITEM } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      if (state.items[addedProduct.id]) {
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }

    case REMOVE_FROM_CART:
      const selectedItem = state.items[action.productId];
      const currentQty = selectedItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          currentQty - 1,
          selectedItem.prodPrice,
          selectedItem.prodTitle,
          selectedItem.sum - selectedItem.prodPrice
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedItem.prodPrice,
      };
    case ORDER_NOW:
      return initialState;
    case DELETE_ITEM:
      if(!state.items[action.pid]){
        return state
      }
    const updatedItems = {...state.items};
    const itemTotal = state.items[action.pid].sum;
    delete updatedItems[action.pid]
    return {
      ...state,
      items:updatedItems,
      totalAmount:state.totalAmount - itemTotal,
    }
    default:
      return state;
  }
};

export default cartReducer;
