import React, { PropsWithChildren } from "react";
import { UIProvider } from "./next-ui-provider";
import JotaiProvider from "./jotai-provider";
import TopLoaderProvider from "./top-loader-provider";

const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <UIProvider
      themeProps={{
        attribute: "class",
        defaultTheme: "light",
        themes: ["light", "dark", "purple-dark", "purple"],
      }}
    >
      <TopLoaderProvider>
        <JotaiProvider>
          <main className="relative flex flex-col h-screen overflow-x-hidden">
            {children}
          </main>
        </JotaiProvider>
      </TopLoaderProvider>
    </UIProvider>
  );
};

export default RootProvider;
