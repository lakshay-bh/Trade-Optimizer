import React from 'react'
import Loader from "react-js-loader";

function Loading() {
  return (
    <div className={"item"}>
    <Loader type="bubble-spin" bgColor={"#FFFFFF"} title={"Please wait"} color={'#FFFFFF'} size={100} />
</div>
  )
}

export default Loading