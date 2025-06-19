import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        icommon: ["Icommon", "arial"],
      },
      backgroundColor: {
        primary: "#E10600",
      },
    },
  },
  plugins: [],
};
export default config;
