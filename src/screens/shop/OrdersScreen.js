import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import CartItem from "../../components/CartItem";

function OrdersScreen({ navigation }) {
  const [showdetails, setShowdetails] = useState(false);
  const orders = useSelector((state) => state.orders.orders);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text>{item.total}</Text>
        <Text>{item.readableDate}</Text>
        <Button
          title={showdetails ? "Hide details" : "Show details"}
          onPress={() => setShowdetails((prevState) => !prevState)}
        />
      </View>
      {showdetails && (
        <View>
          {orders.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
              sum={cartItem.sum}
            />
          ))}
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={renderOrderItem}
    />
  );
}

OrdersScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Orders",

    headerLeft: () => (
      <Ionicons
        name="ios-menu"
        color="#fff"
        size={25}
        style={{ paddingLeft: 15 }}
        onPress={() => navigation.toggleDrawer()}
      />
    ),
  };
};

const styles = StyleSheet.create({
  orderItem: {
    flex: 1,
    flexDirection: "column",
    shadowColor: "black",
    shadowOpacity: 0.9,
    shadowRadius: 5,
    shadowOffset: { width: 11, height: 15 },
    elevation: 5,
    margin: 20,
  },
  summary: {
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
export default OrdersScreen;
