'use client'

import { useId } from 'react'

interface GridPatternProps {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: string
  squares?: number[][]
  className?: string
}

export function GridPattern({
  width = 17,
  height = 17,
  x = -1,
  y = -1,
  strokeDasharray = '1 1',
  squares = [[0, 1]],
  className = '',
}: GridPatternProps) {
  const id = useId()

  return (
    <svg
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M ${width} 0 V ${height} H 0 V 0 H ${width}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {squares.map(([x, y], index) => (
        <rect
          key={index}
          width={width}
          height={height}
          x={x * width}
          y={y * height}
          className="fill-white/[0.05]"
        />
      ))}
    </svg>
  )
}
