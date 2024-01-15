import * as React from "react"
import Svg, { Path } from "react-native-svg"
const EmptyBoxSvg = ({props, color}) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <Path
            fill={color}
            d="M 30 5 H 10 a 5 5 0 0 0 -5 5 v 20 a 5 5 0 0 0 5 5 h 20 a 5 5 0 0 0 5 -5 V 10 a 5 5 0 0 0 -5 -5 Z Z H -4 M 30 8 C 31 8 32 9 32 10 V 30 C 32 31 31 32 30 32 H 10 C 9 32 8 31 8 30 V 10 C 8 9 9 8 10 8 H 30"
        />
    </Svg>
)
export default EmptyBoxSvg
