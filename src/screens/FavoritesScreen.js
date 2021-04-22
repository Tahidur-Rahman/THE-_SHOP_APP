import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import MealList from "../components/MealList";
import { MEALS } from "../constants/DummyData";

function FavoritesScreen(props) {

  const favMeals = MEALS.filter( meal => meal.id === 'm1' || meal.id === 'm2');
  
  return (
    <MealList listData={favMeals} navigation={props.navigation}/>
  );
}

FavoritesScreen.navigationOptions = (navData) => {
  return {
    title: "Your Favourites",
    headerLeft: (
      <Ionicons
        name="ios-menu-sharp"
        onPress={() => navData.navigation.toggleDrawer()}
        size={25}
        color="#fff"
        style={{paddingLeft:20}}
      />
    ),
  };
};


export default FavoritesScreen;
