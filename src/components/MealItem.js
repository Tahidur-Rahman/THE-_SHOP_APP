import React from "react";
import {
  View,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions
} from "react-native";

function MealItem({ title, bgImage, duration, affordability, complexity ,onSelect}) {
  return (
    <View style={styles.itemContainer}>
      <TouchableNativeFeedback onPress={onSelect}>
        <View>
          <View style={styles.imgContainer}>
            <ImageBackground source={{ uri: bgImage }} style={styles.bgImg}>
              <Text style={styles.title} numberOfLines={1}>{title}</Text>
            </ImageBackground>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>{duration} m</Text>
            <Text style={styles.bottomText}>{affordability.toUpperCase()}</Text>
            <Text style={styles.bottomText}>{complexity.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width:Dimensions.get('window').width - 20 ,
    height: 200,
    flex: 1,
    backgroundColor: "#ccc",
    margin:10,
    padding:10
  },
  imgContainer: {
    height: "90%",
  },
  bottomContainer: {
    flexDirection: "row",
    height:'10%',
    justifyContent: "space-around",
    alignItems: "center",
  },
  bgImg: {
    width: "100%",
    height: "100%",
    justifyContent:'flex-end',
    alignItems:'center'
  },
  title:{
      backgroundColor:"rgba(0,0,0,0.6)",
      fontFamily:'open-sans-bold',
      width:'100%',
      color:"#fff",
      textAlign:'center',
      padding:5
  },
  bottomText:{
      fontFamily:'open-sans'  }
});

export default MealItem;
