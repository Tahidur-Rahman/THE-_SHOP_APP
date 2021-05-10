import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ShopOverviewScreen from "../screens/shop/ShopOverviewScreen";
import COLORS from "../constants/COLORS";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import ProductDetails from "../screens/shop/ProductDetails";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { createDrawerNavigator } from "react-navigation-drawer";

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
    Cart: CartScreen,
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

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name="ios-list-circle-outline"
          size={25}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions:defNavOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    ProductsNavigator: ProductsNavigator,
    OrdersNavigator: OrdersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: COLORS.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
