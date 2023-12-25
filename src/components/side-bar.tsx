"use client";

import React from "react";
import { useAtomValue } from "jotai";
import { sidebarAtom } from "@/jotai/sidebar";
import MobileSidebar from "./sub-component/mobile-sidebar";
import BaseSidebarMenu from "./sub-component/base-sidebar-menu";

type Props = {};

const Sidebar = (props: Props) => {
  const sidebar = useAtomValue(sidebarAtom);

  return (
    <>
      <div className={`hidden lg:block`}>{sidebar && <BaseSidebarMenu />}</div>
      <div className="lg:hidden">{<MobileSidebar />}</div>
    </>
  );
};

export default Sidebar;
