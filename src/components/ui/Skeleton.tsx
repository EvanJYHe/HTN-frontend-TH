import type { CSSProperties } from "react";

type SkeletonProps = {
  className?: string;
  style?: CSSProperties;
};

export function Skeleton({ className = "", style }: SkeletonProps) {
  return <div aria-hidden="true" className={`skeleton ${className}`.trim()} style={style} />;
}
