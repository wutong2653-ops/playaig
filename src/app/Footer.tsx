import { type ReactNode } from "react";
import { getOfficialSteamSource } from "../data";

const exploreLinks = [
  { label: "Home", path: "/" },
  { label: "Guides", path: "/guides/" },
  { label: "Classes", path: "/classes/" },
  { label: "Builds", path: "/builds/" },
  { label: "Bosses", path: "/database/bosses/" }
];

const databaseLinks = [
  { label: "Skills", path: "/database/skills/" },
  { label: "Equipment", path: "/database/equipment/" },
  { label: "Cards", path: "/database/cards/" },
  { label: "Artifacts", path: "/database/artifacts/" },
  { label: "Monsters", path: "/database/monsters/" },
  { label: "Maps", path: "/database/maps/" }
];

const resourceLinks = [
  { label: "Search", path: "/search/" },
  { label: "About", path: "/about/" },
  { label: "Contact", path: "/contact/" }
];

export function Footer() {
  const steamSource = getOfficialSteamSource();
  return (
    <footer className="site-footer">
      <div className="sv-container site-footer__grid">
        <FooterColumn links={exploreLinks} title="Explore" />
        <FooterColumn links={databaseLinks} title="Database" />
        <FooterColumn links={resourceLinks} title="Resources">
          {steamSource ? <a href={steamSource.url} rel="noopener noreferrer" target="_blank">Official Steam</a> : null}
        </FooterColumn>
        <FooterColumn title="Legal">
          <a href="/privacy/">Privacy Policy</a>
          <a href="/disclaimer/">Disclaimer</a>
        </FooterColumn>
      </div>
      <div className="sv-container site-footer__disclaimer">
        SpiritVale and related game assets are trademarks and copyrighted materials of Baikun Interactive. This independent fan site is not affiliated with or endorsed by Baikun Interactive.
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  children?: ReactNode;
  links?: { label: string; path: string }[];
  title: string;
};

function FooterColumn({ children, links = [], title }: FooterColumnProps) {
  return (
    <section className="site-footer__column">
      <h2>{title}</h2>
      {links.map((link) => <a href={link.path} key={link.path}>{link.label}</a>)}
      {children}
    </section>
  );
}
