import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

// 1. The Core BorderBeam Engine
export const BorderBeam = ({
  className,
  size = 150,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  delay = 0,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:var(--border-width)_solid_transparent]",

        // Masking logic to isolate the border edge
        "![mask-clip:padding-box,border-box] ![mask-linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "![mask-composite:intersect___xor]",

        // Pseudo-element animation that cycles around the border edge
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className,
      )}
    />
  );
};

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

// 2. The Integrated Visual Card Container
export const MagicCard = ({ children, className, ...props }: MagicCardProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[180px] w-[350px] flex-col items-center justify-center overflow-hidden rounded-xl border bg-white p-6 shadow-md dark:bg-zinc-950",
        className
      )}
      {...props}
    >
      {/* Visual content inside the card */}
      <div className="z-10 text-center">
        {children || (
          <>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Magic UI Active</h3>
            <p className="text-xs text-zinc-500">Border Beam rendering correctly</p>
          </>
        )}
      </div>

      {/* The border animation running beneath it */}
      <BorderBeam size={100} duration={6} borderWidth={2} />
    </div>
  );
};
