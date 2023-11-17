import heart from "../assets/icons/heart.png";
import menu from "../assets/icons/menu.png";
import search from "../assets/icons/search.png";
import filter from "../assets/icons/filter.png";
import left from "../assets/icons/left.png";
import heartOutline from "../assets/icons/heart-ol.png";
import share from "../assets/icons/share.png";
import location from "../assets/icons/location.png";
import chevronLeft from '../assets/icons/chevron-left.png';
import chevronRight from '../assets/icons/chevron-right.png';

import logo from '../assets/icon.png'

import { ImageSourcePropType } from "react-native";

// Define an interface for the icons object
interface Icons {
  heart: ImageSourcePropType; // Replace 'any' with the appropriate type for the image import
  menu: ImageSourcePropType;
  search: ImageSourcePropType;
  filter: ImageSourcePropType;
  left: ImageSourcePropType;
  heartOutline: ImageSourcePropType;
  share: ImageSourcePropType;
  location: ImageSourcePropType;
  chevronLeft: ImageSourcePropType;
  chevronRight: ImageSourcePropType;
}

// Use the Icons interface to type-check the exported object
const icons: Icons = {
  heart,
  menu,
  search,
  filter,
  left,
  heartOutline,
  share,
  location,
  chevronLeft,
  chevronRight
};

export default icons;
