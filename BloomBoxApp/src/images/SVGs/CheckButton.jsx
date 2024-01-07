import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CheckButtonSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <Path
            fill="#20201D"
            d="M30 5H10a5 5 0 0 0-5 5v20a5 5 0 0 0 5 5h20a5 5 0 0 0 5-5V10a5 5 0 0 0-5-5Zm-2.833 11.017-7.617 10a1.667 1.667 0 0 1-2.048.485 1.667 1.667 0 0 1-.585-.469L12.85 20.85a1.668 1.668 0 0 1 2.633-2.05l2.717 3.467 6.3-8.334a1.676 1.676 0 0 1 2.667 2.034v.05Z"
        />
    </Svg>
)
export default CheckButtonSvg
