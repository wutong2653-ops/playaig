import { Badge, SearchResultItem } from "../../design-system";
import type { SpiritValeSearchRecord } from "../../data";

const categoryLabels = {
  guides: "Guide",
  classes: "Class",
  database: "Database"
} as const;

const verificationPresentation = {
  verified: { label: "Verified", tone: "success" },
  "partially-verified": { label: "Partially verified", tone: "warning" },
  unverified: { label: "Awaiting more official details", tone: "primary" },
  "awaiting-official-information": { label: "Awaiting Official Information", tone: "primary" }
} as const;

function sourceTypeLabel(sourceType: string) {
  return sourceType.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function SearchResultCard({ record }: { record: SpiritValeSearchRecord }) {
  const verification = verificationPresentation[record.verificationStatus];
  return (
    <SearchResultItem
      description={<><span>{record.summary}</span><span className="search-result-card__url">{record.url}</span></>}
      href={record.url}
      meta={<div className="search-result-card__meta"><Badge>{categoryLabels[record.category]}</Badge><Badge tone={verification.tone}>{verification.label}</Badge><span>Source: {sourceTypeLabel(record.sourceType)}</span></div>}
      title={record.title}
    />
  );
}
