import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 100,
    paddingHorizontal: 15,
  },
  headerButtonContainer: {
    position: "absolute",
    top: 80,
    left: 0,
    zIndex: 150,
  },
  footerButtonContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
  },
  roundedButton: {
    padding: 15,
    borderRadius: 50,
    borderColor: Colors.default.white.light,
    backgroundColor: Colors.default.grey.light,
  },
  buttonMenu: {},
  iconMenu: {},
  buttonPrice: {
    borderRadius: 50,
    borderColor: Colors.default.white.light,
    //backgroundColor: Colors.default.grey.light,
  },
  headerPrice: {
    width: 100,
    height: 40,
    backgroundColor: Colors.default.black.primary,
  },
  headerRightButton: {},
  iconSearch: {},
  map: {
    flex: 1,
    paddingTop: 10,
    zIndex: 1,
  },
  buttonGo: {
    borderRadius: 50,
    borderColor: Colors.default.white.light,
    backgroundColor: Colors.default.grey.light,
  },
  buttonGoIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: Colors.default.blue.primary,
  },
  buttonLabelText: {
    fontWeight: "bold",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  iconNetworkOn: {
    color: Colors.default.green.primary,
    //backgroundColor: Colors.default.green.primary,
  },
});

export default styles;
