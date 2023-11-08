import { LinearGradient } from "expo-linear-gradient";
import { styled } from "@gluestack-ui/themed";

//The styled function is then used to create a new component called myLinearGradient.
// This component is a styled version of the LinearGradient component.
const myLinearGradient = styled(
  LinearGradient,
  {},

  {
    resolveProps: ["colors"],
  },
  {
    propertyTokenMap: {
      colors: "colors",
    },
    propertyResolver: {
      colors: (rawValue: any, resolver: any) => {
        rawValue.forEach((color: any, index: number) => {
          rawValue[index] = resolver(color);
        });
        return rawValue;
      },
    },
  }
);

export default myLinearGradient;
