import React from 'react';
import Svg, { Path } from "react-native-svg";

const LeftArrow = (props) => {
    return (
        <Svg width={props.width} height={props.width} fill="none" stroke={props.stroke} strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24">
            <Path d="M19 12H5M12 19l-7-7 7-7" />
        </Svg>
    );
}

export default LeftArrow;