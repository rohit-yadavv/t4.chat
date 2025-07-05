//TSX code
"use client";
import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
type DevTooltipProps = {
  children: React.ReactNode;
  place?: "top" | "bottom" | "left" | "right";
  tipData: React.ReactNode;
  contentProps?: Omit<
    React.ComponentProps<typeof Tooltip.Content>,
    "className" | "side"
  >;
} & React.ComponentProps<typeof Tooltip.Root>;
const DevTooltip = ({
  children,
  place = "top",
  tipData,
  contentProps,
  ...props
}: DevTooltipProps) => {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root delayDuration={300} {...props}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={5}
            {...contentProps}
            side={place}
            className="TooltipContent capitalize origin-[var(--radix-tooltip-content-transform-origin)] bg-popover text-popover-foreground border border-input/70 text-[12px] px-2 py-1 rounded-md z-50"
          >
            {tipData}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default DevTooltip;
