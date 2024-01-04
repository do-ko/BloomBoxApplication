import * as React from "react"
import Svg, { Path } from "react-native-svg"
const LocationSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={47}
        fill="none"
        {...props}
    >
        <Path
            fill="#20201D"
            d="M39.437 15.099C37.07 4.687 27.989 0 20.01 0h-.022C12.034 0 2.929 4.665.563 15.076c-2.636 11.628 4.485 21.476 10.93 27.673a12.25 12.25 0 0 0 8.518 3.448c3.065 0 6.13-1.15 8.496-3.448 6.445-6.197 13.566-16.022 10.93-27.65ZM20.01 26.389a7.098 7.098 0 0 1-7.098-7.099 7.098 7.098 0 0 1 7.098-7.098 7.098 7.098 0 0 1 7.099 7.098 7.098 7.098 0 0 1-7.099 7.099Z"
        />
    </Svg>
)
export default LocationSvg
