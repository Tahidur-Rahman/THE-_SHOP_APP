import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/Cart-Item";

const initialState = {
  products: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product,
        title = addedProduct.title,
        price = addedProduct.price;

      let updatedOrNewProduct;

      if (state.products[addedProduct.id]) {
        updatedOrNewProduct = new CartItem(
          state.products[addedProduct.id].quantity + 1,
          title,
          price,
          state.products[addedProduct.id].sum + price
        );
      } else {
        updatedOrNewProduct = new CartItem(1, title, price, price);
      }

      return {
        ...state,
        products: { ...state.products, [addedProduct.id]: updatedOrNewProduct },
        totalAmount: state.totalAmount + price,
      };
    case REMOVE_FROM_CART:
      const selectedProduct = state.products[action.productId];
      let updatedCartItems;
      if (selectedProduct.quantity > 1) {
        const updatedCartItem = new CartItem(
            selectedProduct.quantity - 1,
            selectedProduct.title,
            selectedProduct.price,
            selectedProduct.sum - selectedProduct.price
        );
        updatedCartItems = {
          ...state.products,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.products };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        products: updatedCartItems,
        totalAmount: state.totalAmount - selectedProduct.price,
      };

    default:
      return state;
  }
};

export default cartReducer;
