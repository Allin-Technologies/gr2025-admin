"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Button } from "./button";
import { clsxm } from "@/lib/clsxm";

type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>;

type Props = {
  open?: boolean;
  arrow?: boolean;
  disabled?: boolean;
  sideOffset?: number;
  contentClassName?: string;
  children: React.ReactNode;
  useDefaultTrigger?: boolean;
  side?: PopoverContentProps["side"];
  align?: PopoverContentProps["align"];
  content: (close: () => void) => React.ReactNode;
  onOpenChange?: (value: boolean) => void;
};

export const Popover: React.FC<Props> = ({
  open,
  content,
  children,
  disabled,
  arrow = true,
  sideOffset = 5,
  contentClassName,
  onOpenChange,
  align = "start",
  useDefaultTrigger = true,
  side,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);

  return (
    <PopoverPrimitive.Root
      open={open ?? internalOpen}
      onOpenChange={(value) => onOpenChange?.(value) ?? setInternalOpen(value)}
    >
      <PopoverPrimitive.Trigger asChild className='cursor-pointer shrink-0'>
        {useDefaultTrigger ? (
          <Button variant='ghost' disabled={disabled}>
            {children}
          </Button>
        ) : (
          children
        )}
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          side={side}
          sideOffset={sideOffset}
          className={clsxm(
            "min-w-[14rem] min-h-[2rem] rounded-default bg-gray-5 rounded-22 overflow-hidden z-50 p-4",
            contentClassName
          )}
        >
          {content(() => setInternalOpen(false))}
          {arrow && <PopoverPrimitive.Arrow className='fill-gray-5' />}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
Popover.displayName = "Popover";
