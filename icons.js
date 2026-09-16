import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polyline } from 'react-native-svg';

const base = (size, color, strokeWidth = 1.8) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color,
  strokeWidth,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

export function GearIcon({ size = 24, color = '#0B7DFC' }) {
  return (
    <Svg {...base(size, color)}>
      <Circle cx="12" cy="12" r="3" />
      <Path d="M19.4 13a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V19a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 17.36a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.64 13a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.64 7a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 2.64a1.7 1.7 0 0 0 1-1.55V1a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.36 7a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" />
    </Svg>
  );
}

export function LinkIcon({ size = 24, color = '#0B7DFC' }) {
  return (
    <Svg {...base(size, color)}>
      <Path d="M9 15 15 9" />
      <Path d="M10.5 6.5 12 5a4 4 0 1 1 5.66 5.66l-1.5 1.5" />
      <Path d="M13.5 17.5 12 19a4 4 0 1 1-5.66-5.66l1.5-1.5" />
    </Svg>
  );
}

export function BarChartIcon({ size = 24, color = '#0B7DFC' }) {
  return (
    <Svg {...base(size, color)}>
      <Line x1="5" y1="20" x2="5" y2="13" />
      <Line x1="12" y1="20" x2="12" y2="8" />
      <Line x1="19" y1="20" x2="19" y2="4" />
    </Svg>
  );
}

export function DatabaseIcon({ size = 24, color = '#0B7DFC' }) {
  return (
    <Svg {...base(size, color)}>
      <Path d="M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3Z" />
      <Path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <Path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </Svg>
  );
}

export function TrendIcon({ size = 24, color = '#0B7DFC' }) {
  return (
    <Svg {...base(size, color)}>
      <Polyline points="3,17 9,11 13,15 21,6" />
      <Polyline points="14,6 21,6 21,13" />
    </Svg>
  );
}

export function BulbIcon({ size = 24, color = '#0B7DFC' }) {
  return (
    <Svg {...base(size, color)}>
      <Path d="M9 18h6" />
      <Path d="M10 22h4" />
      <Path d="M12 2a6 6 0 0 0-4 10.5c.7.6 1 1.2 1 2.5h6c0-1.3.3-1.9 1-2.5A6 6 0 0 0 12 2Z" />
    </Svg>
  );
}

export function HouseIcon({ size = 24, color = '#0B7DFC' }) {
  return (
    <Svg {...base(size, color)}>
      <Path d="M3 11 12 3l9 8" />
      <Path d="M5 10v10h14V10" />
      <Path d="M10 20v-6h4v6" />
    </Svg>
  );
}

export function TruckIcon({ size = 24, color = '#0B7DFC' }) {
  return (
    <Svg {...base(size, color)}>
      <Rect x="1" y="7" width="13" height="10" rx="1" />
      <Path d="M14 10h4l4 4v3h-8z" />
      <Circle cx="6" cy="19" r="1.6" />
      <Circle cx="17" cy="19" r="1.6" />
    </Svg>
  );
}

export function BuildingIcon({ size = 24, color = '#0B7DFC' }) {
  return (
    <Svg {...base(size, color)}>
      <Rect x="5" y="3" width="9" height="18" rx="1" />
      <Rect x="15" y="9" width="5" height="12" rx="1" />
      <Line x1="8" y1="7" x2="8" y2="7.01" />
      <Line x1="11" y1="7" x2="11" y2="7.01" />
      <Line x1="8" y1="11" x2="8" y2="11.01" />
      <Line x1="11" y1="11" x2="11" y2="11.01" />
      <Line x1="8" y1="15" x2="8" y2="15.01" />
      <Line x1="11" y1="15" x2="11" y2="15.01" />
    </Svg>
  );
}

export function UsersIcon({ size = 24, color = '#0B7DFC' }) {
  return (
    <Svg {...base(size, color)}>
      <Circle cx="9" cy="8" r="3.2" />
      <Path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <Path d="M16 5.2a3.2 3.2 0 0 1 0 6" />
      <Path d="M21 20c0-2.8-2-5.1-4.7-5.8" />
    </Svg>
  );
}

export function StoreIcon({ size = 24, color = '#0B7DFC' }) {
  return (
    <Svg {...base(size, color)}>
      <Path d="M3 9 4 4h16l1 5" />
      <Path d="M3 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
      <Path d="M5 9v11h14V9" />
      <Path d="M10 20v-6h4v6" />
    </Svg>
  );
}

export function LockIcon({ size = 18, color = '#FFFFFF' }) {
  return (
    <Svg {...base(size, color, 1.6)}>
      <Rect x="4" y="10" width="16" height="10" rx="2" />
      <Path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </Svg>
  );
}

export function ShieldIcon({ size = 18, color = '#FFFFFF' }) {
  return (
    <Svg {...base(size, color, 1.6)}>
      <Path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <Polyline points="9,12 11,14 15,10" />
    </Svg>
  );
}

export function ClockIcon({ size = 18, color = '#FFFFFF' }) {
  return (
    <Svg {...base(size, color, 1.6)}>
      <Circle cx="12" cy="12" r="9" />
      <Polyline points="12,7 12,12 16,14" />
    </Svg>
  );
}

export function CheckIcon({ size = 16, color = '#3B9EFF' }) {
  return (
    <Svg {...base(size, color, 2.2)}>
      <Polyline points="20,6 9,17 4,12" />
    </Svg>
  );
}
