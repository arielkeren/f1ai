import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "F1AI",
  description: "Get the best strategy for racing using AI",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => (
  <html lang="en">
    <body className="bg-[#0f0f0f] font-icommon">{children}</body>
  </html>
);

export default RootLayout;
