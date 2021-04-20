import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import MealItem from "../components/MealItem";
import { CATEGORIES, MEALS } from "../constants/DummyData";

function CategoryMealsScreen(props) {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        bgImage={itemData.item.imageUrl}
        duration={itemData.item.duration}
        affordability={itemData.item.affordability}
        complexity={itemData.item.complexity}
      />
    );
  };

  const catId = props.navigation.getParam("categoryId");
  const selectedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );
  return (
    <View style={styles.screen}>
      <FlatList
        data={selectedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{width:'100%'}}
      />
    </View>
  );
}

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");

  const selectedData = CATEGORIES.find((cat) => cat.id === catId);
  return {
    title: selectedData.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealsScreen;
