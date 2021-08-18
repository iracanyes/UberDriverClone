import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.default.grey.dark,
  },
  iconUser: {
    marginHorizontal: 10,
  },
  iconStar: {
    marginHorizontal: 5,
  },
  content: {
    fontSize: 20,
    //fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
