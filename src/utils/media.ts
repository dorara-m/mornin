type ScreenType = "desktop" | "tablet" | "phone";

const sizes: { [key in ScreenType]: number } = {
  desktop: 1024,
  tablet: 768,
  phone: 560,
};

export const media = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
  (acc, key) => {
    acc[key] = (style: String) => {
      return `@media (min-width: ${sizes[key]}px) { ${style} }`;
    };
    return acc;
  },
  {} as { [key in ScreenType]: Function }
);
