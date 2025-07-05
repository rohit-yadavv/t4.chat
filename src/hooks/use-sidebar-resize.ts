import { useCallback, useRef, useEffect } from "react";

interface UseSidebarResizeProps {
  direction: "left" | "right";
  enableDrag: boolean;
  onResize: (width: string) => void;
  onToggle: () => void;
  currentWidth: string;
  isCollapsed: boolean;
  minResizeWidth: string;
  maxResizeWidth: string;
  setIsDraggingRail: (isDragging: boolean) => void;
  widthCookieName: string;
  widthCookieMaxAge: number;
  preventAutoCollapse?: boolean; // New prop to prevent auto-collapse
}

export function useSidebarResize({
  direction,
  enableDrag,
  onResize,
  onToggle,
  currentWidth,
  isCollapsed,
  minResizeWidth,
  maxResizeWidth,
  setIsDraggingRail,
  widthCookieName,
  widthCookieMaxAge,
  preventAutoCollapse = false,
}: UseSidebarResizeProps) {
  const dragRef = useRef<HTMLButtonElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  // Convert rem/px values to pixels for calculations
  const convertToPixels = useCallback((value: string): number => {
    if (value.endsWith("rem")) {
      const remValue = parseFloat(value);
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      return remValue * rootFontSize;
    }
    if (value.endsWith("px")) {
      return parseFloat(value);
    }
    // Fallback: assume rem
    return parseFloat(value) * 16;
  }, []);

  // Convert pixels back to rem
  const convertToRem = useCallback((pixels: number): string => {
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    return `${pixels / rootFontSize}rem`;
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!enableDrag) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      isDragging.current = true;
      startX.current = e.clientX;
      startWidth.current = convertToPixels(currentWidth);
      setIsDraggingRail(true);

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;

        const deltaX =
          direction === "right"
            ? e.clientX - startX.current
            : startX.current - e.clientX;
        const newWidthPx = Math.max(
          convertToPixels(minResizeWidth),
          Math.min(convertToPixels(maxResizeWidth), startWidth.current + deltaX)
        );

        const newWidth = convertToRem(newWidthPx);
        onResize(newWidth);

        // Save width to cookie
        document.cookie = `${widthCookieName}=${newWidth}; path=/; max-age=${widthCookieMaxAge}`;
      };

      const handleMouseUp = () => {
        if (isDragging.current) {
          isDragging.current = false;
          setIsDraggingRail(false);

          // Only auto-collapse if preventAutoCollapse is false and we're at minimum width
          if (!preventAutoCollapse) {
            const currentWidthPx = convertToPixels(currentWidth);
            const minWidthPx = convertToPixels(minResizeWidth);

            // If we're very close to minimum width (within 10px), collapse
            if (currentWidthPx <= minWidthPx + 10 && !isCollapsed) {
              onToggle();
            }
          }
        }

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [
      enableDrag,
      direction,
      currentWidth,
      minResizeWidth,
      maxResizeWidth,
      onResize,
      onToggle,
      isCollapsed,
      setIsDraggingRail,
      widthCookieName,
      widthCookieMaxAge,
      convertToPixels,
      convertToRem,
      preventAutoCollapse,
    ]
  );

  return {
    dragRef,
    handleMouseDown,
  };
}
