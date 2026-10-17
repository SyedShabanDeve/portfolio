import { useId } from "react";

/*
 * The S-cube mark: an "S" traced along the edges of an isometric hexagon
 * (a cube seen corner-on), over a faint cube-in-cube, a tesseract
 * projection. Colours follow the active theme.
 */
const S_PATH = "M52.78 20.00 L32.00 8.00 L11.22 20.00 L52.78 44.00 L32.00 56.00 L11.22 44.00";
const SIDES = "M52.78 20.00 L52.78 44.00 M11.22 20.00 L11.22 44.00";
const INNER = "M41.09 26.75 L32.00 21.50 L22.91 26.75 L22.91 37.25 L32.00 42.50 L41.09 37.25 Z";
const SPOKES = "M52.78 20.00 L41.09 26.75 M32.00 8.00 L32.00 21.50 M11.22 20.00 L22.91 26.75 M11.22 44.00 L22.91 37.25 M32.00 56.00 L32.00 42.50 M52.78 44.00 L41.09 37.25";

export default function Logo({ size = 36, className = "" }) {
  const gid = `ssa-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  return (
    <svg className={`logo ${className}`} viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gid} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--c2)" }} />
          <stop offset="1" style={{ stopColor: "var(--c1)" }} />
        </linearGradient>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g className="logo__ghost" stroke="currentColor">
          <path d={SPOKES} strokeOpacity=".18" strokeWidth="1.1" />
          <path d={INNER} strokeOpacity=".34" strokeWidth="1.3" />
        </g>
        <path d={SIDES} stroke="currentColor" strokeOpacity=".3" strokeWidth="2" />
        <path className="logo__s" d={S_PATH} stroke={`url(#${gid})`} strokeWidth="6.4" pathLength="1" />
      </g>
    </svg>
  );
}
