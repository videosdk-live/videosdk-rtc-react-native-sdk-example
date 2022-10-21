import * as React from "react";
import Svg, { Defs, G, Circle } from "react-native-svg";

function More(props) {
  return (
    <Svg width={20} height={6} fill={"#FFF"} viewBox="0 0 16 4" {...props}>
      <Defs></Defs>
      <G transform="translate(-303 -610)">
        <Circle
          className="a"
          cx={2}
          cy={2}
          r={2}
          transform="translate(309 610)"
        />
        <Circle
          className="a"
          cx={2}
          cy={2}
          r={2}
          transform="translate(315 610)"
        />
        <Circle
          className="a"
          cx={2}
          cy={2}
          r={2}
          transform="translate(303 610)"
        />
      </G>
    </Svg>
  );
}

export default More;
