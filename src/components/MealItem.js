import React from "react";
import {
  Dimensions,
  StyleSheet,
  ImageBackground,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function MealItem({
  bgImg,
  title,
  duration,
  affordability,
  complexity,
  onSelect,
}) {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.itemContainer} activeOpacity={0.8}>
      <View>
        <View style={styles.imgContainer}>
          <ImageBackground style={styles.bgImg} source={{ uri: bgImg }}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
          </ImageBackground>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.text}>{duration}</Text>
          <Text style={styles.text}>{affordability}</Text>
          <Text style={styles.text}>{complexity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    width: Dimensions.get("window").width - 20,
    height: 200,
    flex: 1,
    backgroundColor: "#ccc",
    margin: 10,
    padding: 10,
  },
  imgContainer: {
    height: "90%",
  },
  descContainer: {
    flexDirection: "row",
    height: "10%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bgImg: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    backgroundColor: "rgba(0,0,0,0.6)",
    fontFamily: "open-sans-bold",
    width: "100%",
    color: "#fff",
    textAlign: "center",
    padding: 5,
  },
  text: {
    fontFamily: "open-sans",
  },
});
export default MealItem;
