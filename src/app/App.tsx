import { DesignSystemProvider, useTheme } from "../design-system";
import { getClassBySlug, getDatabaseCategoryBySlug, getGuideBySlug } from "../data";
import { ClassDetailPage, ClassNotFoundPage } from "./ClassDetailPage";
import { ClassesIndexPage } from "./ClassesIndexPage";
import { DatabaseCategoryPage, DatabaseNotFoundPage } from "./DatabaseCategoryPage";
import { DatabaseIndexPage } from "./DatabaseIndexPage";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HomePage } from "./HomePage";
import { NotFoundPage } from "./NotFoundPage";
import { SearchPage } from "./SearchPage";
import { GuideDetailPage, GuideNotFoundPage } from "./GuideDetailPage";
import { GuidesIndexPage } from "./GuidesIndexPage";
import { App as PlaygroundApp } from "../../playground/App";
import "./site.css";

function SiteContent() {
  const { mode, toggleTheme } = useTheme();
  const pathname = window.location.pathname;

  if (pathname === "/playground/" || pathname === "/playground") {
    return (
      <DesignSystemProvider mode={mode}>
        <a className="site-skip-link sv-focusable" href="#main-content">Skip to component preview</a>
        <PlaygroundApp />
      </DesignSystemProvider>
    );
  }

  if (pathname === "/search/" || pathname === "/search") {
    return (
      <DesignSystemProvider mode={mode}>
        <a className="site-skip-link sv-focusable" href="#main-content">Skip to content</a>
        <Header mode={mode} onToggleTheme={toggleTheme} pathname="/search/" />
        <SearchPage />
        <Footer />
      </DesignSystemProvider>
    );
  }

  if (pathname === "/404/" || pathname === "/404") {
    return (
      <DesignSystemProvider mode={mode}>
        <a className="site-skip-link sv-focusable" href="#main-content">Skip to content</a>
        <Header mode={mode} onToggleTheme={toggleTheme} pathname="/404/" />
        <NotFoundPage />
        <Footer />
      </DesignSystemProvider>
    );
  }

  if (pathname === "/guides/" || pathname === "/guides") {
    return (
      <DesignSystemProvider mode={mode}>
        <a className="site-skip-link sv-focusable" href="#main-content">Skip to content</a>
        <Header mode={mode} onToggleTheme={toggleTheme} pathname="/guides/" />
        <GuidesIndexPage />
        <Footer />
      </DesignSystemProvider>
    );
  }

  if (pathname === "/classes/" || pathname === "/classes") {
    return (
      <DesignSystemProvider mode={mode}>
        <a className="site-skip-link sv-focusable" href="#main-content">Skip to content</a>
        <Header mode={mode} onToggleTheme={toggleTheme} pathname="/classes/" />
        <ClassesIndexPage />
        <Footer />
      </DesignSystemProvider>
    );
  }

  if (pathname === "/database/" || pathname === "/database") {
    return (
      <DesignSystemProvider mode={mode}>
        <a className="site-skip-link sv-focusable" href="#main-content">Skip to content</a>
        <Header mode={mode} onToggleTheme={toggleTheme} pathname="/database/" />
        <DatabaseIndexPage />
        <Footer />
      </DesignSystemProvider>
    );
  }

  const guideMatch = pathname.match(/^\/guides\/([a-z0-9-]+)\/$/);
  if (guideMatch) {
    const guide = getGuideBySlug(guideMatch[1]);
    return (
      <DesignSystemProvider mode={mode}>
        <a className="site-skip-link sv-focusable" href="#main-content">Skip to content</a>
        <Header mode={mode} onToggleTheme={toggleTheme} pathname="/guides/" />
        {guide ? <GuideDetailPage guide={guide} /> : <GuideNotFoundPage />}
        <Footer />
      </DesignSystemProvider>
    );
  }

  const classMatch = pathname.match(/^\/classes\/([a-z0-9-]+)\/?$/);
  if (classMatch) {
    const gameClass = getClassBySlug(classMatch[1]);
    return (
      <DesignSystemProvider mode={mode}>
        <a className="site-skip-link sv-focusable" href="#main-content">Skip to content</a>
        <Header mode={mode} onToggleTheme={toggleTheme} pathname="/classes/" />
        {gameClass ? <ClassDetailPage gameClass={gameClass} /> : <ClassNotFoundPage />}
        <Footer />
      </DesignSystemProvider>
    );
  }

  const databaseMatch = pathname.match(/^\/database\/([a-z0-9-]+)\/?$/);
  if (databaseMatch) {
    const category = getDatabaseCategoryBySlug(databaseMatch[1]);
    return (
      <DesignSystemProvider mode={mode}>
        <a className="site-skip-link sv-focusable" href="#main-content">Skip to content</a>
        <Header mode={mode} onToggleTheme={toggleTheme} pathname="/database/" />
        {category ? <DatabaseCategoryPage category={category} /> : <DatabaseNotFoundPage />}
        <Footer />
      </DesignSystemProvider>
    );
  }

  return (
    <DesignSystemProvider mode={mode}>
      <a className="site-skip-link sv-focusable" href="#main-content">Skip to content</a>
      <Header mode={mode} onToggleTheme={toggleTheme} pathname={pathname} />
      {pathname === "/" ? <HomePage /> : <NotFoundPage />}
      <Footer />
    </DesignSystemProvider>
  );
}

export function App() {
  return <SiteContent />;
}
