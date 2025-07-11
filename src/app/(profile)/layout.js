"use client";
import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import { SessionProvider } from "next-auth/react";

// Dynamically import ToastContainer (disables SSR)
// const ToastContainer = dynamic(
//   () => import("react-toastify").then((c) => c.ToastContainer),
//   {
//     ssr: false,
//   }
// );

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <NavBar />
          {children}
          {/* <ToastContainer /> */}
        </SessionProvider>
      </body>
    </html>
  );
}
