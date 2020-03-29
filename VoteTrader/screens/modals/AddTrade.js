import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  FlatList
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TagInput from "react-native-tags-input";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import store from "../../store";
import { globalStyles, images } from "../../styles/global";
import { constants } from "../../shared/constants";
import { httpPostOptions } from "../../shared/http";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import { Platform } from "@unimodules/core";

const TradeSchema = Yup.object({
  policy: Yup.string().required(),
  scope: Yup.string().required(),
  comment: Yup.string()
});

export default function AddTrade() {
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState({
    tag: "",
    tagsArray: []
  });
  const [datepickerOpen, setDatepickerOpen] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatepickerOpen(Platform.OS === "ios");
    setDate(currentDate);
    console.log(currentDate);
  };

  const makeTrade = model => {
    fetch(
      constants.server.ngrok + constants.urls.createTrade,
      httpPostOptions(model)
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.form}>
        <Image style={styles.logo} source={images.corona} />
        <Formik
          initialValues={{
            policy: "",
            scope: "",
            comment: "",
            tag: "",
            tags: []
          }}
          validationSchema={TradeSchema}
          onSubmit={(values, actions) => {
            values.email = store.getState().reducer.profile[0].email;
            values.date = new Date().getTime();
            values.tags = tags;
            console.log(values);
            makeTrade(values);
            actions.resetForm();
            setTags({
              tag: "",
              tagsArray: []
            });
          }}
        >
          {props => (
            <View style={{ flex: 1, flexDirection: "column" }}>
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
              <View style={styles.date}>
                <TouchableOpacity
                  onPress={() => {
                    setDatepickerOpen(true);
                    console.log("clicked");
                  }}
                >
                  <MaterialIcons
                    name="insert-invitation"
                    size={32}
                    color={"#666"}
                  />
                </TouchableOpacity>
                <Text style={styles.dateText}>{date.toDateString()}</Text>
              </View>
              {datepickerOpen && Platform.OS === "ios" && (
                <Popup visible={datepickerOpen} modalOpen={setDatepickerOpen}>
                  <View style={styles.datepicker}>
                    <Text style={styles.labelText}>Date of Vote</Text>
                    <DateTimePicker
                      testID="dateTimePicker"
                      timeZoneOffsetInMinutes={0}
                      minimumDate={new Date()}
                      value={date}
                      mode={"date"}
                      is24Hour={false}
                      display="default"
                      onChange={onChange}
                    />
                    <Button
                      text="Save"
                      onPress={() => setDatepickerOpen(false)}
                    />
                  </View>
                </Popup>
              )}
              {datepickerOpen && Platform.OS !== "ios" && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  minimumDate={new Date()}
                  value={date}
                  mode={"date"}
                  is24Hour={false}
                  display="default"
                  onChange={onChange}
                />
              )}
              <TextInput
                multiline
                height={100}
                style={globalStyles.input}
                placeholder="Comment"
                onChangeText={props.handleChange("comment")}
                value={props.values.comment}
              />
              <View style={{ flex: 1 }}>
                <TagInput
                  updateState={setTags}
                  tags={tags}
                  placeholder="Tags..."
                  label="Press comma & space to add a tag"
                  labelStyle={{ marginLeft: 5 }}
                  leftElement={
                    <MaterialIcons
                      name="label-outline"
                      size={32}
                      color={"#666"}
                    />
                  }
                  leftElementContainerStyle={{ marginLeft: 3 }}
                  containerStyle={{
                    width: Dimensions.get("window").width - 40
                  }}
                  inputContainerStyle={{ ...globalStyles.input, padding: 0 }}
                  autoCorrect={false}
                  tagStyle={styles.tag}
                  tagTextStyle={styles.tagText}
                  keysForTag={" "}
                  // Add ScrollView for tag list
                />
              </View>
              <Button text="Add" onPress={props.handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  form: { flex: 11 },
  logo: {
    height: 90,
    width: 370
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginVertical: 5
  },
  dateText: {
    fontSize: 18
  },
  datepicker: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100
  },
  labelText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 28
  },
  tag: {
    backgroundColor: "#666"
  },
  tagText: {
    color: "#fff"
  }
});
