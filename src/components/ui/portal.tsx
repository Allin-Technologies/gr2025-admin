"use client";

import * as React from "react";
import * as PortalPrimitive from "@radix-ui/react-portal";

type PortalProps = {
  targetId?: string;
};

const Portal = React.forwardRef<
  React.ElementRef<typeof PortalPrimitive.Root>,
  Omit<
    React.ComponentPropsWithoutRef<typeof PortalPrimitive.Root>,
    "container"
  > &
    PortalProps
>(({ children, targetId, ...props }, ref) => {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (targetId) {
      const containerElement = document.getElementById(targetId);
      setContainer(containerElement);
    }
  }, [targetId]);

  return (
    <PortalPrimitive.Root ref={ref} {...props} container={container}>
      {children}
    </PortalPrimitive.Root>
  );
});
Portal.displayName = "Portal";

export { Portal };
