import React from "react";
import {  View, StyleSheet, FlatList } from "react-native";
import MealItem from "../components/MealItem";

function MealList({listData,navigation}) {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        bgImage={itemData.item.imageUrl}
        duration={itemData.item.duration}
        affordability={itemData.item.affordability}
        complexity={itemData.item.complexity}
        onSelect={() => {
          navigation.navigate({
            routeName: "MealDetails",
            params: {
              mealId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  
  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealList;
