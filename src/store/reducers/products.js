import PRODUCTS from "../../constants/DUMMY_DATA";
import Product from "../../models/Product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const { id,title, imageUrl, price, description } = action.productData;
      const newProduct = new Product(
        id,
        "u1",
        title,
        imageUrl,
        price,
        description
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const {updatedTitle, updatedImageUrl, updatedDescription} = action.productData;

      const userProductIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.productId
      );
      const updatedProduct = new Product(
        action.productId,
        state.userProducts[userProductIndex].ownerId,
        updatedTitle, updatedImageUrl, updatedDescription,
        state.userProducts[userProductIndex].price
      );
      
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.productId
      );
      const updateAvailableProducts = [...state.availableProducts];
      updatedUserProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updateAvailableProducts,
        userProducts: updatedUserProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.productId
        ),
      };
      case SET_PRODUCT:
        return {
          ...state,
          availableProducts:action.products,
          userProducts:action.products.filter((product) => product.ownerId === "u1")
        }
    default:
      return state;
  }
  return state;
};

export default productsReducer;
