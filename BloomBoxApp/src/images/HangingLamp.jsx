import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const HangingLamp = (props) => (
  <Svg
    width={62}
    height={163}
    viewBox="0 0 62 163"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G id="Hanging Lamp">
      <G id="Light">
        <Path
          id="Hanging Lamp Light"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.8696 162.114C45.5074 162.114 57.3738 155.555 57.3738 147.464C57.3738 139.373 45.5074 132.814 30.8696 132.814C16.2317 132.814 4.36542 139.373 4.36542 147.464C4.36542 155.555 16.2317 162.114 30.8696 162.114Z"
          fill="#DFDFD9"
        />
        <Path
          id="Hanging Lamp_2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M61.7391 157.556C61.7391 139.576 47.9183 125 30.8696 125C13.8208 125 0 139.576 0 157.556"
          fill="#DDB790"
        />
      </G>
      <Path
        id="Wire"
        d="M32.1243 0.0869141H29.0062V125.297H32.1243V0.0869141Z"
        fill="#DDB790"
      />
    </G>
  </Svg>
);
export default HangingLamp;
