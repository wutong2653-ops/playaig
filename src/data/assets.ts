import assetManifest from "../../data/assets/spiritvale-assets.json";
import type { SpiritValeAsset } from "./types";

const assets = assetManifest as SpiritValeAsset[];
const assetsById = new Map(assets.map((asset) => [asset.id, asset]));

export type ResolvedSpiritValeAsset = Pick<
  SpiritValeAsset,
  "id" | "alt" | "width" | "height" | "category" | "subject"
> & {
  src: string;
};

function reportAssetIssue(message: string) {
  if (import.meta.env.DEV) {
    console.error(message);
  }
}

export function resolveSpiritValeAsset(imageAssetId: string | undefined): ResolvedSpiritValeAsset | null {
  if (!imageAssetId) {
    reportAssetIssue("SpiritVale asset resolution requires an imageAssetId.");
    return null;
  }

  const asset = assetsById.get(imageAssetId);
  if (!asset) {
    reportAssetIssue("SpiritVale asset not found: " + imageAssetId);
    return null;
  }

  if (!asset.file.startsWith("public/")) {
    reportAssetIssue("SpiritVale asset has an invalid public file reference: " + imageAssetId);
    return null;
  }

  return {
    id: asset.id,
    src: asset.file.slice("public".length),
    alt: asset.alt,
    width: asset.width,
    height: asset.height,
    category: asset.category,
    subject: asset.subject
  };
}

export function getSpiritValeAssets() {
  return assets;
}
