import * as React from "react"
import Svg, { Path } from "react-native-svg"
const NoDataSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            stroke="#DFDFD9"
            strokeWidth={1.5}
            d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
        />
        <Path
            stroke="#DFDFD9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m8 12 2-1.5L8 9M16 12l-2-1.5L16 9M16 16l-1.333-1-1.334 1L12 15l-1.333 1-1.334-1L8 16"
        />
    </Svg>
)
export default NoDataSvg
