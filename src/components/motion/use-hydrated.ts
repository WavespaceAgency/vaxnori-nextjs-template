"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** false during server render and the first client render, true after hydration. */
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
