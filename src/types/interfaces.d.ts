import { Dispatch, SetStateAction } from "react";
import { ColorSchemeName } from "react-native";
import PickingUpClient from "../component/StatusBox/PickingUpClient";

export interface INavigationProps {
  colorScheme?: ColorSchemeName;
}

export interface IDrawerContent {
  state: any;
  navigation: any;
  descriptors: any;
  progress?: any;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  rating: number;

  carID: string;
  car: ICar;
}

export interface ICar {
  id: string;
  rating: number;
}

export interface IOrder {
  id: string;
  type: string;
  status: string;
  duration: number;
  distance: number;
  destLatitude: number;
  destLongitude: number;
  originLatitude: number;
  originLongitude: number;

  userId: string;
  user: IUser;
}

export interface IHomeMapProps {
  order: IOrder;
}

export interface INewOrderPopUp {
  newOrder: IOrder;
  setNewOrder: Dispatch<SetStateAction<IOrder | null>>;
  onDecline: () => void;
  onAccept: (newOrder: IOrder) => void;
}

export interface IPickingUpClient {
  order: IOrder;
}

/*
export interface IVideoPlayerProps {
  data: IMovie | IEpisode;
  videoType: string;
  playButtonPressed: boolean;
  setPlayButtonPressed: Dispatch<SetStateAction<boolean>>;
}
*/
