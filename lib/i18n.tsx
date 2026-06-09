"use client";

import { createContext, useContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Messages = Record<string, any>;

const I18nContext = createContext<{ messages: Messages; locale: string }>({
  messages: {},
  locale: "en",
});

export function I18nProvider({
  messages,
  locale,
  children,
}: {
  messages: Messages;
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ messages, locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLocale(): string {
  return useContext(I18nContext).locale;
}

export function useTranslations(ns: string) {
  const { messages } = useContext(I18nContext);
  const section = messages[ns] ?? {};
  return (key: string): string => section[key] ?? `${ns}.${key}`;
}
