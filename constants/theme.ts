const COLORS = {
  primary: "#9a3412", // orange800, gluestack-ui-->default tokens
  secondary: "#292524", // warmGray800, gluestack-ui-->default tokens
  tertiary: "#075985", // lightBlue800, gluestack-ui-->default tokens

  gray: "#e5e7eb", // coolGray200, gluestack-ui-->default tokens
  gray2: "#6b7280", // coolGray500, gluestack-ui-->default tokens
  gray3: "#1f2937", // coolGray800, gluestack-ui-->default tokens

  backgroundLight: "#F5F5F5", //bavkgroundLight50 
  white: "#F3F4F8", //
  lightWhite: "#FAFAFC",

  error: "#991B1B", // error900, gluestack-ui-->default tokens
};

const FONT = {
  regular: "Exo2Regular",
  medium: "Exo2Medium",
  bold: "Exo2Bold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  normal: 16,
  medium: 18,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

const tintColorLight = '#94a3b8'; //blueGray400
const tintColorDark = '#fff'; // white
const THEMEMS = {
  theme_light: {
    text: '#000',//black text
    background: '#F5F5F5', // backgroundLight50
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  theme_dark: {
    text: '#fff',
    background: "#262626", // backgroundDark900
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },

};

export { COLORS, FONT, SIZES, SHADOWS, THEMEMS };
