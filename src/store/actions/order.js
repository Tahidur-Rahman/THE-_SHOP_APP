export const ORDER_NOW = "ORDER_NOW";

const orderNow = (items, totalAmount) => {
  return {
    type: ORDER_NOW,
    orderedData: { items: items, totalAmount: totalAmount },
  };
};


export default orderNow