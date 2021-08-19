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
    //paddingLeft: 10,
    //backgroundColor: Colors.default.red.light,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.default.grey.dark,
    //backgroundColor: Colors.default.blue.dark,
  },
  iconUser: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: Colors.default.green.primary,
    marginHorizontal: 15,
  },
  inlineContent: {
    width: 80,
    flexDirection: "row",
    //backgroundColor: Colors.default.blue.light,
    justifyContent: "flex-end",
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
