import React from "react"
import * as Icon from "react-feather"

const horizontalMenuConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: [],
    navLink: "/"
  },
  {
    id: "member",
    title: "Members",
    type: "item",
    icon: <Icon.Users size={20} />,
    permissions: [],
    navLink: "/members"
  }
]

export default horizontalMenuConfig
