import {
  type ChangeEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode
} from "react";
import { Button, Chip } from "./base";
import { cn } from "../utils/cn";

type AssetCardProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  description?: ReactNode;
  imageAssetId?: string;
  media?: ReactNode;
  meta?: ReactNode;
  title: ReactNode;
  variant?: "default" | "compact" | "featured";
};

function AssetCard({
  className,
  description,
  imageAssetId,
  media,
  meta,
  title,
  variant = "default",
  ...props
}: AssetCardProps) {
  return (
    <article {...props} className={cn("sv-card", "sv-card--" + variant, className)}>
      {media || imageAssetId ? (
        <div className="sv-card__asset" data-asset-id={imageAssetId}>
          {media ?? "Registered asset"}
        </div>
      ) : null}
      <div className="sv-card__content">
        {meta ? <div className="sv-card__meta">{meta}</div> : null}
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
    </article>
  );
}

export type HeroBannerProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  actions?: ReactNode;
  description?: ReactNode;
  imageAssetId?: string;
  media?: ReactNode;
  title: ReactNode;
};

export function HeroBanner({
  actions,
  className,
  description,
  imageAssetId,
  media,
  title,
  ...props
}: HeroBannerProps) {
  return (
    <section {...props} className={cn("sv-hero", className)} data-asset-id={imageAssetId}>
      {media ? <div className="sv-hero__media">{media}</div> : null}
      <div className="sv-hero__content">
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
        {actions ? <div className="sv-hero__actions">{actions}</div> : null}
      </div>
    </section>
  );
}

export type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onValueChange?: (value: string) => void;
};

export function SearchBar({ className, onValueChange, placeholder = "Search", ...props }: SearchBarProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onValueChange?.(event.target.value);
  }

  return (
    <label className={cn("sv-search", "sv-focusable", className)}>
      <span className="sv-visually-hidden">{placeholder}</span>
      <input {...props} onChange={handleChange} placeholder={placeholder} type="search" />
    </label>
  );
}

export type ClassCardProps = Omit<AssetCardProps, "variant"> & {
  variant?: "default" | "compact";
};
export const ClassCard = (props: ClassCardProps) => <AssetCard {...props} />;

export type GuideCardProps = Omit<AssetCardProps, "variant"> & {
  variant?: "default" | "featured";
};
export const GuideCard = (props: GuideCardProps) => <AssetCard {...props} />;

export type BuildCardProps = AssetCardProps;
export const BuildCard = (props: BuildCardProps) => <AssetCard {...props} />;

export type BossCardProps = AssetCardProps;
export const BossCard = (props: BossCardProps) => <AssetCard {...props} />;

export type MonsterCardProps = AssetCardProps;
export const MonsterCard = (props: MonsterCardProps) => <AssetCard {...props} />;

export type DatabaseCardProps = Omit<AssetCardProps, "variant"> & {
  variant?: "default" | "compact";
};
export const DatabaseCard = (props: DatabaseCardProps) => <AssetCard {...props} />;

export type FeatureSectionProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  children?: ReactNode;
  description?: ReactNode;
  title: ReactNode;
  variant?: "default" | "highlighted";
};

export function FeatureSection({
  children,
  className,
  description,
  title,
  variant = "default",
  ...props
}: FeatureSectionProps) {
  return (
    <section {...props} className={cn("sv-feature-section", "sv-feature-section--" + variant, className)}>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {children}
    </section>
  );
}

export type BreadcrumbItem = {
  current?: boolean;
  href?: string;
  label: string;
};

export type BreadcrumbProps = HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[];
  separator?: ReactNode;
};

export function Breadcrumb({ className, items, separator = "/", ...props }: BreadcrumbProps) {
  return (
    <nav {...props} aria-label="Breadcrumb" className={cn("sv-breadcrumb", className)}>
      {items.map((item, index) => (
        <span className="sv-breadcrumb__item" key={item.href ?? item.label}>
          {item.href ? <a className="sv-focusable" href={item.href}>{item.label}</a> : <span aria-current={item.current ? "page" : undefined}>{item.label}</span>}
          {index < items.length - 1 ? <span aria-hidden="true">{separator}</span> : null}
        </span>
      ))}
    </nav>
  );
}

export type PaginationProps = HTMLAttributes<HTMLElement> & {
  currentPage: number;
  onPageChange?: (page: number) => void;
  totalPages: number;
};

export function Pagination({ className, currentPage, onPageChange, totalPages, ...props }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav {...props} aria-label="Pagination" className={cn("sv-pagination", className)}>
      {pages.map((page) => (
        <button
          aria-current={page === currentPage ? "page" : undefined}
          className="sv-pagination__button sv-focusable"
          key={page}
          onClick={() => onPageChange?.(page)}
          type="button"
        >
          {page}
        </button>
      ))}
    </nav>
  );
}

export type FilterBarProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export function FilterBar({ children, className, ...props }: FilterBarProps) {
  return <div {...props} className={cn("sv-filter-bar", className)}>{children}</div>;
}

export type EmptyStateProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  action?: ReactNode;
  description?: ReactNode;
  title: ReactNode;
};

export function EmptyState({ action, className, description, title, ...props }: EmptyStateProps) {
  return (
    <section {...props} className={cn("sv-empty-state", className)}>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {action}
    </section>
  );
}

export type SearchResultItemProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  description?: ReactNode;
  href?: string;
  meta?: ReactNode;
  title: ReactNode;
};

export function SearchResultItem({ className, description, href, meta, title, ...props }: SearchResultItemProps) {
  const titleNode = href ? <a href={href}>{title}</a> : title;
  return (
    <article {...props} className={cn("sv-search-result", className)}>
      {meta ? <div className="sv-search-result__meta">{meta}</div> : null}
      <h3>{titleNode}</h3>
      {description ? <p>{description}</p> : null}
    </article>
  );
}

export const ResetFiltersButton = () => <Button variant="ghost">Reset filters</Button>;
export const FilterChip = Chip;
