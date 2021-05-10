import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Card from "./Card";

function ProductItem({ imageUrl, title, price, children,onViewDetails}) {
  return (
    <Card>
      <TouchableOpacity style={styles.productItem} activeOpacity={0.7} onPress={onViewDetails}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <View style={styles.productInfo}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
        <View style={styles.buttonContainer}>{children}</View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  productItem: {
    backgroundColor: "#eee",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  productInfo: {
    justifyContent: "center",
    marginVertical: 5,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize:20
  },
  price: {
    color: "#bbb",
    fontSize:20,
    fontFamily:'open-sans-bold'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
    alignItems: "center",
    width: "100%",
  },
});

export default ProductItem;
