const trailingCardPattern = /(?:\s+card)+\s*$/i;

export function normalizeCardName(name) {
  const value = String(name ?? "").replace(/\s+/g, " ").trim();
  if (!value) return "Card";
  const withoutRepeatedSuffix = value.replace(trailingCardPattern, "").trim();
  return withoutRepeatedSuffix ? withoutRepeatedSuffix + " Card" : "Card";
}

export function cardTitle(name) {
  return "SpiritVale " + normalizeCardName(name) + " Guide | PlayAIG";
}

export function cardDescription(name) {
  const normalizedName = normalizeCardName(name);
  return "View the verified " + normalizedName + " entry, including currently available source-backed information and related SpiritVale card resources on PlayAIG.";
}
