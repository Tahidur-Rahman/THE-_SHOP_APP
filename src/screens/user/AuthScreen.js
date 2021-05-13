import { LinearGradient } from "expo-linear-gradient";
import React, { useReducer, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import Card from "../../components/Card";
import COLORS from "../../constants/COLORS";
import { logIn, signUp } from "../../store/actions/auth";


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

function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email:'',
      password:''
    },
    inputValidities: {
      email:false,
      password:false
    },
    formValidity: false
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

  const authHandler = ()=>{
    let action;
    if(isSignUp){
      action = signUp(formState.inputValues.email,formState.inputValues.password)
    }
    else{
      action = logIn(formState.inputValues.email,formState.inputValues.password)

    }
    dispatch(action)
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={90}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <View style={styles.form_control}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formState.inputValues.email}
                onChangeText={textChangeHandler.bind(this,'email')}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.form_control}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                keyboardType="visible-password"
                value={formState.inputValues.password}
                onChangeText={textChangeHandler.bind(this,'password')}
              />
            </View>
            <View style={styles.button}>
              <Button
                title={isSignUp ? 'Sign Up' : 'Log in'}
                onPress={authHandler}
                color={COLORS.primary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title={`Switch to ${isSignUp ? 'Log in':'Sign Up'}`}
                onPress={()=>{
                  setIsSignUp(prev => !prev)
                }}
                color={COLORS.secondary}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: { flex: 1, justifyContent: "center", alignItems: "center" },
  authContainer: {
    width: 260,
    height: 260,
  },
  form_control: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffeeff",
  },
  label: {
    fontFamily: "open-sans-bold",
  },
  input: {
    fontFamily: "open-sans",
    borderBottomColor: "#ccc",
    borderBottomWidth: 4,
  },
  button: {
    marginVertical: 5,
    marginHorizontal: 30,
  },
});

export default AuthScreen;
