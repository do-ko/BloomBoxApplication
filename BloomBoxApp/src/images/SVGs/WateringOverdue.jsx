import * as React from "react"
import Svg, { Path } from "react-native-svg"
const WateringOverdueSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={36}
        height={31}
        fill="none"
        {...props}
    >
        <Path
            fill="#FFFFFF"
            d="M29.7 6.246a4.467 4.467 0 0 0-1.044 4.824L23.4 16.326V12.6c0-.99-.81-1.8-1.8-1.8h-1.854c.054-.306.054-.594.054-.9 0-5.472-4.428-9.9-9.9-9.9A9.894 9.894 0 0 0 0 9.9a9.876 9.876 0 0 0 3.6 7.632V28.8c0 .99.81 1.8 1.8 1.8h16.2c.99 0 1.8-.81 1.8-1.8v-7.398l7.794-7.794c1.62.63 3.51.306 4.806-1.008l-6.3-6.354ZM3.69 10.8c-.036-.306-.09-.594-.09-.9 0-3.474 2.826-6.3 6.3-6.3 3.474 0 6.3 2.826 6.3 6.3 0 .306-.054.594-.09.9M19.8 27H7.2V14.4h12.6V27Z"
        />
    </Svg>
)
export default WateringOverdueSvg
