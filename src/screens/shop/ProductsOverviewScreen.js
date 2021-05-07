import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { addTOCart } from "../../store/actions/cart";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";
import Colors from '../../constants/Colors'


function ProductsOverviewScreen({ navigation }) {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          imageUrl={item.imageUrl}
          title={item.title}
          price={item.price}
          goToDetails={() => {
            navigation.navigate("Product", {
              productTitle: item.title,
              productId: item.id,
            });
          }}
        >
          <Button
            color={Colors.primary}
            title="See Details"
            onPress={() => {
              navigation.navigate("Product", {
                productTitle: item.title,
                productId: item.id,
              });
            }}
          />

          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => dispatch(addTOCart(item))}
          />
        </ProductItem>
      )}
    />
  );
}

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "All Products",
    headerRight: () => (
      <Ionicons
        name="ios-cart-outline"
        color="#fff"
        size={25}
        style={{ paddingRight: 15 }}
        onPress={() => navigation.navigate("Cart")}
      />
    ),
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

export default ProductsOverviewScreen;
