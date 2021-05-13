import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import COLORS from "../../constants/COLORS";
import { deleteProduct } from "../../store/actions/products";

function UserProductsScreen({ navigation }) {
  const availableProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

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
            onViewDetails={() => {}}
          >
            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate("EditScreen", { productId: id })
              }
              color={COLORS.primary}
            />
            <Button
              title="Delete"
              onPress={() => dispatch(deleteProduct(id))}
              color={COLORS.primary}
            />
          </ProductItem>
        );
      }}
    />
  );
}

UserProductsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Your Products",
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
        name="ios-create-sharp"
        size={25}
        onPress={() => navigation.navigate("EditScreen")}
        color="#fff"
        style={{ marginRight: 20 }}
      />
    ),
  };
};

export default UserProductsScreen;
