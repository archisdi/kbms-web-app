import React from "react";
import * as Icon from "react-feather";

const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: [],
    navLink: "/",
  },
  {
    id: "member",
    title: "Members",
    type: "item",
    icon: <Icon.Users size={20} />,
    permissions: [],
    navLink: "/members",
  },
  {
    id: "calendar",
    title: "Calendar",
    type: "item",
    icon: <Icon.Calendar size={20} />,
    permissions: [],
    navLink: "/calendar",
  },
];

export default navigationConfig;
