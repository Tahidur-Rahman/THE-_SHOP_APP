import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback,useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../store/actions/meals";

function MealDetailsScreen(props) {
  const selectedMealId = props.navigation.getParam("mealId");
  const allMeals = useSelector(state => state.meals.meals)
  const selectedMeal = allMeals.find((meal) => meal.id === selectedMealId);


  const disPatch = useDispatch();
  const toggleFavoriteHandler = useCallback(()=>{
    disPatch(toggleFavorite(selectedMealId))
  },[disPatch,selectedMealId])

  useEffect(() => {
    props.navigation.setParams({
      toggleFav:toggleFavoriteHandler
    })
  }, [toggleFavoriteHandler])

  const ListItem = (props) => (
    <Text style={styles.itemText}>🔹 {props.children}</Text>
  );

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Image source={{ uri: selectedMeal.imageUrl }} style={styles.img} />
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
          <Text style={{ fontFamily: "open-sans-bold", marginVertical: 10 }}>
            Ingredients
          </Text>
          {selectedMeal.ingredients.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </View>
        <View>
          <Text style={{ fontFamily: "open-sans-bold", marginVertical: 10 }}>
            Steps
          </Text>
          {selectedMeal.steps.map((step) => (
            <ListItem key={step}>{step}</ListItem>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

MealDetailsScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("mealTitle");
  const toggleFav = navData.navigation.getParam('toggleFav');
  return {
    title: title,
    headerRight: () => (
      <FontAwesome
        name="star-half-empty"
        color="yellow"
        size={25}
        style={{ paddingRight: 20 }}
        onPress={toggleFav}
      />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
  bottomText: {
    fontFamily: "open-sans",
  },

  bottomContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: 200,
  },
  itemText: {
    fontFamily: "open-sans",
  },
});
export default MealDetailsScreen;
