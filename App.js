import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import MealsNavigator from "./src/navigations/MealsNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./src/assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./src/assets/Fonts/OpenSans-Bold.ttf"),
  });
};
function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(e) => console.log(e)}
      />
    );
  }
  return <MealsNavigator />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default App;
