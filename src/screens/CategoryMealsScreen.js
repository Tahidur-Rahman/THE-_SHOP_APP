import React, { useState } from "react";
import { Text, View,StyleSheet, Button } from "react-native";

function CategoryMealsScreen(props) {

  
  return (
    <View style={styles.screen}>
      <Text>The CategoryMeals Screen</Text>
      <Button title="Go to MealDetails" onPress={()=>props.navigation.navigate({routeName:'MealDetails'})}/>
    </View>
  );
}

const styles= StyleSheet.create({
  screen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})
export default CategoryMealsScreen;
