import { Ionicons } from "@expo/vector-icons";
import React, { useState, useCallback, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setFilters } from "../../store/actions/meals";

const SwitchItem = ({ label, setState, state }) => {
  return (
    <View style={styles.switchItem}>
      <Text style={styles.title}>{label}</Text>
      <Switch value={state} onValueChange={setState} trackColor="green" />
    </View>
  );
};

function FilterScreen(props) {
  const [isGlutinFree, setIsGlutinFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const filteredData = {
      GlutinFree:isGlutinFree,
      Vegan:isVegan,
      Vegetarian:isVegetarian,
      LactoseFree:isLactoseFree,
    };
    dispatch(setFilters(filteredData))
  }, [isGlutinFree, isVegan, isVegetarian, isLactoseFree,dispatch]);

  useEffect(() => {
    props.navigation.setParams({ save: saveFilters });
   
  }, [saveFilters]);
  return (
    <View style={styles.screen}>
      <SwitchItem
        label="GlutinFree"
        state={isGlutinFree}
        setState={(value) => setIsGlutinFree(value)}
      />
      <SwitchItem
        label="Vegan"
        state={isVegan}
        setState={(value) => setIsVegan(value)}
      />
      <SwitchItem
        label="Vegetarian"
        state={isVegetarian}
        setState={(value) => setIsVegetarian(value)}
      />
      <SwitchItem
        label="LactoseFree"
        state={isLactoseFree}
        setState={(value) => setIsLactoseFree(value)}
      />
    </View>
  );
}

FilterScreen.navigationOptions = (navData) => {
  return {
    title: "Filter Screen",
    headerLeft: () => (
      <Ionicons
        name="ios-menu-sharp"
        size={25}
        onPress={() => navData.navigation.toggleDrawer()}
        style={styles.menu}
      />
    ),
    headerRight: () => (
      <Ionicons
        name="ios-save"
        onPress={navData.navigation.getParam("save")}
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
  menu: {
    color: "#fff",
    marginLeft: 20,
  },
  switchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    margin: 10,
    paddingHorizontal: 14,
  },
  title: {
    fontFamily: "open-sans",
  },
});
export default FilterScreen;
