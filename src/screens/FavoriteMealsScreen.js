import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import MealItem from "../components/MealItem";

function FavoriteMealsScreen(props) {
  const favMeals = useSelector((state) => state.meals.favoriteMeals);
  const gridItem = ({ item }) => {
    return (
      <MealItem
        bgImg={item.imageUrl}
        title={item.title}
        affordability={item.affordability}
        duration={item.duration}
        complexity={item.complexity}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "MealDetailsScreen",
            params: {
              mealId: item.id,
              mealTitle: item.title,
            },
          });
        }}
      />
    );
  };
  return (
    <FlatList
      data={favMeals}
      renderItem={gridItem}
      keyExtractor={(item, index) => item.id}
      style={{ flex: 1, alignSelf: "center" }}
    />
  );
}


export default FavoriteMealsScreen;
