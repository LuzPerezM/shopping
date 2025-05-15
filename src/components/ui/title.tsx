import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";

export const Title = forwardRef<
  ComponentRef<"div">,
  ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { children, ...extra } = props;

  return (
    <div
      ref={ref}
      className={"text-2xl font-semibold text-center m-4"}
      {...extra}
    >
      {children}
    </div>
  );
});
