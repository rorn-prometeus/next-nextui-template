"use client";

import React from "react";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "../sub-component/base-sidebar-menu";

export default function AccordionMenu({ item }: { item: MenuItem }) {
  const pathname = usePathname();

  return (
    <Accordion
      itemClasses={{
        trigger: `!w-full data-[hover=true]:bg-default-100 px-4 py-3 rounded-xl ${
          pathname.includes(item.url) ? "!bg-primary-50" : ""
        }`,
        base: " !w-full py-0 mt-1",
        title: `text-sm font-medium text-default-500 ${
          pathname.includes(item.url) ? "text-primary" : ""
        }`,
        content: "-mt-2",
        indicator: "-rotate-180",
      }}
    >
      <AccordionItem
        aria-label={item.label}
        startContent={item.icon}
        title={item.label}
      >
        {item.children.map((child, index) => (
          <MenuChildren key={index} menu={child} />
        ))}
      </AccordionItem>
    </Accordion>
  );
}

function MenuChildren({ menu }: { menu: MenuItem }) {
  const pathname = usePathname();

  return (
    <Link
      href={menu.url}
      className="mt-1 flex items-center gap-4 py-3 xl:hover:bg-default-100 pl-8 rounded-lg"
    >
      <div
        className={`bg-default-500 w-2 h-2 rounded-full ${
          pathname === menu.url ? "bg-primary" : ""
        }`}
      ></div>
      <p
        className={`text-sm font-medium text-default-500 ${
          pathname === menu.url ? "text-primary" : ""
        }`}
      >
        {menu.label}
      </p>
    </Link>
  );
}
