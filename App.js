import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import MealsNavigator from "./src/navigations/MealsNavigator";
import { enableScreens } from "react-native-screens";

import { createStore, combineReducers } from "redux";
import mealsReducer from "./src/store/reducers/meals";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./src/assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./src/assets/Fonts/OpenSans-Bold.ttf"),
  });
};
function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  enableScreens();

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(e) => console.log(e)}
      />
    );
  }
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}


export default App;
