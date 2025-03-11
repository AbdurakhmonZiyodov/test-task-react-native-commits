export const COLORS = {
  dark: '#000000',
  black: '#18181B',
  black2: '#262626',
  black3: '#656565',
  white: '#FFFFFF',
  white2: '#CBC8C8',
  darkwhite: '#C7C7C7',
  orange: '#FF3D00',
  gray: '#9DB2CE',
  error: '#FB3F1C',
};

// hex's length should be 6 (#000000)
export const addAlpha = (hex: string, alpha: number) =>
  `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, '0')}`;

export const hexToRgb = (hex: string): [number, number, number] => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
};
