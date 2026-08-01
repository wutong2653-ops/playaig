import { type FormEvent, useEffect, useRef, useState } from "react";
import { AssetImage } from "../data";
import { Icon, IconButton, SearchBar } from "../design-system";
import type { ThemeMode } from "../design-system";

const primaryNavigation = [
  { label: "Home", path: "/" },
  { label: "Guides", path: "/guides/" },
  { label: "Classes", path: "/classes/" },
  { label: "Builds", path: "/builds/" },
  { label: "Database", path: "/database/" },
  { label: "Bosses", path: "/database/bosses/" }
];

const databaseNavigation = [
  { label: "Skills", path: "/database/skills/" },
  { label: "Equipment", path: "/database/equipment/" },
  { label: "Cards", path: "/database/cards/" },
  { label: "Artifacts", path: "/database/artifacts/" },
  { label: "Monsters", path: "/database/monsters/" },
  { label: "Bosses", path: "/database/bosses/" },
  { label: "Maps", path: "/database/maps/" }
];

export type HeaderProps = {
  mode: ThemeMode;
  onToggleTheme: () => void;
  pathname: string;
};

export function Header({ mode, onToggleTheme, pathname }: HeaderProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.assign("/search/?q=" + encodeURIComponent(searchQuery.trim()));
  }

  return (
    <header className="site-header">
      <div className="sv-container site-header__inner">
        <a aria-label="SpiritVale Wiki home" className="site-logo sv-focusable" href="/">
          <AssetImage imageAssetId="sv-brand-logo-wordmark" />
          <span>SpiritVale Wiki</span>
        </a>
        <nav aria-label="Primary navigation" className="site-nav">
          {primaryNavigation.map((item) => (
            <a
              aria-current={pathname === item.path ? "page" : undefined}
              className="sv-focusable"
              href={item.path}
              key={item.path}
            >
              {item.label}
            </a>
          ))}
          <form className="site-nav__search" onSubmit={submitSearch}>
            <SearchBar aria-label="Search SpiritVale" onValueChange={setSearchQuery} placeholder="Search SpiritVale..." value={searchQuery} />
          </form>
          <IconButton
            icon={<Icon name="menu" />}
            label={mode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={onToggleTheme}
          />
        </nav>
        <IconButton
          aria-expanded={isMenuOpen}
          className="site-menu-button"
          icon={<Icon name={isMenuOpen ? "close" : "menu"} />}
          label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
          ref={menuButtonRef}
        />
      </div>
      {isMenuOpen ? (
        <nav aria-label="Mobile navigation" className="site-mobile-menu" ref={menuRef}>
          <div className="sv-container site-mobile-menu__content">
            {primaryNavigation.map((item) => (
              <a
                aria-current={pathname === item.path ? "page" : undefined}
                className="sv-focusable"
                href={item.path}
                key={item.path}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <form className="site-mobile-search" onSubmit={submitSearch}>
              <SearchBar aria-label="Search SpiritVale" onValueChange={setSearchQuery} placeholder="Search SpiritVale..." value={searchQuery} />
            </form>
            <span className="site-mobile-menu__label">Database</span>
            {databaseNavigation.map((item) => (
              <a className="sv-focusable" href={item.path} key={item.path} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <button aria-label={mode === "dark" ? "Switch to light theme" : "Switch to dark theme"} className="sv-button sv-button--outline sv-focusable" onClick={onToggleTheme} type="button">
              Theme: {mode}
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
