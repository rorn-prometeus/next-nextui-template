"use client";

import { sidebarAtom } from "@/jotai/sidebar";
import { useAtom } from "jotai";
import React from "react";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import BaseSidebarMenu from "./base-sidebar-menu";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useAtom(sidebarAtom);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className=""
        duration={300}
        overlayOpacity={0.6}
      >
        <BaseSidebarMenu />
      </Drawer>
    </>
  );
};

export default MobileSidebar;
