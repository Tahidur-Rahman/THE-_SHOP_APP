import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableNativeFeedback } from "react-native";

function Categories({ title, bgColor, onSelect }) {
  return (
    <View style={styles.gridItem}>
      <TouchableNativeFeedback onPress={onSelect} style={{flex:1}}>
        <View style={{ ...styles.container, ...{ backgroundColor: bgColor } }}>
          <Text numberOfLines={2} style={styles.title}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
    gridItem:{
        flex:1,
        margin: 10,
        height:150
    },
  container: {
    flex: 1,
    borderRadius:10,
    padding:15,
    flexDirection:'row',
    justifyContent: "flex-end",
    alignItems: "flex-end",
 
  },
  title:{
      flex:1,
      fontFamily:'open-sans-bold',
      fontSize:15,
      textAlign:'right',
  }
});
export default Categories;
