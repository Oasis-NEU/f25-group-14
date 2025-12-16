import { create } from "zustand";

export const useGlobalStore = create((set) => ({
  globalValue: false,

  setGlobalValue: (newValue) => set({ globalValue: newValue }),
}));

/*
import { useGlobalStore } from "../store";

export default function Page2() {
  const globalValue = useGlobalStore((state) => state.globalValue);

  return <h1>The value is: {globalValue}</h1>;
}

to read in the global value
*/