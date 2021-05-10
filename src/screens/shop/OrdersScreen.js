import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import OrderItem from "../../components/OrderItem";

function OrdersScreen() {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OrderItem
          amount={item.totalAmount}
          items={item.items}
          date={item.date}
        />
      )}
    />
  );
}

OrdersScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Orders",
    headerLeft: () => (
      <Ionicons
        name="ios-menu-outline"
        size={25}
        onPress={() => navigation.toggleDrawer()}
        color="#fff"
        style={{ marginLeft: 20 }}
      />
    ),
  };
};

export default OrdersScreen;
