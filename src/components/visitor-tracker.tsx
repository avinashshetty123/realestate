"use client";
import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    if (sessionStorage.getItem("visited")) return;
    sessionStorage.setItem("visited", "1");
    fetch("/api/visitors", { method: "POST" }).catch(() => {});
  }, []);
  return null;
}
