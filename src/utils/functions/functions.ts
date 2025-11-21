import {
  TextStatuses,
  TextStatusesList,
} from "../../components/StatusText/StatusText";
import { LastJourneyEvent } from "../../store/types/fleet";
import { MacroHistoryItem } from "../../store/types/macroState";
import { StoreState } from "../../store/useStore";
import { produce } from "immer";

export function removeEmptyProperties(obj: any) {
  const filteredParams = Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== "")
  );
  return filteredParams;
}

export function filterObject(
  obj: Record<string, any>,
  allowedProps: string[]
): Record<string, any> {
  const filteredObject: Record<string, any> = {};

  for (const prop of allowedProps) {
    filteredObject[prop] = obj[prop] || "";
  }

  return filteredObject;
}

export const getNestedValue = (obj: any, keyPath: string) => {
  const keys = keyPath.split(".");
  return keys.reduce((acc, key) => (acc && acc[key] ? acc[key] : null), obj);
};

export const searchInItem = (item: any, value: string): boolean => {
  const avoidColumns = ["_id", "type", "last_process"];
  if (typeof item === "string") {
    return item.toLowerCase().includes(value.toLowerCase());
  } else if (typeof item === "object" && item !== null) {
    return Object.entries(item).some(([key, nestedValue]) => {
      if (avoidColumns.includes(key)) return false;
      return searchInItem(nestedValue, value);
    });
  }
  return false;
};

export const arrayUnique = (value: any, index: number, array: any[]) => {
  return array.indexOf(value) === index;
}

export const setLoadingState = <T extends keyof StoreState>(
  stateToChange: T,
  key: keyof StoreState[T],
  value: boolean
) => {
  return produce((state) => {
    state[stateToChange][key] = value;
  });
};

export const getJourneyTimeStatus = (
  lastJourneyEvent?: LastJourneyEvent
): TextStatusesList => {
  if (!lastJourneyEvent) return TextStatuses.default;

  const now = new Date();
  const startedDate = new Date(lastJourneyEvent.started_at);

  const timeDifferenceInSeconds =
    (now.getTime() - startedDate.getTime()) / 1000;

  const eightyPercentOfMaxDuration = 0.8 * lastJourneyEvent.max_duration;
  if (timeDifferenceInSeconds > lastJourneyEvent.max_duration) {
    return TextStatuses.danger;
  } else if (timeDifferenceInSeconds > eightyPercentOfMaxDuration) {
    return TextStatuses.warning;
  } else {
    return TextStatuses.success;
  }
};

export const calcDuration = (
  started_at: string | null | undefined,
  ended_at: string | null | undefined
) => {
  if (!started_at || !ended_at) return -1;
  return (new Date(ended_at).getTime() - new Date(started_at).getTime()) / 1000;
};

export function secondsToHHMMSS(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function convertToJourneyControlTime(totalSeconds: number): string {
  const date = new Date();
  date.setSeconds(date.getSeconds() - totalSeconds);
  return date.toISOString();
}

export const sortMacroHistoryByCreatedAt = (
  a: MacroHistoryItem,
  b: MacroHistoryItem
) =>
  (b?.created_at == null ? 0 : new Date(b.created_at).getTime()) -
  (a?.created_at == null ? 0 : new Date(a.created_at as any).getTime());

export const isValidPosition = (position?: {
  lat: number | undefined | null;
  lng: number | undefined | null;
}): boolean => !!(position?.lat && position?.lng && !isNaN(position.lat) && !isNaN(position.lng));

export const extraHoursStatusParam = (companyId: string): [string, string, string] => {
  if(companyId === "66c4ecea8c26fda1f5f2b185") {
    return ["07:20", "11:20", "+11:20"];
  }

  return ["-01:00", "-00:30", "00:00"];
} 