import React from 'react';

/**
 * Reusable SVG V Shape component
 * Used for: intro overlay, background patterns, dividers
 */
export default function VShape({
  width = 200,
  height = 160,
  stroke = '#fff',
  strokeWidth = 3,
  fill = 'none',
  opacity = 1,
  pathRef = null,
  className = '',
}) {
  // V path: two lines meeting at the bottom center
  const d = `M ${width * 0.05} ${height * 0.05} L ${width * 0.5} ${height * 0.95} L ${width * 0.95} ${height * 0.05}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <path
        ref={pathRef}
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill}
      />
    </svg>
  );
}

/**
 * Large background V pattern (multiple stacked Vs)
 */
export function VBackgroundPattern({ color = '#fff', opacity = 0.04 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <svg
        viewBox="0 0 800 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[70vw]"
        style={{ opacity }}
      >
        {/* Main large V */}
        <path
          d="M 40 40 L 400 600 L 760 40"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner V (smaller) */}
        <path
          d="M 120 40 L 400 520 L 680 40"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
        {/* Innermost V */}
        <path
          d="M 200 40 L 400 440 L 600 40"
          stroke={color}
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

/**
 * V-shaped clip-path SVG divider between sections
 */
export function VDivider({ fromColor = '#ffffff', toColor = '#0b162c', flip = false }) {
  return (
    <div
      className="relative h-[100px] overflow-hidden z-[5] -mt-[1px]"
      style={{
        backgroundColor: toColor,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-full"
        style={{
          transform: flip ? 'scaleY(-1)' : 'none',
        }}
        fill={fromColor}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,0 L720,100 L1440,0 L1440,0 L0,0 Z" />
      </svg>
    </div>
  );
}

