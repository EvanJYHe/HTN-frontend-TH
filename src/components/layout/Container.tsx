import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className="mx-auto w-[92vw] max-w-[1920px] py-16 max-md:w-[96vw] max-md:pt-8">{children}</div>;
}
