"use client";

import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

export default function Greeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const greet = async () => {
      const response = await invoke<string>("greet", { name: "tauri" });
      setGreeting(response);
    };
    greet();
  });

  return <div>{greeting}</div>;
}
