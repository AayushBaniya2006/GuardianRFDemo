"use client";

import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#111118",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.06)",
            fontSize: "13px",
          },
        }}
      />
    </>
  );
}
