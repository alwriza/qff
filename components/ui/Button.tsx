import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

type CommonProps = {
  variant?: Variant;
  disabled?: boolean;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 mono text-[12px] font-medium transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary: "bg-coral text-bg hover:bg-coral/90",
  secondary:
    "border border-border text-text hover:border-mint hover:text-mint",
};

export default function Button({
  variant = "primary",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${
    disabled ? "opacity-40 pointer-events-none cursor-not-allowed" : ""
  }`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={classes} aria-disabled={disabled} {...rest}>
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
