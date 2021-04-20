import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Categories from "../components/Categories";
import { CATEGORIES } from "../constants/DummyData";

function CategoriesScreen(props) {
  const renderGridItem = (itemData) => {
    return (
      <Categories
        title={itemData.item.title}
        bgColor={itemData.item.color}
        onSelect={() =>
          props.navigation.navigate({
            routeName: "CategoryMeals",
            params: {
              categoryId: itemData.item.id,
            },
          })
        }
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
}

CategoriesScreen.navigationOptions = {
  title: "The Meal App",
};

export default CategoriesScreen;
