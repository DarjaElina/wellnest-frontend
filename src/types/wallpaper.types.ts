type WallpaperType = {
  name: "sky" | "river" | "trees" | "rain" | "nature" | "sea";
  url: string;
};

export const wallpapers: WallpaperType[] = [
  {
    name: "sky",
    url: "/assets/bg/home-bg-sky.avif",
  },
  {
    name: "river",
    url: "/assets/bg/home-bg-river.avif",
  },
  {
    name: "nature",
    url: "/assets/bg/home-bg-nature.avif",
  },
  {
    name: "sea",
    url: "/assets/bg/home-bg-sea.avif",
  },
  {
    name: "trees",
    url: "/assets/bg/home-bg-trees.avif",
  },
  {
    name: "rain",
    url: "/assets/bg/home-bg-rain.avif",
  },
];
