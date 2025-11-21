export function removeNumberMask (values: string): string {
  return values.replaceAll(/[^\d]/g, "");
};