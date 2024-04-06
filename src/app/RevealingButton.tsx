"use client";

import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { invoke } from "@tauri-apps/api/tauri";
import { useCallback, useMemo } from "react";

export function RevealingButton({ path }: { path: string }) {
  const mappedPath = useMemo(() => {
    return path.replace(/^\/volume1\//, "/Volumes/");
  }, [path]);
  const reveal = useCallback(async () => {
    await invoke("reveal", { path: mappedPath });
  }, [mappedPath]);

  return (
    <button
      onClick={reveal}
      style={{ border: "none", outline: "none", background: "transparent", padding: 8 }}
    >
      <FontAwesomeIcon icon={faFolderOpen} size="2x" />
    </button>
  );
}
