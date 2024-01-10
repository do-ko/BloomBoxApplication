import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
import {Dimensions} from "react-native";
const ReverseGradientSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={Dimensions.get('window').width}
        height={392}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 360 392"
        {...props}
    >
        <Path fill="url(#a)" d="M0 0h360v392H0z" />
        <Defs>
            <LinearGradient
                id="a"
                x1={180}
                x2={180}
                y1={0}
                y2={392}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#DFDFD9" />
                <Stop offset={1} stopColor="#DFDFD9" stopOpacity={0} />
            </LinearGradient>
        </Defs>
    </Svg>
)
export default ReverseGradientSvg
