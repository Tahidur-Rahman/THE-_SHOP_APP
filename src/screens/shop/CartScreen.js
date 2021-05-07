import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/CartItem";
import Colors from "../../constants/Colors";
import { removeFromCart } from "../../store/actions/cart";
import { orderNow } from "../../store/actions/orders";

function CartScreen(props) {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    const itemsArray = [];
    for (let key in state.cart.items) {
      itemsArray.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return itemsArray.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.total}> Total : ${totalAmount.toFixed(2)} </Text>
        <Button
          title="Order Now"
          color={Colors.primary}
          style={styles.orderButton}
          onPress={()=>dispatch(orderNow(cartItems,totalAmount))}
          disabled={cartItems.length < 1}
        />
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => {
          return (
            <CartItem
              quantity={item.quantity}
              title={item.productTitle}
              sum={item.sum}
              deletable
              onRemove={() => dispatch(removeFromCart(item.productId))}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
  },
  summary: {
    shadowColor: "black",
    shadowOpacity: 0.9,
    shadowRadius: 5,
    shadowOffset: { width: 11, height: 15 },
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },
  total: {
    fontFamily: "open-sans",
  },
});

export default CartScreen;
