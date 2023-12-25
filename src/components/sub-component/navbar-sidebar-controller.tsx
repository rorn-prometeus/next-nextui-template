"use client";

import { sidebarAtom } from "@/jotai/sidebar";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import React from "react";

type Props = {};

const NavbarSidabarController = (props: Props) => {
  const [sidebar, setSidebar] = useAtom(sidebarAtom);
  return (
    <ChevronLeftIcon
      className={`rotate-180 w-10 h-10 p-2 rounded-full border border-dashed text-primary-300 border-primary-300 cursor-pointer active:scale-95 ${
        sidebar && "!rotate-0"
      }`}
      onClick={() => setSidebar(!sidebar)}
    />
  );
};

export default NavbarSidabarController;
