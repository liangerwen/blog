import { Fira_Code, Space_Mono, Titillium_Web } from "next/font/google";

export const fira_code = Fira_Code({
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "greek-ext",
    "latin",
    "latin-ext",
  ],
});
export const titillium_web = Titillium_Web({
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

export const space_mono = Space_Mono({
  weight: "400",
  subsets: ["latin", "latin-ext", "vietnamese"],
});
