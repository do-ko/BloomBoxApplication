import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CheckButtonSvg = ({props, color}) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <Path
            fill={color}
            d="M 30 5 H 10 a 5 5 0 0 0 -5 5 v 20 a 5 5 0 0 0 5 5 h 20 a 5 5 0 0 0 5 -5 V 10 a 5 5 0 0 0 -5 -5 Z Z M 30 8 C 31 8 32 9 32 10 V 30 C 32 31 31 32 30 32 H 10 C 9 32 8 31 8 30 V 10 C 8 9 9 8 10 8 H 30 M 18.05 21.565 L 16 19 A 1 1 0 0 0 13 21 L 17 26 L 17.668 26.806 C 18.202 27.344 19.094 27.749 19.92 26.95 L 26.893 17.998 A 1 1 0 0 0 23.959 16.042 L 19.791 21.174 C 19.316 21.739 18.707 22.278 18.05 21.565 Z"
        />
    </Svg>
)
export default CheckButtonSvg
