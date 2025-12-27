import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  username: string;
  email: string;
  id: number;
}

interface States {
  user: User | null;
  token: string | null;
}

interface Actions {
  loginUser: (userData: User, token: string) => void;
  logoutUser: () => void;
}

const userStore = create<States & Actions>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        loginUser: (userData: User, token: string) => {
          localStorage.setItem("auth_token", token);
          set(() => ({ user: userData, token }));
        },
        logoutUser: () => {
          localStorage.removeItem("auth_token");
          set({ user: null, token: null });
        },
      }),
      {
        name: "User",
      }
    )
  )
);

export default userStore;
