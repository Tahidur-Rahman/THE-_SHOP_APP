import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-practical-default-rtdb.firebaseio.com/products.json"
      );
      const resData = await response.json();

      let loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].price,
            resData[key].description
          )
        );
      }
      dispatch({ type: SET_PRODUCT, products: loadedProducts });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    await fetch(
      `https://rn-practical-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );

    dispatch({ type: DELETE_PRODUCT, productId: productId });
  };
};

export const createProduct = (title, imageUrl, price, description) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-practical-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          price,
          description,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: { id: resData.name, title, imageUrl, price, description },
    });
  };
};

export const updateProduct = (
  productId,
  updatedTitle,
  updatedImageUrl,
  updatedDescription
) => {
  return async (dispatch) => {
    await fetch(
      `https://rn-practical-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          updatedTitle,
          updatedImageUrl,
          updatedDescription,
        }),
      }
    );

    dispatch({
      type: UPDATE_PRODUCT,
      productId: productId,
      productData: {
        updatedTitle,
        updatedImageUrl,
        updatedDescription,
      },
    });
  };
};
