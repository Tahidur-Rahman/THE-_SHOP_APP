import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import Colors from "../../constants/Colors";
import { deleteItem } from "../../store/actions/products";

function UserProductsScreen({ navigation }) {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          imageUrl={item.imageUrl}
          title={item.title}
          price={item.price}
          goToDetails={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() =>
              navigation.navigate("editProduct", { productId: item.id })
            }
          />

          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => dispatch(deleteItem(item.id))}
          />
        </ProductItem>
      )}
    />
  );
}

UserProductsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "User Products",

    headerLeft: () => (
      <Ionicons
        name="ios-menu"
        color="#fff"
        size={25}
        style={{ paddingLeft: 15 }}
        onPress={() => navigation.toggleDrawer()}
      />
    ),
    headerRight: () => (
      <Ionicons
        name="ios-create-sharp"
        color="#fff"
        size={25}
        style={{ paddingRight: 15 }}
        onPress={() => navigation.navigate("editProduct")}
      />
    ),
  };
};

export default UserProductsScreen;
