import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";


function ProductItem({ imageUrl, title, price, goToDetails,children }) {
  return (
    <View style={styles.product}>
      <TouchableOpacity useForeground onPress={goToDetails}>
        <View>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price}</Text>
          </View>

          <View style={styles.buttons}>
            {children}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    margin: 20,
    
    height: 300,
    borderRadius: 10,
    backgroundColor: "#eee",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "55%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  details: {  
    alignItems: "center",
  },
  title: {
    fontSize: 23,
    marginVertical: 5,
    fontFamily: "open-sans-bold",
  },
  price: {
    color: "#666",
    fontSize: 20,
    fontFamily: "open-sans",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    justifyContent: "space-between",
    height: "20%",
  },
});

export default ProductItem;
