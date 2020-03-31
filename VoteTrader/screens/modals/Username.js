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
import store from "../../store";
import { googleAuth, getGoogleProfile, signup } from "../../auth";
import { globalStyles, images } from "../../styles/global";
import Button from "../../components/Button";
import { constants } from "../../shared/constants";
import { httpPostOptions } from "../../shared/http";
import { loadProfile } from "../../actions";

const SignupSchema = Yup.object({
  username: Yup.string().required()
});

export default function Username({ visibility }) {
  return visibility ? (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ ...globalStyles.container, ...styles.form }}>
        <Image style={styles.logo} source={images.corona} />
        <Formik
          initialValues={{
            username: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            values.email = store.getState().reducer.profile.email;
            fetch(
              constants.server.ngrok + constants.urls.profile,
              httpPostOptions(values)
            );
            store.dispatch(
              loadProfile({
                ...store.getState().reducer.profile,
                username: values.username
              })
            );
          }}
        >
          {props => (
            <View>
              <TextInput
                style={globalStyles.input}
                placeholder="Username"
                onChangeText={props.handleChange("username")}
                value={props.values.username}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.username && props.errors.username}
              </Text>
              <Button text="Save Username" onPress={props.handleSubmit} />
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
