import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import Colors from "../constants/Colors";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import FavoritesScreen from "../screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "react-navigation-drawer";
import FiltersScreen from "../screens/FiltersScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerTintColor: "#fff",
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetails: MealDetailsScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const FavsNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetails: MealDetailsScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const MealsFavNavigator = createMaterialBottomTabNavigator(
  {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        ),
      },
    },
    Favourites: {
      screen: FavsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => (
          <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
        ),
        tabBarBadge: 2,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.secondary,
    },
  }
);

const FilterNavigator = createStackNavigator(
  {
    FilterScreen: FiltersScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const MainNavigator = createDrawerNavigator(
  {
    MealsFav: {
      screen: MealsFavNavigator,
      navigationOptions: {
        title: "Meals",
      },
    },
    Filter: FilterNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.secondary,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  }
);
export default createAppContainer(MainNavigator);
