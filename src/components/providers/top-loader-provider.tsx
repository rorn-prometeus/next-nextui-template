"use client";

import { colors } from "@/config/color";
import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import React, { PropsWithChildren, useEffect, useState } from "react";

const TopLoaderProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  const [color, setColor] = useState(colors.default);

  useEffect(() => {
    if (theme === "purple") {
      setColor(colors.purple);
    } else setColor(colors.default);
  }, [theme]);

  return (
    <>
      <NextTopLoader showSpinner={false} color={color} />
      {children}
    </>
  );
};

export default TopLoaderProvider;
