import * as React from "react"
import Svg, { Path } from "react-native-svg"
const FailedSvg = ({props, color}) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <Path
            fill={color}
            d="M 30 5 H 10 a 5 5 0 0 0 -5 5 v 20 a 5 5 0 0 0 5 5 h 20 a 5 5 0 0 0 5 -5 V 10 a 5 5 0 0 0 -5 -5 Z Z M 30 8 C 31 8 32 9 32 10 V 30 C 32 31 31 32 30 32 H 10 C 9 32 8 31 8 30 V 10 C 8 9 9 8 10 8 H 30 M 25 12 A 1 1 0 0 1 28 15 L 23 20 L 28 25 A 1 1 0 0 1 25 28 L 20 23 L 15 28 A 1 1 0 0 1 12 25 L 17 20 L 12 15 A 1 1 0 0 1 15 12 L 20 17 Z"
        />
    </Svg>
)
export default FailedSvg
