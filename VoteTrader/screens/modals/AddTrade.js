import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import store from "../../store";
import { globalStyles, images } from "../../styles/global";
import { constants } from "../../shared/constants";
import { httpPostOptions } from "../../shared/http";
import { googleAuth, login, getGoogleProfile } from "../../googleAuth";
import Button from "../../components/Button";

const TradeSchema = Yup.object({
  policy: Yup.string().required(),
  scope: Yup.string().required(),
  comment: Yup.string()
});

export default function AddTrade({ closeModal }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.container}>
        <View style={styles.header}>
          <View style={{ flex: 10 }} />
          <View style={styles.close}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <MaterialIcons name="close" size={32} color={"#666"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.form}>
          <Image style={styles.logo} source={images.corona} />
          <Formik
            initialValues={{ policy: "", scope: "", comment: "" }}
            validationSchema={TradeSchema}
            onSubmit={(values, actions) => {
              actions.resetForm();
              console.log(values);
              // login(values);
            }}
          >
            {props => (
              <View>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Policy Name"
                  onChangeText={props.handleChange("policy")}
                  value={props.values.policy}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.policy && props.errors.policy}
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Scope"
                  onChangeText={props.handleChange("scope")}
                  value={props.values.scope}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.scope && props.errors.scope}
                </Text>
                <TextInput
                  multiline
                  height={100}
                  style={globalStyles.input}
                  placeholder="Comment"
                  onChangeText={props.handleChange("comment")}
                  value={props.values.comment}
                />
                <Button text="Add" onPress={props.handleSubmit} />
              </View>
            )}
          </Formik>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  form: { flex: 11 },
  logo: {
    height: 90,
    width: 370
  },
  close: {
    flex: 1
  },
  closeButton: {
    borderColor: "#666",
    borderRadius: 10,
    borderWidth: 1
  }
});
