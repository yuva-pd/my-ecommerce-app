"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { store } from "./store/redux/store";

import { Provider, useDispatch } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { login, logout } from "./store/redux/slices/authSlice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
            <AuthWatcher />
            {/* <AuthProvider> */} {/* ✅ Wrap app with SessionProvider */}
            {children}
            {/* </AuthProvider> */}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
// "use client";
// import { SessionProvider, useSession } from "next-auth/react";
// import { Provider } from "react-redux";
// import { useEffect } from "react";
// import { store } from "../store/redux/store";
// import { useDispatch } from "react-redux";
// import { login, logout } from "../store/redux/slices/authSlice";

// export default function AppProviders({ children }: { children: React.ReactNode }) {
//   return (
//     <SessionProvider>
//       <Provider store={store}>
//         <AuthWatcher />
//         {children}
//       </Provider>
//     </SessionProvider>
//   );
// }

function AuthWatcher() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "loading") return;
    if (session?.accessToken) {
      dispatch(login({ accessToken: session.accessToken, user: session.user }));
    } else {
      dispatch(logout());
    }
  }, [session, dispatch, status]);

  return null;
}
