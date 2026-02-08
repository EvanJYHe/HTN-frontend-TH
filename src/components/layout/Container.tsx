import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className="mx-auto w-full max-w-[1920px] px-6 py-16 sm:px-8 lg:px-10 max-md:pt-8">{children}</div>;
}
