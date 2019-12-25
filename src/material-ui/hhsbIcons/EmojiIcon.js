import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { blue, red } from "@material-ui/core/colors"
import SvgIcon from "@material-ui/core/SvgIcon"
import Emoji from "../hhsbAssets/FollowingEmoji.svg"
export default function EmojiIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d={Emoji} />
    </SvgIcon>
  )
}
