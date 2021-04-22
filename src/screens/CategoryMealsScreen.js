import React from "react";
import MealList from "../components/MealList";
import { CATEGORIES, MEALS } from "../constants/DummyData";

function CategoryMealsScreen(props) {
  const catId = props.navigation.getParam("categoryId");
  const selectedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );
  return <MealList listData={selectedMeals} navigation={props.navigation} />;
}

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");

  const selectedData = CATEGORIES.find((cat) => cat.id === catId);
  return {
    title: selectedData.title,
  };
};



export default CategoryMealsScreen;
