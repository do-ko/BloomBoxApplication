import * as React from "react"
import Svg, { Path } from "react-native-svg"
const FailedSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            fill="#A9A9A7"
            fillRule="evenodd"
            d="M1.25 7.25a6 6 0 0 1 6-6h9.5a6 6 0 0 1 6 6v9.5a6 6 0 0 1-6 6h-9.5a6 6 0 0 1-6-6v-9.5Zm5.933-.067a.625.625 0 0 1 .884 0L12 11.117l3.934-3.934a.625.625 0 1 1 .883.884L12.883 12l3.934 3.934a.625.625 0 1 1-.883.883L12 12.883l-3.934 3.934a.625.625 0 1 1-.883-.883L11.117 12 7.183 8.067a.625.625 0 0 1 0-.884Z"
            clipRule="evenodd"
        />
    </Svg>
)
export default FailedSvg
