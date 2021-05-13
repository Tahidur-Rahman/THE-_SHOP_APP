import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { combineReducers, createStore,applyMiddleware } from "redux";
import productsReducer from "./src/store/reducers/products";
import cartReducer from "./src/store/reducers/cart";
import ShopNavigator from "./src/navigation/ShopNavigator";
import { Provider } from "react-redux";
import orderReducer from "./src/store/reducers/order";
import ReduxThunk from 'redux-thunk'

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./src/assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./src/assets/Fonts/OpenSans-Bold.ttf"),
  });
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));
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
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

export default App;
