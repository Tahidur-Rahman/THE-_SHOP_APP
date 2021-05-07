import React from "react";
import { Button, Image, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addTOCart } from "../../store/actions/cart";

function ProductDetailScreen({ navigation }) {
  const productId = navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <Button
        title="Add to Cart"
        style={styles.addToCart}
        onPress={() => dispatch(addTOCart(selectedProduct))}
      />
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
}
ProductDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  addToCart: {
    width: "50%",
    marginHorizontal: 10,
  },
  price: {
    color: "#ccc",
    fontSize: 22,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontFamily: "open-sans",
    fontFamily: "open-sans",
  },
});

export default ProductDetailScreen;
