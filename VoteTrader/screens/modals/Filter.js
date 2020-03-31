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
import { setTradeFilters } from "../../actions";
import { globalStyles, images } from "../../styles/global";
import { constants } from "../../shared/constants";
import { httpPostOptions } from "../../shared/http";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import { Platform } from "@unimodules/core";

export default function Filter({ modalOpen }) {
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [tags, setTags] = useState({
    tag: "",
    tagsArray: []
  });
  const [beginDatepickerOpen, setBeginDatepickerOpen] = useState(false);
  const [endDatepickerOpen, setEndDatepickerOpen] = useState(false);

  const onBeginChange = (event, selectedDate) => {
    const currentDate = selectedDate || beginDate;
    setBeginDatepickerOpen(Platform.OS === "ios");
    setBeginDate(currentDate);
  };

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDatepickerOpen(Platform.OS === "ios");
    setEndDate(currentDate);
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
            tag: "",
            tags: []
          }}
          onSubmit={(values, actions) => {
            values.startDate = beginDate.getTime();
            values.endDate = endDate.getTime();
            values.tags = tags.tagsArray;
            console.log("Filter Values: " + JSON.stringify(values));
            store.dispatch(setTradeFilters(values));
            actions.resetForm();
            setBeginDate(new Date());
            setEndDate(new Date());
            setTags({
              tag: "",
              tagsArray: []
            });
            modalOpen(false);
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
              <View style={styles.dateRange}>
                <View style={styles.date}>
                  <TouchableOpacity
                    onPress={() => {
                      setBeginDatepickerOpen(true);
                    }}
                  >
                    <MaterialIcons
                      name="insert-invitation"
                      size={32}
                      color={"#666"}
                    />
                  </TouchableOpacity>
                  <Text style={styles.dateText}>
                    {beginDate.toDateString()}
                  </Text>
                </View>
                <Text style={styles.toText}>- TO -</Text>
                <View style={styles.date}>
                  <TouchableOpacity
                    onPress={() => {
                      setEndDatepickerOpen(true);
                    }}
                  >
                    <MaterialIcons
                      name="insert-invitation"
                      size={32}
                      color={"#666"}
                    />
                  </TouchableOpacity>
                  <Text style={styles.dateText}>{endDate.toDateString()}</Text>
                </View>
              </View>
              {beginDatepickerOpen && Platform.OS === "ios" ? (
                <Popup
                  visible={beginDatepickerOpen}
                  modalOpen={setBeginDatepickerOpen}
                >
                  <View style={styles.datepicker}>
                    <Text style={styles.labelText}>Start Date</Text>
                    <DateTimePicker
                      testID="dateTimePicker"
                      timeZoneOffsetInMinutes={0}
                      minimumDate={new Date()}
                      value={beginDate}
                      mode={"date"}
                      is24Hour={false}
                      display="default"
                      onChange={onBeginChange}
                    />
                    <Button
                      text="Save"
                      onPress={() => setBeginDatepickerOpen(false)}
                    />
                  </View>
                </Popup>
              ) : (
                beginDatepickerOpen && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    minimumDate={endDate}
                    value={beginDate}
                    mode={"date"}
                    is24Hour={false}
                    display="default"
                    onChange={onBeginChange}
                  />
                )
              )}
              {endDatepickerOpen && Platform.OS === "ios" ? (
                <Popup
                  visible={endDatepickerOpen}
                  modalOpen={setEndDatepickerOpen}
                >
                  <View style={styles.datepicker}>
                    <Text style={styles.labelText}>End Date</Text>
                    <DateTimePicker
                      testID="dateTimePicker"
                      timeZoneOffsetInMinutes={0}
                      minimumDate={beginDate}
                      value={endDate}
                      mode={"date"}
                      is24Hour={false}
                      display="default"
                      onChange={onEndChange}
                    />
                    <Button
                      text="Save"
                      onPress={() => setEndDatepickerOpen(false)}
                    />
                  </View>
                </Popup>
              ) : (
                endDatepickerOpen && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    minimumDate={beginDate}
                    value={endDate}
                    mode={"date"}
                    is24Hour={false}
                    display="default"
                    onChange={onEndChange}
                  />
                )
              )}
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
                />
              </View>
              <Button text="Save Filter" onPress={props.handleSubmit} />
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
  toText: {
    left: 75
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
