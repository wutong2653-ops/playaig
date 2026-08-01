import {
  type ButtonHTMLAttributes,
  forwardRef,
  type HTMLAttributes,
  type ReactNode
} from "react";
import { Icon } from "../icons";
import { cn } from "../utils/cn";

type VisualStateProps = {
  disabled?: boolean;
  loading?: boolean;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VisualStateProps & {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    startIcon?: ReactNode;
  };

export function Button({
  children,
  className,
  disabled,
  loading,
  startIcon,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={cn("sv-button", "sv-button--" + variant, "sv-focusable", className)}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? <Spinner aria-label="Loading" /> : startIcon}
      {children}
    </button>
  );
}

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
  VisualStateProps & {
    icon: ReactNode;
    label: string;
  };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    className,
    disabled,
    icon,
    label,
    loading,
    type = "button",
    ...props
  },
  ref
) {
  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      aria-label={label}
      className={cn("sv-icon-button", "sv-focusable", className)}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      ref={ref}
      type={type}
    >
      {loading ? <Spinner aria-label="Loading" /> : icon}
    </button>
  );
});

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VisualStateProps & {
    tone?: "primary" | "success" | "warning" | "danger";
  };

export function Badge({ children, className, disabled, loading, tone = "primary", ...props }: BadgeProps) {
  return (
    <span
      {...props}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      className={cn("sv-badge", "sv-badge--" + tone, className)}
      data-loading={loading || undefined}
    >
      {loading ? "Loading" : children}
    </span>
  );
}

export type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & VisualStateProps;

export function Chip({ children, className, disabled, loading, type = "button", ...props }: ChipProps) {
  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={cn("sv-chip", "sv-focusable", className)}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? "Loading" : children}
    </button>
  );
}

export type TagProps = HTMLAttributes<HTMLSpanElement> & VisualStateProps;

export function Tag({ children, className, disabled, loading, ...props }: TagProps) {
  return (
    <span
      {...props}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      className={cn("sv-tag", className)}
      data-loading={loading || undefined}
    >
      {loading ? "Loading" : children}
    </span>
  );
}

export type DividerProps = HTMLAttributes<HTMLHRElement>;

export function Divider({ className, ...props }: DividerProps) {
  return <hr {...props} className={cn("sv-divider", className)} />;
}

export type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  className?: string;
};

export function Tooltip({ children, className, content }: TooltipProps) {
  return (
    <span className={cn("sv-tooltip", className)}>
      {children}
      <span className="sv-tooltip__content" role="tooltip">
        {content}
      </span>
    </span>
  );
}

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  alt: string;
  imageAssetId?: string;
  initials?: string;
};

export function Avatar({ alt, className, imageAssetId, initials, ...props }: AvatarProps) {
  return (
    <span
      {...props}
      aria-label={alt}
      className={cn("sv-avatar", className)}
      data-asset-id={imageAssetId}
      role="img"
      title={imageAssetId ? "Asset: " + imageAssetId : undefined}
    >
      {initials ?? alt.slice(0, 1).toUpperCase()}
    </span>
  );
}

export type SpinnerProps = HTMLAttributes<HTMLSpanElement>;

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <span {...props} className={cn("sv-spinner", className)} role="status">
      <Icon name="spinner" />
      <span className="sv-visually-hidden">Loading</span>
    </span>
  );
}

export type SkeletonProps = HTMLAttributes<HTMLSpanElement> & {
  shape?: "line" | "block" | "circle";
};

export function Skeleton({ className, shape = "line", ...props }: SkeletonProps) {
  return <span {...props} aria-busy="true" className={cn("sv-skeleton", "sv-skeleton--" + shape, className)} />;
}
