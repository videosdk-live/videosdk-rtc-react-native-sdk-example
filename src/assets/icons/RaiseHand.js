import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function RaiseHand(props) {
  return (
    <Svg  viewBox="0 0 15.576 22.656" {...props}>
      <Path
        d="M14.4 7.552a1.18 1.18 0 00-1.18 1.18v5.428h-.472a2.84 2.84 0 00-2.832 2.832h-.944a3.783 3.783 0 013.3-3.748V3.068a1.18 1.18 0 10-2.36 0v7.316h-.944V1.18a1.18 1.18 0 10-2.36 0v9.2h-.944V2.6a1.18 1.18 0 00-2.36 0v8.732H2.36v-5.9a1.18 1.18 0 10-2.36 0v9.44a7.788 7.788 0 0015.576 0v-6.14a1.18 1.18 0 00-1.176-1.18z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default RaiseHand;
