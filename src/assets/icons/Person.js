import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Person(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6 6a3 3 0 100-6 3 3 0 100 6zm0 1.5c-2.002 0-6 1.005-6 3v.75c0 .412.338.75.75.75h10.5c.412 0 .75-.338.75-.75v-.75c0-1.995-3.998-3-6-3z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Person;
