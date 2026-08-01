import { type CSSProperties, type HTMLAttributes, type PropsWithChildren, type ReactNode } from "react";
import { cn } from "../utils/cn";

export type ContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Container({ children, className, ...props }: ContainerProps) {
  return <div {...props} className={cn("sv-container", className)}>{children}</div>;
}

export type SectionProps = PropsWithChildren<HTMLAttributes<HTMLElement>> & {
  as?: "section" | "div";
};

export function Section({ as: Element = "section", children, className, ...props }: SectionProps) {
  return <Element {...props} className={cn("sv-section", className)}>{children}</Element>;
}

export type GridProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  columns?: 1 | 2 | 3 | 4;
};

export function Grid({ children, className, columns, style, ...props }: GridProps) {
  const gridStyle = columns ? {
    ...style,
    "--sv-grid-columns": columns
  } as CSSProperties : style;

  return <div {...props} className={cn("sv-grid", className)} style={gridStyle}>{children}</div>;
}

export type StackProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Stack({ children, className, ...props }: StackProps) {
  return <div {...props} className={cn("sv-stack", className)}>{children}</div>;
}

export type SidebarProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  aside: ReactNode;
};

export function Sidebar({ aside, children, className, ...props }: SidebarProps) {
  return (
    <div {...props} className={cn("sv-sidebar", className)}>
      <aside className="sv-sidebar__aside">{aside}</aside>
      <div className="sv-sidebar__content">{children}</div>
    </div>
  );
}

export type PageHeaderProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  actions?: ReactNode;
  description?: ReactNode;
  title: ReactNode;
};

export function PageHeader({ actions, className, description, title, ...props }: PageHeaderProps) {
  return (
    <header {...props} className={cn("sv-page-header", className)}>
      <div>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="sv-page-header__actions">{actions}</div> : null}
    </header>
  );
}
