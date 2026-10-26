type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  once?: boolean;
  viewportMargin?: string;
};

export default function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
