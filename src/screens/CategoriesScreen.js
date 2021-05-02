import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet} from "react-native";
import {
  FlatList,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import { CATEGORIES } from "../constants/DummyData";

function CategoriesScreen(props) {
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item, index) => item.id}
      numColumns={2}
      renderItem={(itemData) => {
        return (
          <View style={styles.gridItem}>
            <TouchableNativeFeedback
              style={{backgroundColor: itemData.item.color,...styles.touchItem}}
              onPress={() => {
                props.navigation.navigate({
                    routeName:"CategoryMealsScreen",
                    params:{
                        categoryId:itemData.item.id
                    }
                });
                
              }}
            >
              <Text style={{ fontFamily: "open-sans-bold" }} numberOfLines={1}>
                {itemData.item.title}
              </Text>
            </TouchableNativeFeedback>
          </View>
        );
      }}
    />
  );
}

CategoriesScreen.navigationOptions = (navData) => {
  return {
    title: "The Meal App",
    headerLeft: () => (
      <Ionicons
        name="ios-menu-sharp"
        size={25}
        onPress={() => navData.navigation.toggleDrawer()}
        style={styles.menu}
      />
    ),
  };
};
const styles = StyleSheet.create({
  menu: {
    color: "#fff",
    marginLeft: 20,
  },
  gridItem: {
    flex: 1,
    height: 150,
    margin: 10,
  },
  touchItem: {
    height: "100%",
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
});
export default CategoriesScreen;
