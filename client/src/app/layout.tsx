
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import toast, { Toaster } from 'react-hot-toast';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import moduleName from 'module';
import { ReactQueryProvider } from "./components/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
        <GoogleOAuthProvider clientId="896957356055-blqkf98eu37v3sjvg32nnt16q0uttrsf.apps.googleusercontent.com">
          {children}
          <Toaster/>
          <ReactQueryDevtools/>
        </GoogleOAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
