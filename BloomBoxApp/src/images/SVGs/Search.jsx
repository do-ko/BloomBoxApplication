import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SearchSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={33}
        height={33}
        fill="none"
        {...props}
    >
        <Path
            fill="#231F20"
            d="m28.199 26.265-4.63-4.616a10.784 10.784 0 0 0 2.301-6.671A10.893 10.893 0 1 0 14.978 25.87c2.419.003 4.769-.807 6.671-2.3l4.616 4.629a1.36 1.36 0 0 0 1.934 0 1.36 1.36 0 0 0 0-1.934ZM6.808 14.978a8.17 8.17 0 1 1 16.34 0 8.17 8.17 0 0 1-16.34 0Z"
        />
    </Svg>
)
export default SearchSvg
