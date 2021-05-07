import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import Colors from "../constants/Colors";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import React from "react";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const navOptions = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
};

const ProductsNavigator = createStackNavigator(
  {
    Products: ProductsOverviewScreen,
    Product: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          color={drawerConfig.tintColor}
          size={24}
          name="ios-list-circle"
        />
      ),
    },
    defaultNavigationOptions: navOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          color={drawerConfig.activeTintColor}
          size={24}
          name="ios-cart"
        />
      ),
    },
    defaultNavigationOptions: navOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    userProducts: UserProductsScreen,
    editProduct :EditProductScreen
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          color={drawerConfig.activeTintColor}
          size={24}
          name="ios-create"
        />
      ),
    },
    defaultNavigationOptions: navOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    ProductsMain: ProductsNavigator,
    OrdersMain: OrdersNavigator,
    UsersProducts: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
