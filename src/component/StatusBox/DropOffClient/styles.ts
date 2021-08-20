import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "80%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.default.orange.primary,
    flexDirection: "row",
  },
  iconFlag: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default styles;
