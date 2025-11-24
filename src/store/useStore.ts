import { create } from "zustand";
import { createAuthSlice } from "./modules/auth";
import { createModalSlice } from "./modules/modal";
import { createAdminSlice } from "./modules/admin";
import { createServerSlice } from "./modules/server";
import { createPlayerSlice } from "./modules/player";

import { AuthState } from "./types/auth";
import { ModalState } from "./types/modal";
import { AdminState } from "./types/admin";
import { ServerState } from "./types/server";
import { PlayerState } from "./types/player";


export type StoreState = AuthState & ModalState & AdminState & ServerState & PlayerState;

export const useStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createModalSlice(...a),
  ...createAdminSlice(...a),
  ...createServerSlice(...a),
  ...createPlayerSlice(...a)
}));
