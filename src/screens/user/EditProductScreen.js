import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { createItem, updateItem } from "../../store/actions/products";

function EditProductScreen({ navigation }) {
  const dispatch = useDispatch();
  const prodId = navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(updateItem(prodId, title, imageUrl, description));
    } else {
      dispatch(createItem(title, imageUrl, +price, description));
    }
    navigation.goBack();
  }, [prodId, dispatch, title, imageUrl, price, description]);

  useEffect(() => {
    navigation.setParams({ submitHandler: submitHandler });
  }, [submitHandler]);

  return (
    <View style={styles.form}>
      <View style={styles.form_control}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(title) => setTitle(title)}
        />
      </View>
      <View style={styles.form_control}>
        <Text style={styles.label}>ImageURL</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={(imageUrl) => setImageUrl(imageUrl)}
        />
      </View>
      {editedProduct ? null : (
        <View style={styles.form_control}>
          <Text style={styles.label}>price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={(price) => setPrice(price)}
          />
        </View>
      )}
      <View style={styles.form_control}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(description) => setDescription(description)}
        />
      </View>
    </View>
  );
}

EditProductScreen.navigationOptions = ({ navigation }) => {
  const submit = navigation.getParam("submitHandler");
  return {
    title: "Edit Product",
    headerRight: () => (
      <Ionicons
        name="ios-save-sharp"
        color="#fff"
        size={25}
        style={{ paddingRight: 15 }}
        onPress={submit}
      />
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  form_control: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    margin: 5,
  },
  label: {
    fontFamily: "open-sans",
  },
  input: {
    borderBottomColor: "#666",
    borderBottomWidth: 2,
  },
});
export default EditProductScreen;
