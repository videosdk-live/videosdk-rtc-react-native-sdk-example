import * as React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function ScreenShare(props) {
  return (
    <Svg viewBox="0 0 19 19" {...props}>
      <Defs>
        <ClipPath id="a">
          <Path
            className="a"
            transform="translate(2.547 2.547)"
            d="M0 0H19V19H0z"
          />
        </ClipPath>
      </Defs>
      <G clipPath="url(#a)">
        <Path
          className="a"
          d="M18.72 5.692H4.792a.854.854 0 00-.854.85v10.49a.855.855 0 00.854.854h13.929a.852.852 0 00.85-.854V6.544a.851.851 0 00-.851-.852zm-3.366 5.414l-2.429 2.432a.313.313 0 01-.341.064.309.309 0 01-.193-.289v-.847a4 4 0 00-3.5 2.758.312.312 0 01-.594 0 4.7 4.7 0 01-.23-1.432 4.643 4.643 0 014.322-4.624v-.712a.309.309 0 01.193-.289.313.313 0 01.341.064l2.431 2.434a.305.305 0 01.094.219.312.312 0 01-.094.222zm-.366 7.954a.313.313 0 000-.625H8.525a.313.313 0 100 .625z"
          transform="translate(-2.547 -2.547)"
        />
      </G>
    </Svg>
  );
}

export default ScreenShare;
