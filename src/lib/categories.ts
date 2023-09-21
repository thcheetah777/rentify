interface Category {
  name: string,
  slug: string,
  icon: string,
}

export const categories: Category[] = [
  {
    name: "Clothing",
    slug: "clothing",
    icon: "mdi:tshirt-crew-outline",
  },
  {
    name: "Sports",
    slug: "sports",
    icon: "mdi:tennis-ball-outline",
  },
  {
    name: "Kitchen",
    slug: "kitchen",
    icon: "mdi:blender-outline",
  },
  {
    name: "Outdoor",
    slug: "outdoor",
    icon: "mdi:tent",
  },
  {
    name: "Play",
    slug: "play",
    icon: "mdi:gamepad-variant-outline",
  },
  {
    name: "Electronic",
    slug: "electronic",
    icon: "mdi:television-classic",
  },
  {
    name: "Move",
    slug: "move",
    icon: "mdi:scooter",
  },
  {
    name: "Books",
    slug: "books",
    icon: "mdi:book-open-page-variant-outline"
  },
  {
    name: "Pet",
    slug: "pet",
    icon: "mdi:paw-outline"
  },
  {
    name: "Holiday",
    slug: "holiday",
    icon: "mdi:pine-tree-variant-outline"
  },
  {
    name: "Occassion",
    slug: "occassion",
    icon: "mdi:cake-variant-outline"
  },
  {
    name: "Costume",
    slug: "costume",
    icon: "mdi:drama-masks"
  },
  {
    name: "Music",
    slug: "music",
    icon: "mdi:piano"
  },
  {
    name: "Tools",
    slug: "tools",
    icon: "mdi:screwdriver"
  }
];
