import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import COLORS from "../../constants/COLORS";
import { addToCart } from "../../store/actions/cart";

function ShopOverviewScreen({ navigation }) {
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  const dispatch = useDispatch();
  const detailsViewHandler = (productId,productTitle) =>
    navigation.navigate("ProductDetails", { productId: productId,productTitle:productTitle });
  return (
    <FlatList
      data={availableProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const {id,imageUrl,title,price} = item;
        return (
          <ProductItem
            imageUrl={imageUrl}
            title={title}
            price={price}
            onViewDetails={()=>detailsViewHandler(id,title)}
          >
            <Button
              title="View Details"
              onPress={()=>detailsViewHandler(id,title)}
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
        onPress={() => {}}
        color="#fff"
        style={{ marginLeft: 20 }}
      />
    ),
    headerRight: () => (
      <Ionicons
        name="ios-cart-outline"
        size={25}
        onPress={()=>navigation.navigate('Cart')}
        color="#fff"
        style={{ marginRight: 20 }}
      />
    ),
  };
};

export default ShopOverviewScreen;
