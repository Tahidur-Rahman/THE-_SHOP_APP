import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MealItem from "../components/MealItem";
import { CATEGORIES } from "../constants/DummyData";

function CategoryMealsScreen(props) {
  const selectedCategoryId = props.navigation.getParam("categoryId");
  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const selectedMeals = availableMeals.filter(
    (cat) => cat.categoryIds.indexOf(selectedCategoryId) >= 0
  );

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

  if (selectedMeals.length < 1) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "open-sans" }}>Nothing is found</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={selectedMeals}
      renderItem={gridItem}
      keyExtractor={(item, index) => item.id}
      style={{ flex: 1, alignSelf: "center" }}
    />
  );
}

CategoryMealsScreen.navigationOptions = (navData) => {
  const selectedCategoryId = navData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(
    (cat) => cat.id === selectedCategoryId
  );
  return { title: selectedCategory.title };
};
export default CategoryMealsScreen;
