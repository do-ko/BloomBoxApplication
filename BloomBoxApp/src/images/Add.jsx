import * as React from "react"
import Svg, { Path } from "react-native-svg"
const AddSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={25}
        fill="none"
        {...props}
    >
        <Path
            fill="#20201D"
            d="M22.411 9.587h-7.695V1.892a1.71 1.71 0 0 0-1.71-1.71h-1.71a1.71 1.71 0 0 0-1.71 1.71v7.695H1.893a1.71 1.71 0 0 0-1.71 1.71v1.71c0 .944.766 1.71 1.71 1.71h7.695v7.694c0 .945.765 1.71 1.71 1.71h1.71a1.71 1.71 0 0 0 1.71-1.71v-7.695h7.694a1.71 1.71 0 0 0 1.71-1.71v-1.71a1.71 1.71 0 0 0-1.71-1.71Z"
        />
    </Svg>
)
export default AddSvg
