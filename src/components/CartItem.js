import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function CartItem({ quantity, title, sum, onRemove, deletable }) {
  return (
    <View style={styles.item}>
      <View style={styles.infoLeft}>
        <Text style={styles.info}>{quantity} </Text>
        <Text style={styles.info}>{title}</Text>
      </View>

      <View style={styles.infoRight}>
        <Text style={styles.sum}>${sum}</Text>
        {deletable && (
          <Ionicons
            name="md-trash-bin"
            size={24}
            color="red"
            onPress={onRemove}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#ddd",
    margin: 5,
  },
  infoLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    fontFamily: "open-sans-bold",
  },
  infoRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  sum: {
    fontFamily: "open-sans",
    fontSize: 20,
  },
});

export default CartItem;
