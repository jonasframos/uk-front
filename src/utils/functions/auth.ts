export const getAuthToken = (): string | null =>
  localStorage.getItem("token")
    ? localStorage.getItem("token")
    : sessionStorage.getItem("token");
