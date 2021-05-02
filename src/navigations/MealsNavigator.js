import { createStackNavigator } from "react-navigation-stack";
import CategoriesScreen from "../Screens/CategoriesScreen";
import CategoryMealsScreen from "../Screens/CategoryMealsScreen";
import MealDetailsScreen from "../Screens/MealDetailsScreen";
import React from 'react'
import { createAppContainer } from "react-navigation";
import Colors from "../constants/Colors";
import FavoriteMealsScreen from "../Screens/FavoriteMealsScreen";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FilterScreen from "../Screens/FilterScreen";
import { createDrawerNavigator } from "react-navigation-drawer";

const defaultStyle = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
};

const MealsNavigator = createStackNavigator(
  {
    CategoriesScreen: CategoriesScreen,
    CategoryMealsScreen: CategoryMealsScreen,
    MealDetailsScreen: MealDetailsScreen,
  },
  {
    defaultNavigationOptions: defaultStyle,
  }
);

const FavNavigator = createStackNavigator(
  {
    FavoriteMealsScreen: FavoriteMealsScreen,
    MealDetailsScreen: MealDetailsScreen,
  },
  {
    defaultNavigationOptions: defaultStyle,
  }
);

const FavsMealsNavigator = createMaterialBottomTabNavigator({
  MealsScreen: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: () => (
        <Ionicons name="ios-restaurant-sharp" size={24} color={Colors.secondary} />
      ),
      tabBarLabel: "Meals",
    },
  },
  FavoriteScreen: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: () => (
        <Ionicons name="ios-star-half-outline" size={25} color={Colors.secondary} />
      ),
      tabBarBadge:3,
      tabBarLabel: "Favorite",
    },
  },
});

const FilterNavigator = createStackNavigator({
    FilterScreen:FilterScreen,
},{
    defaultNavigationOptions:defaultStyle
})

const MainNavigator = createDrawerNavigator({
    MealsFavScreen:{
        screen:FavsMealsNavigator,
        navigationOptions:{
            title:'Meals'
        }
    },
    Filter:{
        screen:FilterNavigator
    }
},{
    contentOptions:{
        activeTintColor:Colors.primary,
        labelStyle:{
            fontFamily:'open-sans-bold'
        }
    }
})

export default createAppContainer(MainNavigator);
