import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Chat(props) {
  return (
    <Svg width={18} height={18} viewBox="0 0 16 16" {...props}>
      <Path
        d="M13.6 0H2.4A2.357 2.357 0 000 2.4v8a2.357 2.357 0 002.4 2.4h9.28l2.96 2.96a.773.773 0 001.12 0 .726.726 0 00.24-.56V2.4A2.357 2.357 0 0013.6 0zM4 8.8a.8.8 0 010-1.6.8.8 0 110 1.6zm0-3.2a.756.756 0 01-.8-.8A.756.756 0 014 4a.756.756 0 01.8.8.756.756 0 01-.8.8zm8 3.2H7.2a.8.8 0 110-1.6H12a.8.8 0 110 1.6zm0-3.2H7.2a.756.756 0 01-.8-.8.756.756 0 01.8-.8H12a.756.756 0 01.8.8.756.756 0 01-.8.8z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default Chat;
