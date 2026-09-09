import { useEffect, useState, type CSSProperties } from "react";
import directory from "./mapsDirectoryData.json";
import { applyPageMetadata } from "./site";

const canonical = "https://playaig.com/database/maps/";
const controlStyle: CSSProperties = { width: "100%", minWidth: 0, minHeight: 44, padding: "10px 12px", border: "1px solid #697386", borderRadius: 8, color: "#f4f7ff", background: "#161d2a", fontSize: 16 };
const panelStyle: CSSProperties = { padding: 20, border: "1px solid #697386", borderRadius: 12, minWidth: 0, overflowWrap: "anywhere" };
const levelRange = (map: typeof directory.maps[number]) => `${map.minLevel}–${map.maxLevel}`;
const recordId = (identifier: string) => `map-${identifier.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
const ranges = [...new Map(directory.maps.map(map => [levelRange(map), map.minLevel])).entries()].sort((a, b) => a[1] - b[1]).map(([range]) => range);

export function MapsDirectory() {
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("");
  const [sort, setSort] = useState("name");
  const matchingMaps = directory.maps.filter(map => `${map.name} ${map.identifier}`.toLowerCase().includes(query.trim().toLowerCase()) && (!range || levelRange(map) === range)).sort((a, b) => {
    if (sort === "level") return (a.minLevel || Infinity) - (b.minLevel || Infinity) || a.name.localeCompare(b.name, "en") || a.identifier.localeCompare(b.identifier, "en");
    const byName = a.name.localeCompare(b.name, "en") || a.identifier.localeCompare(b.identifier, "en");
    return sort === "reverse" ? -byName : byName;
  });

  useEffect(() => {
    applyPageMetadata({ title: directory.title, description: directory.description, canonicalPath: "/database/maps/", imageAssetId: "sv-map-ice-cavern-01", structuredData: [
      { "@context": "https://schema.org", "@type": "CollectionPage", name: directory.title, description: directory.description, url: canonical, dateModified: directory.verifiedAt, mainEntity: { "@type": "ItemList", numberOfItems: directory.maps.length, itemListElement: directory.maps.map((map, index) => ({ "@type": "ListItem", position: index + 1, name: map.name, url: canonical + "#" + recordId(map.identifier) })) } },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://playaig.com/" }, { "@type": "ListItem", position: 2, name: "Database", item: "https://playaig.com/database/" }, { "@type": "ListItem", position: 3, name: "Maps", item: canonical }] },
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: directory.faq.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }
    ] });
  }, []);

  return <main id="main-content"><div id="maps-directory" className="sv-container" style={{ paddingTop: 32, paddingBottom: 48, overflowWrap: "anywhere" }}>
    <style>{"#maps-directory a { color: var(--sv-color-primary); } #maps-directory :is(input, select, button, summary, a):focus-visible { outline: 3px solid var(--sv-color-primary); outline-offset: 3px; }"}</style>
    <nav aria-label="Breadcrumb"><a href="/database/">Database</a> / Maps</nav>
    <header style={{ margin: "24px 0" }}>
      <p>Official source directory · {directory.maps.length} records</p>
      <h1>{directory.h1}</h1>
      <p style={{ maxWidth: 800 }}>{directory.intro}</p>
      <p>Last verified: <time dateTime={directory.verifiedAt}>{directory.verifiedLabel}</time></p>
      <p><a href={directory.worldMapUrl} target="_blank" rel="noopener noreferrer">Open the official world map ↗</a> · <a href="#map-sources">View data sources</a></p>
    </header>
    <section aria-labelledby="directory-controls-heading" style={panelStyle}>
      <h2 id="directory-controls-heading">Find a SpiritVale map</h2>
      <p>{directory.usage}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 16 }}>
        <label>Search maps<input id="maps-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Name or game identifier" style={controlStyle} /></label>
        <label>Monster level range<select id="maps-level-range" value={range} onChange={event => setRange(event.target.value)} style={controlStyle}><option value="">All published ranges</option>{ranges.map(value => <option key={value} value={value}>{value}{value === "0–0" ? " (source value)" : ""}</option>)}</select></label>
        <label>Sort maps<select id="maps-sort" value={sort} onChange={event => setSort(event.target.value)} style={controlStyle}><option value="name">Name: A–Z</option><option value="reverse">Name: Z–A</option><option value="level">Monster level: low to high</option></select></label>
      </div>
      <p id="maps-result-count" role="status" aria-live="polite">{matchingMaps.length} of {directory.maps.length} map records</p>
      <button type="button" onClick={() => { setQuery(""); setRange(""); setSort("name"); }} style={{ ...controlStyle, width: "auto" }}>Reset filters</button>
    </section>
    <section aria-labelledby="map-records-heading" style={{ marginTop: 32 }}>
      <h2 id="map-records-heading">Official map records</h2>
      {matchingMaps.length === 0 && <p>No map records match these filters. Try another name or reset the filters.</p>}
      <div id="maps-results" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 16 }}>
        {matchingMaps.map(map => <article key={map.identifier} id={recordId(map.identifier)} data-map-record={map.identifier} style={panelStyle}>
          <h3 style={{ marginTop: 0 }}>{map.name}</h3>
          <dl><dt>Game identifier</dt><dd style={{ marginLeft: 0 }}>{map.identifier}</dd><dt style={{ marginTop: 12 }}>Listed monster levels</dt><dd style={{ marginLeft: 0 }}>{levelRange(map)}{map.minLevel === 0 && map.maxLevel === 0 ? " (source value; no level guidance inferred)" : ""}</dd></dl>
        </article>)}
      </div>
    </section>
    <section id="map-sources" style={{ ...panelStyle, marginTop: 32 }}><h2>Sources and data boundaries</h2><p>{directory.boundary}</p><p>Source: <a href={directory.sourceUrl}>SpiritVale official map directory</a>. Identity verified through <a href={directory.identitySource}>Steam App 3767850 official support information</a>.</p><p>All records were checked at <time dateTime={directory.verifiedAt}>{directory.verifiedLabel}</time>. The count describes this source snapshot.</p></section>
    <section aria-labelledby="map-faq-heading" style={{ marginTop: 32 }}><h2 id="map-faq-heading">Map directory questions</h2>{directory.faq.map(item => <details key={item.question} style={{ ...panelStyle, marginBottom: 12 }}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>
  </div></main>;
}
