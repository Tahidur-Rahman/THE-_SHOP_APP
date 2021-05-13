import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import COLORS from "../../constants/COLORS";
import { addToCart } from "../../store/actions/cart";
import { fetchProducts } from "../../store/actions/products";

function ShopOverviewScreen({ navigation }) {
  const [productLoading, setproductLoading] = useState(false);
  const [error, seterror] = useState("");
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  const dispatch = useDispatch();

  const loadProducts = useCallback( async () => {
    seterror(null)
    setproductLoading(true);

    try {
      await dispatch(fetchProducts());
    } catch (err) {
      seterror(err.message);
    }

    setproductLoading(false);
  },[setproductLoading,seterror,dispatch]);
 

  useEffect(() => {
    loadProducts();
  }, [dispatch,loadProducts]);
  const detailsViewHandler = (productId, productTitle) =>
    navigation.navigate("ProductDetails", {
      productId: productId,
      productTitle: productTitle,
    });

    useEffect(() => {
      const willFocusSub = navigation.addListener('willFocus',loadProducts)
      return () => {
        willFocusSub.remove()
      }
    }, [loadProducts])

  if (productLoading) {
    return (
      <View style={styles.page}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.page}>
        <Text> An error happened..</Text>
        <Button title="Try Again" color={COLORS.primary} onPress={loadProducts}/>
      </View>
    );
  }

  if (!productLoading && availableProducts.length === 0) {
    return (
      <View style={styles.page}>
        <Text>Nothing to show.. Add Some ..</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={availableProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const { id, imageUrl, title, price } = item;
        return (
          <ProductItem
            imageUrl={imageUrl}
            title={title}
            price={price}
            onViewDetails={() => detailsViewHandler(id, title)}
          >
            <Button
              title="View Details"
              onPress={() => detailsViewHandler(id, title)}
              color={COLORS.primary}
            />
            <Button
              title="Add to Cart"
              onPress={() => dispatch(addToCart(item))}
              color={COLORS.primary}
            />
          </ProductItem>
        );
      }}
    />
  );
}

ShopOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "All Products",
    headerLeft: () => (
      <Ionicons
        name="ios-menu-outline"
        size={25}
        onPress={() => navigation.toggleDrawer()}
        color="#fff"
        style={{ marginLeft: 20 }}
      />
    ),
    headerRight: () => (
      <Ionicons
        name="ios-cart-outline"
        size={25}
        onPress={() => navigation.navigate("Cart")}
        color="#fff"
        style={{ marginRight: 20 }}
      />
    ),
  };
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShopOverviewScreen;
