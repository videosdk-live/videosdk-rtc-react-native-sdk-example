import * as React from "react";
import Svg, { Path } from "react-native-svg";

function NetworkIcon(props) {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M3.8 9.33333H2V13H3.8V9.33333Z" fill={"#fff"} />
      <Path d="M7.39998 7.5H5.59998V13H7.39998V7.5Z" fill={"#fff"} />
      <Path d="M11 5.20831H9.20001V13H11V5.20831Z" fill={"#fff"} />
      <Path d="M14.6 2H12.8V13H14.6V2Z" fill={"#fff"} />
    </Svg>
  );
}

export default NetworkIcon;
