export const ORDER_NOW = "ORDER_NOW";
export const SET_ORDER = "SET_ORDER";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-practical-default-rtdb.firebaseio.com/orders/u1.json"
      );
      const resData = await response.json();

      let loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].items,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({
        type: SET_ORDER,
        orders: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};

const orderNow = (items, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      "https://rn-practical-default-rtdb.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          items,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    const resData = await response.json();
    dispatch({
      type: ORDER_NOW,
      orderedData: {
        id: resData.name,
        items: items,
        totalAmount: totalAmount,
        date: date,
      },
    });
  };
};

export default orderNow;
