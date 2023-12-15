import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SaveSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        fill="none"
        {...props}
    >
        <Path
            fill="#20201D"
            d="M23.336 0H6.664C3 0 0 2.605 0 5.786v21.136c0 2.697 2.229 3.85 4.95 2.53l8.421-4.075c.9-.427 2.358-.427 3.236 0l8.422 4.075c2.742 1.302 4.971.167 4.971-2.53V5.786C30 2.605 27 0 23.336 0Z"
        />
    </Svg>
)
export default SaveSvg
