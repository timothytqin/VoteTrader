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
// import AES from "crypto-js/aes";
// import SHA256 from "crypto-js/sha256";
import store from "../store";
import { googleAuth } from "../googleAuth";
import { globalStyles, images } from "../styles/global";
import Button from "../components/Button";
import { constants } from "../shared/constants";

const SignupSchema = Yup.object({
  email: Yup.string()
    .email()
    .required(),
  username: Yup.string()
    .required()
    .min(3),
  password: Yup.string()
    .required()
    .min(6),
  passwordRepeat: Yup.string()
    .required()
    .when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    })
});

export default function Signup({ visibility }) {
  const signup = model => {
    fetch(constants.urls.signup, httpPostOptions(model));
  };

  return visibility ? (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ ...globalStyles.container, ...styles.form }}>
        <Image style={styles.logo} source={images.corona} />
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            passwordRepeat: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            // values.password = SHA256(values.password);
            signup(values);
          }}
        >
          {props => (
            <View>
              <TextInput
                style={globalStyles.input}
                placeholder="Email Address"
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
              <TextInput
                style={globalStyles.input}
                placeholder="Repeat Password"
                onChangeText={props.handleChange("passwordRepeat")}
                value={props.values.passwordRepeat}
                secureTextEntry={true}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.passwordRepeat && props.errors.passwordRepeat}
              </Text>
              <Button text="submit" onPress={props.handleSubmit} />
              <Text style={globalStyles.orText}>OR</Text>
              <Button
                text="Sign up with Google"
                onPress={() => {
                  googleAuth().then(res => {
                    signup(res);
                  });
                }}
              />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  ) : null;
}

const styles = StyleSheet.create({
  form: { flex: 1, justifyContent: "center" },
  logo: {
    height: 90,
    width: 370
  }
});
