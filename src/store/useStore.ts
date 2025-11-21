import { create } from "zustand";
import { createAuthSlice } from "./modules/auth";
import { createModalSlice } from "./modules/modal";
import { createAdminSlice } from "./modules/admin";

import { AuthState } from "./types/auth";
import { ModalState } from "./types/modal";
import { AdminState } from "./types/admin";

export type StoreState = AuthState & ModalState & AdminState;

export const useStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createModalSlice(...a),
  ...createAdminSlice(...a)
}));
