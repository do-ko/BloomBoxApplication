import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
import {Dimensions} from "react-native";
const GradientSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={360}
        height={602}
        fill="none"
        {...props}
    >
        <Path fill="url(#a)" d="M0 0h360v621H0z" />
        <Defs>
            <LinearGradient
                id="a"
                x1={180}
                x2={180}
                y1={0}
                y2={621}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#DFDFD9" stopOpacity={0} />
                <Stop offset={1} stopColor="#DFDFD9" />
            </LinearGradient>
        </Defs>
    </Svg>
)
export default GradientSvg
