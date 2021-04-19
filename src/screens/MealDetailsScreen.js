import React, { useState } from "react";
import { Text, View,StyleSheet } from "react-native";

function MealDetailsScreen() {

  
  return (
    <View style={styles.screen}>
      <Text>The MealDetails Screen</Text>
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
export default MealDetailsScreen;
