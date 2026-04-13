import type { ButtonHTMLAttributes } from "react";

import { cn } from "@lib/utils";

function Cell({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "flex items-center justify-center",
        "text-(--cell-font-size)",
        "relative",
        "transition-all duration-300 ease-in-out",
        "hover:brightness-110 hover:scale-[1.02]",
        "disabled:cursor-not-allowed",

        "before:content-['']",
        "before:absolute before:inset-0",
        "before:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_60%)]",
        "before:pointer-events-none",
        className,
      )}
    />
  );
}

export default Cell;
