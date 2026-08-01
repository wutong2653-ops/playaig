import type { SVGProps } from "react";

export type IconName = "arrowRight" | "chevronLeft" | "chevronRight" | "close" | "menu" | "moon" | "search" | "spinner" | "sun";

const paths: Record<IconName, string> = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  chevronLeft: "m15 18-6-6 6-6",
  chevronRight: "m9 18 6-6-6-6",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  moon: "M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z",
  search: "m21 21-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z",
  spinner: "M12 3a9 9 0 1 0 9 9",
  sun: "M12 3v2m0 14v2m9-7h-2M5 12H3m15.36 6.36-1.42-1.42M7.05 7.05 5.64 5.64m12.72 0-1.42 1.41M7.05 16.95l-1.41 1.41M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d={paths[name]} /></svg>;
}
