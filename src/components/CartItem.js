import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {  StyleSheet, Text, View } from "react-native";
import Card from "./Card";

function CartItem({ quantity, title, sum, onDelete }) {
  return (
    <Card>
      <View style={styles.cartItem}>
        <View style={styles.left}>
          <Text style={{ fontFamily: "open-sans-bold" }}>{quantity}</Text>
          <Text style={{ fontFamily: "open-sans-bold" }}>{title}</Text>
        </View>
        <View style={styles.right}>
          <Text style={{ fontFamily: "open-sans-bold" }}>
            ${sum.toFixed(2)}
          </Text>
          <Ionicons
            name="ios-trash-bin-outline"
            size={25}
            onPress={onDelete}
            color="red"
          />
        </View>
      </View>
     
    </Card>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  left: {
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
  }
});

export default CartItem;
