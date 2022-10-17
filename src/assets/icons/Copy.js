import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Copy(props) {
  return (
    <Svg width={19} height={19} viewBox="0 0 12 14" {...props}>
      <Path
        d="M8.842 0H1.263A1.272 1.272 0 000 1.273v8.909h1.263V1.273h7.579zm1.895 2.545H3.789a1.272 1.272 0 00-1.263 1.273v8.909A1.272 1.272 0 003.789 14h6.947a1.272 1.272 0 001.263-1.273V3.818a1.272 1.272 0 00-1.262-1.273zm0 10.182H3.789V3.818h6.947z"
        transform="translate(-38.25) translate(38.25)"
        fill={props.fill}
      />
    </Svg>
  );
}

export default Copy;
