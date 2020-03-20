import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { globalStyles, images } from "../styles/global";
import Button from "../components/Button";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email()
    .required()
    .min(3),
  password: Yup.string()
    .required()
    .min(6)
});

export default function Login({ login, googleAuth }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ ...globalStyles.container, ...styles.form }}>
        <Image style={styles.logo} source={images.corona} />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            login(values);
          }}
        >
          {props => (
            <View>
              <TextInput
                style={globalStyles.input}
                placeholder="Email"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.email && props.errors.email}
              </Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Password"
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                secureTextEntry={true}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.password && props.errors.password}
              </Text>
              <Button text="submit" onPress={props.handleSubmit} />
              <Text style={globalStyles.orText}>OR</Text>
              <Button
                text="Sign in with Google"
                onPress={() => {
                  googleAuth().then(res => {
                    login(res);
                  });
                }}
              />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  form: { justifyContent: "center" },
  logo: {
    height: 90,
    width: 340
  }
});
