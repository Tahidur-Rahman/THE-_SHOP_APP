export const DELETE_ITEM = "DELETE_ITEM";
export const CREATE_ITEM = "CREATE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";

export const deleteItem = (productId) => {
  return {
    type: DELETE_ITEM,
    pid: productId,
  };
};

export const createItem = (title, imageUrl, price, description) => {
  return {
    type: CREATE_ITEM,
    productData: { title, imageUrl, price, description },
  };
};

export const updateItem = (productId, title, imageUrl,  description) => {
  return {
    type: UPDATE_ITEM,
    productId: productId,
    productData: { title, imageUrl, description },
  };
};
