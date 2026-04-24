import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-none border border-canvas-border/50 bg-transparent px-2.5 py-2 text-xs transition-colors outline-none placeholder:text-canvas-text focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-primary-solid/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-alert-solid aria-invalid:ring-1 aria-invalid:ring-alert-solid/20 md:text-xs dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-alert-solid/50 dark:aria-invalid:ring-alert-solid/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
