/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { Linking } from "react-native";

export default {
  prefixes: ["http://10.0.2.2:8081/"],
  config: {
    screens: {
      Login: "login",
      Subscribe: "subscribe",
      ConfirmSignUp: "confirm_sign-up",
      Root: {
        screens: {
          Home: "/",
          TabTwo: {
            screens: {
              TabTwoScreen: "two",
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
