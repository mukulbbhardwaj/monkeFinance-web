import { create } from "zustand";

interface Portfolio {
  id: number;
  username: string;
  email: string;
}

interface StoreState {
  portfolio: Portfolio
  
}


export default useStore;
