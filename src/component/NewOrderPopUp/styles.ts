import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 10,
    zIndex: 200,
    backgroundColor: "#00000055",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 10,
    right: 0,
  },
  declineButton: {
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: Colors.default.black.primary,
    padding: 10,
    position: "absolute",
    top: 150,
    left: 10,
    zIndex: 100,
  },
  declineIcon: {
    color: Colors.default.white.light,
    marginRight: 5,
  },
  declineText: {
    fontSize: 18,
    color: Colors.default.white.light,
    marginRight: 5,
  },
  cardWrapper: {
    position: "absolute",
    bottom: 50,
  },
  card: {
    width: Dimensions.get("window").width,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: Colors.default.black.primary,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.default.white.light,
  },
  userIconWrapper: {
    //borderRadius: 50,
    marginHorizontal: 20,
  },
  progressBar: {
    //borderRadius: 50,
    //fontSize: 45,
    //fontWeight: "bold",
    color: Colors.default.white.light,
    borderColor: Colors.default.green.primary,
    position: "absolute",
    bottom: 0,
    zIndex: 100,
  },
  iconUser: {
    color: Colors.default.white.light,
    padding: 16,
    backgroundColor: Colors.default.blue.light,
    borderRadius: 50,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.default.white.light,
    textAlign: "center",
    paddingVertical: 5,
  },
  caption: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.default.white.light,
    paddingVertical: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  iconStar: {
    color: Colors.default.white.light,
    marginRight: 5,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.default.white.light,
  },
});

export default styles;
