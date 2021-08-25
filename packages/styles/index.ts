export const colors = {
  black: "#222222",
  white: "#FAFAFA",
} as const;

export function getColors(color: keyof typeof colors) {
  return colors[color];
}
