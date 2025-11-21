export enum AdminPermissions {
  "READ_COMPANY",
  "CREATE_COMPANY",
  "UPDATE_COMPANY",
  "DELETE_COMPANY",
  "CREATE_HOLIDAY",
  "READ_HOLIDAY",
  "UPDATE_HOLIDAY",
  "DELETE_HOLIDAY",
  "LIST_HOLIDAYS",
  "CREATE_SECTION",
  "READ_SECTION",
  "UPDATE_SECTION",
  "DELETE_SECTION",
  "LIST_SECTIONS",
  "CREATE_SYNDICATE",
  "READ_SYNDICATE",
  "UPDATE_SYNDICATE",
  "DELETE_SYNDICATE",
  "LIST_SYNDICATES",
  "CREATE_USER",
  "LIST_COMPANIES",
  "SWITCH_COMPANY",
  "DELETE_USER",
  "LIST_USERS",
  "UPDATE_USER_PASSWORD",
  "UPDATE_USER_OWN_PASSWORD",
  "CREATE_VEHICLE",
  "READ_VEHICLE",
  "UPDATE_VEHICLE",
  "DELETE_VEHICLE",
  "LIST_VEHICLES",
  "UPDATE_VEHICLE_USER",
  "GET_JOURNEY_STATE",
  "LIST_JOURNEY_STATES",
  "READ_USER",
  "UPDATE_USER",
}

export type PositionType = "MANAGER" | "HR" | "DRIVER" | "MASTER" | "EMPLOYEE" | "";

export interface AdminData {
  _id: string;
  name: string;
  cpf: string;
  company: any | null;
  section?: {
    _id: string;
    name: string;
  };
  position: {
    type: PositionType;
    name: string;
  };
  projection: {
    user: string[];
  };
  pis: string | null;
  permissions: string[];
  iat: number | null;
  exp: number | null;
}

export interface AdminState {
  admin: {
    data: AdminData;
    hasPermissions: (permissionsToCheck: string[]) => boolean;
    hasAnyPermissions: (permissionsToCheck: string[]) => boolean;
    isMaster: () => boolean;
  };
}
