import { type ImgHTMLAttributes } from "react";
import { resolveSpiritValeAsset } from "./assets";
import { cn } from "../design-system/utils/cn";

export type AssetImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "height" | "src" | "width"> & {
  imageAssetId: string;
  priority?: boolean;
};

export function AssetImage({
  className,
  imageAssetId,
  priority = false,
  ...props
}: AssetImageProps) {
  const asset = resolveSpiritValeAsset(imageAssetId);

  if (!asset) {
    return (
      <span aria-live="polite" className={cn("sv-asset-fallback", className)} data-asset-id={imageAssetId}>
        Official image unavailable
      </span>
    );
  }

  return (
    <img
      {...props}
      alt={asset.alt}
      className={className}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      height={asset.height}
      loading={priority ? "eager" : "lazy"}
      src={asset.src}
      width={asset.width}
    />
  );
}
