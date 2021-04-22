import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const FilterSwitch = ({ label, state, setState }) => {
  return (
    <View style={styles.filterSwitch}>
      <Text style={styles.switchTitle}>{label}</Text>
      <Switch
        value={state}
        onValueChange={setState}
        trackColor={{ true: Colors.primary }}
      />
    </View>
  );
};

function FiltersScreen(props) {
  const { navigation } = props;
  const [isGlutinFree, setIsGlutinFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);

  const saveFilters = useCallback(() => {
    const filteredData = {
      isGlutinFree: isGlutinFree,
      isVegan: isVegan,
      isVegetarian: isVegetarian,
      isLactoseFree: isLactoseFree,
    };
    console.log(filteredData);
  }, [isGlutinFree, isVegan, isVegetarian, isLactoseFree]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>The Filters Screen</Text>

      <FilterSwitch
        label="GlutinFree"
        state={isGlutinFree}
        setState={(value) => {
          setIsGlutinFree(value);
        }}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        setState={(value) => {
          setIsVegan(value);
        }}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        setState={(value) => {
          setIsVegetarian(value);
        }}
      />
      <FilterSwitch
        label="LactoseFree"
        state={isLactoseFree}
        setState={(value) => {
          setIsLactoseFree(value);
        }}
      />
    </View>
  );
}

FiltersScreen.navigationOptions = (navData) => {
  return {
    title: "Filters",
    headerLeft: ()=>(
      <Ionicons
        name="ios-menu-sharp"
        onPress={() => navData.navigation.toggleDrawer()}
        size={25}
        color="#fff"
        style={{ paddingLeft: 20 }}
      />
    ),
    headerRight:()=> (
      <Ionicons
        name="ios-save"
        onPress={navData.navigation.getParam('save')}
        size={25}
        color="#fff"
        style={{ paddingRight: 20 }}
      />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 10,
  },
  filterSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    margin: 10,
    paddingHorizontal: 14,
  },
  switchTitle: {
    fontFamily: "open-sans",
  },
});
export default FiltersScreen;
