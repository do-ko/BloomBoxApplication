import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BigAddSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <Path
            fill="#20201D"
            d="M37.143 15.714H24.286V2.857A2.857 2.857 0 0 0 21.429 0H18.57a2.858 2.858 0 0 0-2.857 2.857v12.857H2.857A2.858 2.858 0 0 0 0 18.571v2.858a2.857 2.857 0 0 0 2.857 2.857h12.857v12.857A2.858 2.858 0 0 0 18.571 40h2.858a2.857 2.857 0 0 0 2.857-2.857V24.286h12.857A2.857 2.857 0 0 0 40 21.429V18.57a2.858 2.858 0 0 0-2.857-2.857Z"
        />
    </Svg>
)
export default BigAddSvg
