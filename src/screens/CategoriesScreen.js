import React, { useState } from "react";
import { Text, View,StyleSheet,Button } from "react-native";

function CategoriesScreen(props) {

  
  return (
    <View style={styles.screen}>
      <Text>The Categories Screen</Text>
      
      <Button title="Go to CategoryMeals" onPress={()=>{props.navigation.navigate({routeName:'CategoryMeals'})}}/>
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
export default CategoriesScreen;
