import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useReducer } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import { createProduct, updateProduct } from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputType]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputType]: action.isValid,
    };

    let formIsValid = true;

    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formValidity: formIsValid,
    };
  }
  return state;
};

function EditScreen({ navigation }) {
  const dispatch = useDispatch();

  const editedProductId = navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find(
      (product) => product.id === editedProductId
    )
  );
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      price: "",
      description: editedProduct ? editedProduct.description : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formValidity: editedProduct ? true : false,
  });

  const textChangeHandler = (inputType, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      inputType: inputType,
    });
  };

  const submitHandler = useCallback(async () => {
    if (!formState.formValidity) {
      Alert.alert("Wrong Input !");
      return;
    }
    if (editedProduct) {
     await dispatch(
        updateProduct(
          editedProductId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description
        )
      );
    } else {
     await dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          +formState.inputValues.price,
          formState.inputValues.description
        )
      );
    }
    navigation.goBack();
  }, [dispatch, editedProductId, formState]);

  useEffect(() => {
    navigation.setParams({ submitHandler: submitHandler });
  }, [submitHandler]);

  return (
    <Card>
      <View style={styles.form_control}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={formState.inputValues.title}
          onChangeText={textChangeHandler.bind(this, "title")}
        />
      </View>
      <View style={styles.form_control}>
        <Text style={styles.label}>ImageUrl</Text>
        <TextInput
          style={styles.input}
          value={formState.inputValues.imageUrl}
          onChangeText={textChangeHandler.bind(this, "imageUrl")}
        />
      </View>
      {!editedProductId && (
        <View style={styles.form_control}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.price}
            keyboardType="decimal-pad"
            onChangeText={textChangeHandler.bind(this, "price")}
          />
        </View>
      )}
      <View style={styles.form_control}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={formState.inputValues.description}
          onChangeText={textChangeHandler.bind(this, "description")}
        />
      </View>
    </Card>
  );
}

EditScreen.navigationOptions = ({ navigation }) => {
  const submitHandler = navigation.getParam("submitHandler");
  return {
    title: "Create/Update Product",
    headerRight: () => (
      <Ionicons
        name="ios-save-sharp"
        size={25}
        onPress={submitHandler}
        style={{ marginRight: 20 }}
        color="#fff"
      />
    ),
  };
};

const styles = StyleSheet.create({
  form_control: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  label: {
    fontFamily: "open-sans-bold",
  },
  input: {
    fontFamily: "open-sans",
    borderBottomColor: "#ccc",
    borderBottomWidth: 4,
  },
});

export default EditScreen;
