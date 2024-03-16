"use client";

import { invoke } from "@tauri-apps/api/tauri";
import { useCallback, useMemo } from "react";

export function RevealingButton({ path }: { path: string }) {
  const mappedPath = useMemo(() => {
    return path.replace(/^\/volume1\//, "/Volumes/");
  }, [path]);
  const reveal = useCallback(async () => {
    await invoke("reveal", { path: mappedPath });
  }, [mappedPath]);

  return <button onClick={reveal}>Reveal</button>;
}
