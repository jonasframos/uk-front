import { StateCreator } from "zustand";
import { AdminState } from "../types/admin";

export const createAdminSlice: StateCreator<AdminState> = (set, get) => ({
  admin: {
    data: {
      _id: "",
      name: "",
      cpf: "",
      company: null,
      section: {
        _id: "",
        name: ""
      },
      position: {
        name: "",
        type: "",
      },
      projection: {
        user: [],
      },
      permissions: [],
      pis: "",
      iat: null,
      exp: null,
    },
    hasPermissions: (permissionsToCheck: string[]) => {
      return permissionsToCheck.every((permission: string) =>
        get().admin.data.permissions.includes(permission)
      );
    },
    hasAnyPermissions: (permissionsToCheck: string[]) => {
      return permissionsToCheck.some((permission: string) =>
        get().admin.data.permissions.includes(permission)
      );
    },
    isMaster: () => {
      return get().admin.data.position.type === "MASTER";
    },
  },
});
