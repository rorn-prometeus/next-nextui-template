import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/side-bar";
import React, { PropsWithChildren } from "react";

const PanelLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Navbar session={session} />
        <div className={`p-4 `}>{children}</div>
      </div>
    </div>
  );
};

export default PanelLayout;
