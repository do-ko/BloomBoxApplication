import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DropletFilledSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={35}
        height={35}
        fill="none"
        {...props}
    >
        <Path
            fill="#20201D"
            d="M17.114 29.738a10.665 10.665 0 0 1-4.094-.854 10.558 10.558 0 0 1-3.437-2.36 10.825 10.825 0 0 1-3.045-7.618 10.83 10.83 0 0 1 3.187-7.561l6.62-6.554a1.34 1.34 0 0 1 1.012-.423 1.442 1.442 0 0 1 1.013.437l6.504 6.653a10.825 10.825 0 0 1 3.052 7.615 10.83 10.83 0 0 1-3.18 7.564 10.466 10.466 0 0 1-3.493 2.326c-1.312.533-2.72.797-4.139.775Z"
        />
    </Svg>
)
export default DropletFilledSvg
