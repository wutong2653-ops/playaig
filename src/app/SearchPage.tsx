import { type FormEvent, useEffect, useState } from "react";
import { EmptyState, PageHeader, SearchBar, Section } from "../design-system";
import { searchSpiritVale, type SearchFilter } from "../data";
import { SearchResultCard } from "../components";
import { applySearchMetadata } from "./site";

const filters: { id: SearchFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "guides", label: "Guides" },
  { id: "classes", label: "Classes" },
  { id: "database", label: "Database" }
];

function readSearchState() {
  const params = new URLSearchParams(window.location.search);
  const requestedFilter = params.get("type");
  const filter = filters.some((item) => item.id === requestedFilter) ? requestedFilter as SearchFilter : "all";
  return { query: params.get("q") ?? "", filter };
}

export function SearchPage() {
  const initial = readSearchState();
  const [query, setQuery] = useState(initial.query);
  const state = readSearchState();
  const results = searchSpiritVale(state.query, state.filter);

  useEffect(() => {
    applySearchMetadata(state.query);
  }, [state.query]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.assign("/search/?q=" + encodeURIComponent(query.trim()) + (state.filter === "all" ? "" : "&type=" + state.filter));
  }

  return (
    <main id="main-content">
      <div className="sv-container search-page">
        <Section className="search-page__header">
          <PageHeader description="Search only the currently indexed and verified SpiritVale Guides, Classes, and Database categories." title="Search SpiritVale" />
          <form className="search-page__form" onSubmit={submitSearch}>
            <SearchBar aria-label="Search SpiritVale" onValueChange={setQuery} placeholder="Search Guides, Classes, and Database..." value={query} />
          </form>
        </Section>
        <Section>
          <nav aria-label="Search filters" className="search-page__filters">
            {filters.map((filter) => (
              <a className="sv-focusable" href={"/search/?q=" + encodeURIComponent(state.query) + (filter.id === "all" ? "" : "&type=" + filter.id)} key={filter.id}>
                <span aria-current={state.filter === filter.id ? "page" : undefined} className="sv-chip">{filter.label}</span>
              </a>
            ))}
          </nav>
        </Section>
        <Section>
          {state.query ? (
            results.length ? <div className="search-page__results">{results.map((record) => <SearchResultCard key={record.id} record={record} />)}</div> : (
              <EmptyState description="Try another keyword or browse our verified Guides and Classes." title="No verified results found." />
            )
          ) : <EmptyState description="Enter a keyword to search the current verified SpiritVale collection." title="Search verified information" />}
        </Section>
      </div>
    </main>
  );
}
