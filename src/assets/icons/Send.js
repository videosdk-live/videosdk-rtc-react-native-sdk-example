import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Send(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 16 16" {...props}>
      <Path d="M0 0h16v16H0z" fill="none" />
      <Path
        d="M1.444 13.844L15.281 8 1.444 2.156l-.007 4.545 9.888 1.3-9.888 1.297z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Send;
