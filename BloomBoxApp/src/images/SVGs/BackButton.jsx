import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BackSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={19}
        height={29}
        fill="none"
        {...props}
    >
        <Path
            fill="#20201D"
            stroke="#20201D"
            d="M1.081 13.097a1.984 1.984 0 0 0 0 2.806l12.016 12.016.353-.354-.353.354a1.984 1.984 0 0 0 2.806 0l1.401-1.402a1.983 1.983 0 0 0 .004-2.802L8.135 14.5l9.172-9.215a1.984 1.984 0 0 0-.003-2.802L15.903 1.08a1.984 1.984 0 0 0-2.806 0L1.082 13.097Z"
        />
    </Svg>
)
export default BackSvg
