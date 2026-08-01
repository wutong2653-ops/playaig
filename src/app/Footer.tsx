import { type ReactNode } from "react";
import { getOfficialSteamSource } from "../data";

const exploreLinks = [
  { label: "Home", path: "/" },
  { label: "Guides", path: "/guides/" },
  { label: "Classes", path: "/classes/" },
  { label: "Database", path: "/database/" },
  { label: "Bosses", path: "/database/bosses/" }
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
        <section className="site-footer__brand">
          <p className="site-footer__brand-name">PlayAIG</p>
          <p className="site-footer__channel">SpiritVale Wiki</p>
          <p>Verified game information based on official sources.</p>
        </section>
        <FooterColumn links={exploreLinks} title="Explore" />
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
