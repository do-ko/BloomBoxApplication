import * as React from "react"
import Svg, { Path } from "react-native-svg"
const WhiteEditSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={27}
        height={27}
        fill="none"
        {...props}
    >
        <Path
            fill="#F4F7F8"
            d="m20.25 0-3.375 3.375 6.75 6.75L27 6.75 20.25 0ZM13.5 6.75 0 20.25V27h6.75l13.5-13.5-6.75-6.75Z"
        />
    </Svg>
)
export default WhiteEditSvg
