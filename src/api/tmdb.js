import { fetchJson } from "./client";

export function getTrending({
  page = 1,
  mediaType = "all",
  timeWindow = "week",
} = {}) {
  return fetchJson(`/trending/${mediaType}/${timeWindow}`, { page });
}
