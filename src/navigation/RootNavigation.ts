import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params = {}){
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
