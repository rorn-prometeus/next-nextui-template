"use client";

import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Session } from "next-auth";
import { onSignout } from "@/app/lib/actions/auth";

type Props = {
  session: Session;
};

const NavbarUserDropdown = ({ session }: Props) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          color="primary"
          isBordered
          as="button"
          className="transition-transform"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2" textValue="Profile">
          <p className="font-semibold text-default-500">
            Signed in as {session.user?.name}
          </p>
          <p className="font-semibold text-default-500">
            {session.user?.email}
          </p>
        </DropdownItem>
        <DropdownItem className="py-2 text-default-500" key="settings">
          My Settings
        </DropdownItem>
        <DropdownItem className="py-2 text-default-500" key="configurations">
          Configurations
        </DropdownItem>
        <DropdownItem className="py-2 text-default-500" key="help_and_feedback">
          Help & Feedback
        </DropdownItem>
        <DropdownItem
          className="py-2 text-default-500"
          key="logout"
          color="danger"
          onPress={() => onSignout()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarUserDropdown;
