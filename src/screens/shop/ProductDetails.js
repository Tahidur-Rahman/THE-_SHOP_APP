import React from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import COLORS from "../../constants/COLORS";
import { addToCart } from "../../store/actions/cart";

function ProductDetails({ navigation }) {
  const productId = navigation.getParam("productId");

  const product = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  const dispatch = useDispatch()
  const {id, imageUrl, price, description } = product;
  return (
    <View style={styles.product}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.productInfo}>
        <Text style={styles.price}>${price}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.desc}>{description}</Text>
      </View>
      <Button
        title="Add to Cart"
        onPress={() => dispatch(addToCart(product))}
        color={COLORS.primary}
        style={{ marginHorizontal: 50 }}
      />
    </View>
  );
}

ProductDetails.navigationOptions = ({navigation})=>{
    return {
        title:navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
  productItem: {
    backgroundColor: "#eee",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 400,
  },
  productInfo: {
    justifyContent: "center",
    marginVertical: 5,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  desc: {
    fontFamily: "open-sans",
    fontSize: 20,
    margin: 15,
  },
  price: {
    color: "#bbb",
    fontSize: 20,
    fontFamily: "open-sans-bold",
  },
});

export default ProductDetails;
