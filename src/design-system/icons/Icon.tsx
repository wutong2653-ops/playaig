import type { SVGProps } from "react";

export type IconName = "arrowRight" | "chevronLeft" | "chevronRight" | "close" | "menu" | "search" | "spinner";

const paths: Record<IconName, string> = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  chevronLeft: "m15 18-6-6 6-6",
  chevronRight: "m9 18 6-6-6-6",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  search: "m21 21-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z",
  spinner: "M12 3a9 9 0 1 0 9 9"
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d={paths[name]} /></svg>;
}
