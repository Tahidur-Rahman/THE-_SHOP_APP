import React, { useState } from "react";

import MealsNavigator from "./src/navigations/MealsNavigator";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import { combineReducers, createStore } from "redux";
import mealsReducer from "./store/reducers/meals";
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
  const [fontIsLoaded, setFontIsLoaded] = useState(false);
  enableScreens();

  if (!fontIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontIsLoaded(true)}
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
