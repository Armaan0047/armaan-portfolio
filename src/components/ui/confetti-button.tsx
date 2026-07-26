"use client";
import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

// Confetti type
type ConfettiOptions = {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
};

// Global declaration
declare global {
  interface Window {
    confetti?: (options?: ConfettiOptions) => void;
  }
}

// Variants for button styling
const confettiButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-md",
        lg: "h-12 px-6 py-3 rounded-md text-lg",
      },
      animation: {
        none: "",
        scale: "active:scale-95",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "scale",
    },
  }
);

export interface ConfettiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof confettiButtonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  confettiOptions?: ConfettiOptions;
  autoConfetti?: boolean;
  triggerOnHover?: boolean;
  href?: string;
  download?: string;
  target?: string;
  rel?: string;
}

const ConfettiButton = React.forwardRef<HTMLButtonElement, ConfettiButtonProps>(
  (
    {
      className,
      variant,
      size,
      animation,
      asChild = false,
      children,
      icon,
      iconPosition = "left",
      loading = false,
      confettiOptions = {
        particleCount: 100,
        spread: 70,
      },
      autoConfetti = false,
      triggerOnHover = false,
      href,
      download,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const [isScriptLoading, setIsScriptLoading] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const loadConfettiScript = (): Promise<void> => {
      return new Promise((resolve) => {
        if (window.confetti) {
          resolve();
          return;
        }
        
        setIsScriptLoading(true);
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js";
        script.async = true;
        script.onload = () => {
          setIsScriptLoading(false);
          resolve();
        };
        document.body.appendChild(script);
      });
    };

    const triggerConfetti = () => {
      if (window.confetti && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        window.confetti({
          ...confettiOptions,
          origin: { x, y },
        });
      }
    };

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      e.preventDefault(); // Prevent default immediately to allow animation
      
      if (!window.confetti && !isScriptLoading) {
        await loadConfettiScript();
      }
      
      triggerConfetti();
      
      if (props.onClick) {
        props.onClick(e as any);
      }
      
      // If it's a link, manually trigger navigation after a short delay for confetti
      if (href) {
        setTimeout(() => {
          if (target === "_blank") {
            window.open(href, "_blank");
          } else if (download) {
            const a = document.createElement('a');
            a.href = href;
            a.download = download;
            a.click();
          } else {
            window.location.href = href;
          }
        }, 100);
      }
    };



    if (href) {
      return (
        <a
          ref={(node) => {
            if (typeof ref === "function") ref(node as any);
            else if (ref) ref.current = node as any;
            buttonRef.current = node as any;
          }}
          href={href}
          download={download}
          target={target}
          rel={rel}
          className={cn(confettiButtonVariants({ variant, size, animation }), className)}
          onClick={handleClick as any}
          onMouseEnter={triggerOnHover ? () => triggerConfetti() : undefined}
          style={{ textDecoration: "none" }}
        >
          {(loading || isScriptLoading) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {!(loading || isScriptLoading) && icon && iconPosition === "left" && (
            <span className="mr-1">{icon}</span>
          )}
          {children}
          {!(loading || isScriptLoading) && icon && iconPosition === "right" && (
            <span className="ml-1">{icon}</span>
          )}
        </a>
      );
    }

    return (
      <button
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          buttonRef.current = node;
        }}
        className={cn(confettiButtonVariants({ variant, size, animation }), className)}
        onClick={handleClick}
        onMouseEnter={triggerOnHover ? () => triggerConfetti() : undefined}
        disabled={loading || isScriptLoading || props.disabled}
        {...props}
      >
        {(loading || isScriptLoading) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        {!(loading || isScriptLoading) && icon && iconPosition === "left" && (
          <span className="mr-1">{icon}</span>
        )}
        {children}
        {!(loading || isScriptLoading) && icon && iconPosition === "right" && (
          <span className="ml-1">{icon}</span>
        )}
      </button>
    );
  }
);

ConfettiButton.displayName = "ConfettiButton";

export { ConfettiButton, confettiButtonVariants };
