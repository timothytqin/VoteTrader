import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginHorizontal: 16,
    marginTop: 5
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginLeft: 15
    // marginBottom: 10,
    // marginTop: 6
  }
});

export const images = {
  corona: require("../assets/corona.png")
};
