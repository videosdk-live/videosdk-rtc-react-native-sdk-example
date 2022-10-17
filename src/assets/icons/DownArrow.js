import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DownArrow(props) {
  return (
    <Svg
      width={12}
      height={7}
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.29 5.956l-4.24-4.24A1 1 0 112.46.296L6 3.83 9.54.29a1 1 0 011.41 1.42L6.71 5.95a1 1 0 01-1.42 0v.005z"
        fill="#6F767E"
      />
    </Svg>
  );
}

export default DownArrow;
