import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ShopOverviewScreen from "../screens/shop/ShopOverviewScreen";
import COLORS from "../constants/COLORS";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import ProductDetails from "../screens/shop/ProductDetails";
import CartScreen from "../screens/shop/CartScreen";

const defNavOptions = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
};

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview: ShopOverviewScreen,
    ProductDetails: ProductDetails,
    Cart : CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name="ios-cart-outline"
          size={24}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defNavOptions,
  }
);

export default createAppContainer(ProductsNavigator);
