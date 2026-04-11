import { toast as sonnerToast } from "sonner";

export const toast = {
  success: (message: string) =>
    sonnerToast.success(`Success: ${message}`, {
      id: message,
      position: "bottom-center",
      style: {
        "--normal-bg":
          "color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))",
        "--normal-text":
          "light-dark(var(--color-green-600), var(--color-green-400))",
        "--normal-description":
          "light-dark(var(--color-green-600), var(--color-green-400))",
        "--normal-border":
          "light-dark(var(--color-green-600), var(--color-green-400))",
      } as React.CSSProperties,
    }),
  error: (message: string) =>
    sonnerToast.error(`Error: ${message}`, {
      id: message,
      position: "bottom-center",
      style: {
        "--normal-bg":
          "color-mix(in oklab, var(--destructive) 10%, var(--background))",
        "--normal-text": "var(--destructive)",
        "--normal-description": "var(--destructive)",
        "--normal-border": "var(--destructive)",
      } as React.CSSProperties,
    }),
  warning: (message: string) =>
    sonnerToast.warning(`Warning: ${message}`, {
      id: message,
      position: "bottom-center",
      style: {
        "--normal-bg":
          "color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))",
        "--normal-text":
          "light-dark(var(--color-amber-600), var(--color-amber-400))",
        "--normal-border":
          "light-dark(var(--color-amber-600), var(--color-amber-400))",
      } as React.CSSProperties,
    }),
  info: (message: string) =>
    sonnerToast.info(`Info: ${message}`, {
      id: message,
      position: "bottom-center",
      style: {
        "--normal-bg":
          "color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))",
        "--normal-text":
          "light-dark(var(--color-sky-600), var(--color-sky-400))",
        "--normal-border":
          "light-dark(var(--color-sky-600), var(--color-sky-400))",
      } as React.CSSProperties,
    }),
};
