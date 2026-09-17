import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

/**
 * Кнопки всего сайта. Вид описан классами `.btn*` в globals.css — там же,
 * где градиент из макета, поэтому шапка, hero, регистрация и футер
 * не расходятся при правке палитры.
 *
 * on-dark / ghost-on-dark — для акцентной и глубокой полос, где основная
 * пара «розовая заливка / тёмная обводка» теряется на цветном фоне.
 */
type Variant = "primary" | "secondary" | "on-dark" | "ghost-on-dark";

type CommonProps = {
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

export default function Button({
  variant = "primary",
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `btn btn--${variant} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
