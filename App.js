import React, { useState } from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import ProductsNavigator from "./src/navigations/ProductsNavigator";
import productsReducer from "./src/store/reducers/products";
import cartReducer from "./src/store/reducers/cart";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import orderReducer from "./src/store/reducers/orders";

const rootReducer = combineReducers({
  products: productsReducer,
  cart:cartReducer,
  orders : orderReducer
});

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require('./src/assets/Fonts/OpenSans-Regular.ttf'),
    "open-sans-bold": require('./src/assets/Fonts/OpenSans-Bold.ttf'),
  });
};

const store = createStore(rootReducer);

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(e) => console.log(e)}
      />
    )
  }

  return (
    <Provider store={store}>
      <ProductsNavigator />
    </Provider>
  );
}

export default App;
