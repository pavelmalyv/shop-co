const BASE_FONT_SIZE = 16;
const BREAKPOINTS = {
  xxl: 1328,
  xl: 1280,
  lg: 1024,
  md: 768,
};

export const getBreakpointsPx = (breakpoint: keyof typeof BREAKPOINTS) => {
  const htmlFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
  const scale = htmlFontSize / BASE_FONT_SIZE;
  return BREAKPOINTS[breakpoint] * scale;
};
