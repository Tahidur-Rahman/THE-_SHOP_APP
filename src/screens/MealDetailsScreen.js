import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { MEALS } from "../constants/DummyData";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

function MealDetailsScreen(props) {
  const mealId = props.navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const ListItem = (props) => (
    <Text style={styles.itemText}>{props.children}</Text>
  );

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Image source={{uri:selectedMeal.imageUrl}} style={styles.img} />
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>{selectedMeal.duration} m</Text>
          <Text style={styles.bottomText}>
            {selectedMeal.affordability.toUpperCase()}
          </Text>
          <Text style={styles.bottomText}>
            {selectedMeal.complexity.toUpperCase()}
          </Text>
        </View>
        <View>
          <Text >Ingredients</Text>
          {selectedMeal.ingredients.map((item) => (
            <ListItem>{item}</ListItem>
          ))}
        </View>
        <View>
          <Text style={styles.title}>Steps</Text>
          {selectedMeal.steps.map((step) => (
            <ListItem>{step}</ListItem>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

MealDetailsScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
    headerRight: () => (
      <FontAwesome
        name="star-half-full"
        size={26}
        color="yellow"
        style={{ paddingRight: 20 }}
        onPress={(e) => console.log(e)}
      />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    width:'100%',
    padding:10
  },
  bottomText: {
    fontFamily: "open-sans",
  },

  bottomContainer: {
    flexDirection: "row",
    width:'100%',
    justifyContent: "space-around",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: 200
  },
  
});
export default MealDetailsScreen;
