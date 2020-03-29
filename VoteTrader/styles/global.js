import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginHorizontal: 16,
    margin: 5
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginLeft: 15
  },
  orText: {
    textAlign: "center",
    marginVertical: 30,
    fontSize: 20
  }
});

export const images = {
  corona: require("../assets/corona.png"),
};
