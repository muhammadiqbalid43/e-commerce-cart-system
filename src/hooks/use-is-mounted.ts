import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

export function useIsMounted() {
  // Mengembalikan 'false' di server, dan 'true' di klien
  return useSyncExternalStore(
    subscribe,
    () => true, // Nilai di Client
    () => false // Nilai di Server (Hydration)
  );
}
