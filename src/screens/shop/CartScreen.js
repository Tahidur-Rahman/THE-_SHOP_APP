import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import CartItem from "../../components/CartItem";
import COLORS from "../../constants/COLORS";
import { removeFromCart } from "../../store/actions/cart";

function CartScreen() {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    const transformedItems = [];
    for (const key in state.cart.products) {
      transformedItems.push({
        id: key,
        quantity: state.cart.products[key].quantity,
        title: state.cart.products[key].title,
        price: +state.cart.products[key].price,
        sum: +state.cart.products[key].sum,
      });
    }
    return transformedItems.sort((a, b) => (a.id > b.id ? 1 : -1));
  });
  console.log(cartItems);

  return (
    <View style={styles.screen}>
      <Card>
        <View style={styles.total_order}>
          <Text style={styles.total}>Total : ${totalAmount.toFixed(2)}</Text>
          <Button
            title="Order Now"
            disabled={cartItems.length < 1}
            color={COLORS.primary}
          />
        </View>
      </Card>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            quantity={item.quantity}
            title={item.title}
            sum={item.sum}
            onDelete={() => dispatch(removeFromCart(item.id))}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  total_order: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  total: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
  },
});

export default CartScreen;
