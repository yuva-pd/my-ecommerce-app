"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { store } from "./store/redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import AuthWatcher from "./AuthWatcher"; // Separate AuthWatcher for clarity
import React from "react";

// Custom fonts from Google
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Root layout component wrapping your application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          <Provider store={store}>
            <AuthWatcher /> {/* Watch for authentication status */}
            {children}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
