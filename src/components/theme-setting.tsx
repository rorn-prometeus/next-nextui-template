"use client";

import {
  ArrowPathIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React, { useMemo, useState } from "react";

const ThemeSetting = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { theme, setTheme } = useTheme();

  const lightIcon = useMemo(
    () => <SunIcon className="w-8 h-8 text-default-500" />,
    []
  );
  const darkIcon = useMemo(
    () => <MoonIcon className="w-6 h-6 text-default-500" />,
    []
  );

  const themes = [
    {
      name: "Defualt",
      color: "text-blue-500",
      themes: [
        {
          theme: "light",
          icon: lightIcon,
        },
        {
          theme: "dark",
          icon: darkIcon,
        },
      ],
    },
    {
      name: "Purple",
      color: "text-purple-500",
      themes: [
        {
          theme: "purple",
          icon: lightIcon,
        },
        // {
        //   theme: "purple-dark",
        //   icon: darkIcon,
        // },
      ],
    },
  ];

  return (
    <>
      <Button isIconOnly variant="light" onClick={toggleDrawer}>
        <Cog6ToothIcon
          className={`w-6 h-6 text-primary ${isOpen && "animate-spin"}`}
        />
      </Button>

      <Card
        className={`w-72 h-screen fixed top-0 right-0 z-50 transition-all p-5 !rounded-none ${
          !isOpen && "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Settings</h1>
          <Button isIconOnly variant="flat" onPress={() => setTheme("light")}>
            <ArrowPathIcon className="w-6 h-6 text-primary-500" />
          </Button>
        </div>

        {/* theme */}
        <section>
          <h1
            className={"uppercase font-semibold text-sm text-default-400 mt-5"}
          >
            Theme
          </h1>

          {themes.map((item) => (
            <div className="mt-2" key={item.name}>
              <p className={`text-sm  font-bold ${item.color}`}>{item.name}</p>
              <div className="grid grid-cols-2 gap-5 mt-2">
                {theme &&
                  item.themes.map((_theme) => (
                    <Button
                      key={_theme.theme}
                      onPress={() => setTheme(_theme.theme)}
                      variant="light"
                      className={`border border-default-200 shadow-md h-24 flex justify-center items-center cursor-pointer ${
                        theme === _theme.theme && "border-primary-500"
                      }`}
                    >
                      {_theme.icon}
                    </Button>
                  ))}
              </div>
            </div>
          ))}
        </section>
      </Card>
    </>
  );
};

export default ThemeSetting;
