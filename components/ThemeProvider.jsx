"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="leaddesk-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}