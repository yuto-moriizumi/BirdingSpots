import { Tag } from "emblor";
import { useSyncExternalStore } from "react";

export const KEY = "tags";

export function useStoredTags() {
  const tags = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(KEY) ?? "[]",
    () => "[]"
  );
  return { tags: JSON.parse(tags) as Tag[], setTags };
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
}

function setTags(tags: Tag[]) {
  localStorage.setItem(KEY, JSON.stringify(tags));
  window.dispatchEvent(new Event("storage"));
}
