import { create } from "zustand";
import { createAuthSlice } from "./modules/auth";
import { createModalSlice } from "./modules/modal";

import { AuthState } from "./types/auth";
import { ModalState } from "./types/modal";

export type StoreState = AuthState & ModalState;

export const useStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createModalSlice(...a)
}));
