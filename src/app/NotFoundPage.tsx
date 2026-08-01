import { type FormEvent, useEffect, useState } from "react";
import { EmptyState, PageHeader, SearchBar } from "../design-system";
import { applyNotFoundMetadata } from "./site";

export function NotFoundPage() {
  const [query, setQuery] = useState("");
  useEffect(() => { applyNotFoundMetadata(); }, []);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.assign("/search/?q=" + encodeURIComponent(query.trim()));
  }

  return (
    <main id="main-content">
      <div className="sv-container site-safe-route not-found-page">
        <PageHeader description="The page you requested is unavailable or has not been published." title="Page not found" />
        <form className="not-found-page__search" onSubmit={submitSearch}>
          <SearchBar aria-label="Search SpiritVale" onValueChange={setQuery} placeholder="Search verified SpiritVale information..." value={query} />
        </form>
        <EmptyState
          action={<div className="not-found-page__actions"><a className="sv-button sv-button--primary sv-focusable" href="/guides/">Browse Guides</a><a className="sv-button sv-button--outline sv-focusable" href="/classes/">Browse Classes</a><a className="sv-button sv-button--ghost sv-focusable" href="/">Back Home</a></div>}
          description="Search the verified collection or continue with a published SpiritVale section."
          title="We could not find that page"
        />
      </div>
    </main>
  );
}
