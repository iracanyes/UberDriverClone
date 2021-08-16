import { Dispatch, SetStateAction } from "react";
import { ColorSchemeName } from "react-native";

export interface INavigationProps {
  colorScheme?: ColorSchemeName;
}

export interface IDrawerContent {
  state: any;
  navigation: any;
  descriptors: any;
  progress?: any;
}

/*
export interface IVideoPlayerProps {
  data: IMovie | IEpisode;
  videoType: string;
  playButtonPressed: boolean;
  setPlayButtonPressed: Dispatch<SetStateAction<boolean>>;
}
*/
