import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      user: null,

      setAuth: (data) =>
        set({
          accessToken: data.accessToken,
          user: data.user,
        }),

      logout: () =>
        set({
          accessToken: null,
          user: null,
        }),
    }),
    {
      name: "auth-storage", // stored in localStorage (acceptable fallback)
    }
  )
);
