import { create } from "zustand";
import { devtools,persist } from "zustand/middleware";


interface User {
  username: string;
  email: string;
  id: number;
}

interface States {
  user: User | null;
}

interface Actions {
  loginUser: (userData: User) => void;
  logoutUser: () => void;
}

const userStore = create<States & Actions>()(
  devtools(
    persist((set) => ({
      user: null,
      loginUser: (userData: User) =>
        set(() => ({ user: userData})),
      logoutUser: () => set({ user: null })
    }), {
      name:'User'
    })
  )
);

export default userStore;
