import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, Modal } from "react-native";
import FlipToggle from "react-native-flip-toggle-button";

import store from "../store";
import { globalStyles, images } from "../styles/global";

import Login from "../screens/Login";
import Signup from "../screens/Signup";

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <View style={globalStyles.container}>
      <Modal visible={store.getState().reducer.authenticated === null}>
        <View style={styles.modal}>
          <View style={styles.form}>
            <Login visibility={showLogin} />
            <Signup visibility={!showLogin} />
          </View>
          <View style={styles.toggle}>
            <FlipToggle
              value={showLogin}
              buttonWidth={180}
              buttonHeight={40}
              buttonRadius={50}
              buttonOnColor={"#0f0"}
              buttonOffColor={"#00f"}
              sliderWidth={35}
              sliderHeight={35}
              sliderRadius={50}
              onLabel={"Login"}
              offLabel={"Signup"}
              labelStyle={{
                color: "#000",
                fontWeight: "bold",
                fontSize: 20
              }}
              onToggle={() => {
                setShowLogin(!showLogin);
              }}
            />
          </View>
        </View>
      </Modal>
      <ScrollView>
        <Image style={styles.logo} source={images.corona} />
        <Text style={styles.subHeaderText}>About Us</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis
          suscipit dui, sit amet congue lorem scelerisque sit amet. Etiam in
          magna convallis, blandit mauris non, tincidunt ipsum. Phasellus
          interdum, sapien et lobortis cursus, elit turpis elementum purus, sed
          scelerisque mi libero quis lorem. Curabitur molestie mi sed lorem
          pellentesque, vitae luctus quam vehicula. Nulla vel imperdiet lorem.
          Fusce porta ipsum metus, eu molestie lorem vulputate interdum. Aliquam
          erat volutpat. Curabitur nec condimentum libero, ut ultrices purus.
          Integer accumsan urna ut nibh varius pretium. Aenean cursus ornare
          venenatis. Vestibulum condimentum nunc massa, sed maximus arcu
          fermentum eu. Nulla id ullamcorper ex. Morbi sit amet elit odio. Donec
          nec odio dapibus, egestas ante a, mattis sem.
        </Text>
        <Text style={styles.subHeaderText}>About Us</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis
          suscipit dui, sit amet congue lorem scelerisque sit amet. Etiam in
          magna convallis, blandit mauris non, tincidunt ipsum. Phasellus
          interdum, sapien et lobortis cursus, elit turpis elementum purus, sed
          scelerisque mi libero quis lorem. Curabitur molestie mi sed lorem
          pellentesque, vitae luctus quam vehicula. Nulla vel imperdiet lorem.
          Fusce porta ipsum metus, eu molestie lorem vulputate interdum. Aliquam
          erat volutpat. Curabitur nec condimentum libero, ut ultrices purus.
          Integer accumsan urna ut nibh varius pretium. Aenean cursus ornare
          venenatis. Vestibulum condimentum nunc massa, sed maximus arcu
          fermentum eu. Nulla id ullamcorper ex. Morbi sit amet elit odio. Donec
          nec odio dapibus, egestas ante a, mattis sem.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 90,
    width: 340,
    marginVertical: 25
  },
  subHeaderText: {
    fontWeight: "bold",
    fontSize: 28,
    marginVertical: 10
  },
  text: {
    fontSize: 18
  },
  modal: {
    flex: 1
  },
  form: {
    flex: 6
  },
  toggle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
