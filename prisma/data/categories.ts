type Category = {
  name: string;
  parentId?: number;
  isGroup?: boolean;
};

export const categories: Category[] = [
  { name: 'Computer components' }, // 1
  { name: 'Computer & Laptops' }, // 2
  { name: 'Monitors & TVs' }, // 3
  { name: 'Periphery' }, // 4
  { name: 'Console gaming' }, // 5
  { name: 'Network equipment' }, // 6
  { name: 'Services & Software' }, // 7
  { name: 'Other electronics' }, // 8

  { name: 'Main Components', parentId: 1, isGroup: true }, // 9
  { name: 'Assembly accessories', parentId: 1, isGroup: true }, // 10
  { name: 'Computers', parentId: 2, isGroup: true }, // 11
  { name: 'Laptops', parentId: 2, isGroup: true }, // 12
  { name: 'Monitors', parentId: 3, isGroup: true }, // 13
  { name: 'TVs', parentId: 3, isGroup: true }, // 14
  { name: 'Accessories for monitors', parentId: 3, isGroup: true }, // 15
  { name: 'Manipulators & accessories', parentId: 4, isGroup: true }, // 16
  { name: 'Audio / video equipment', parentId: 4, isGroup: true }, // 17
  { name: 'Stationary', parentId: 5, isGroup: true }, // 18
  { name: 'Portable', parentId: 5, isGroup: true }, // 19
  { name: 'Games', parentId: 5, isGroup: true }, // 20
  {
    name: 'Peripherals and accessories for consoles',
    parentId: 5,
    isGroup: true,
  }, // 21
  { name: 'Network devices', parentId: 6, isGroup: true }, // 22
  { name: 'Services', parentId: 7, isGroup: true }, // 23
  { name: 'Software', parentId: 7, isGroup: true }, // 24

  { name: 'Processors', parentId: 9 },
  { name: 'Graphics cards', parentId: 9 },
  { name: 'Motherboards', parentId: 9 },
  { name: 'RAM', parentId: 9 },
  { name: 'SSD drives', parentId: 9 },
  { name: 'HDD drives', parentId: 9 },
  { name: 'Power supplies', parentId: 9 },
  { name: 'Cases', parentId: 9 },
  { name: 'Air cooling for CPUs', parentId: 9 },
  { name: 'Water cooling for CPUs', parentId: 9 },
  { name: 'Sound cards', parentId: 9 },
  { name: 'Network cards', parentId: 9 },
  { name: 'Case fans', parentId: 10 },
  { name: 'Holders for video cards', parentId: 10 },
  { name: 'Thermal paste', parentId: 10 },
  { name: 'Thermal pads', parentId: 10 },

  { name: 'PCs for AAA games', parentId: 11 },
  { name: 'PC for eSports', parentId: 11 },
  { name: 'PC for 4K gaming', parentId: 11 },
  { name: 'Laptops for AAA games', parentId: 12 },
  { name: 'Laptops for eSports', parentId: 12 },
  { name: 'Laptops for 4K gaming', parentId: 12 },

  { name: 'MSI', parentId: 13 },
  { name: 'Samsung', parentId: 13 },
  { name: 'Acer', parentId: 13 },
  { name: 'Gigabyte', parentId: 13 },
  { name: 'Asus', parentId: 13 },
  { name: 'Quad HD 2K (2560x1440)', parentId: 13 },
  { name: 'Ultra HD 4K (3840x2160)', parentId: 13 },
  { name: 'For gaming', parentId: 13 },
  { name: 'OLED monitors', parentId: 13 },
  { name: '144 Hz monitors', parentId: 13 },
  { name: 'Curved monitors', parentId: 13 },

  { name: 'QLED', parentId: 14 },
  { name: '4K', parentId: 14 },
  { name: 'WI-Fi', parentId: 14 },

  { name: 'Cables & adapters', parentId: 15 },
  { name: 'Brackets & stands', parentId: 15 },
  { name: 'Cleaning products', parentId: 15 },

  { name: 'Mice', parentId: 16 },
  { name: 'Keyboards', parentId: 16 },
  { name: 'Mousepads', parentId: 16 },

  { name: 'Headphones', parentId: 17 },
  { name: 'Speaker systems', parentId: 17 },
  { name: 'Microphones', parentId: 17 },
  { name: 'Webcams', parentId: 17 },

  { name: 'PlayStation', parentId: 18 },
  { name: 'Xbox', parentId: 18 },
  { name: 'Nintendo', parentId: 19 },
  { name: 'SteamDeck', parentId: 19 },
  { name: 'Games for Playstation', parentId: 20 },
  { name: 'Games for Xbox', parentId: 20 },
  { name: 'Games for Nintendo', parentId: 20 },
  { name: 'Gamepads', parentId: 21 },
  { name: 'VR', parentId: 21 },
  { name: 'Accessories for consoles', parentId: 21 },

  { name: 'Routers', parentId: 22 },
  { name: 'Switches', parentId: 22 },
  { name: 'Network adapters', parentId: 22 },

  { name: 'Upgrading and installing components', parentId: 23 },
  { name: 'PC / Laptop cleaning', parentId: 23 },
  { name: 'Software installation and data transfer', parentId: 23 },
  {
    name: 'Replacing thermal paste and cleaning the cooling system',
    parentId: 23,
  },
  { name: 'Cable routing inside the PC case', parentId: 23 },

  { name: 'Antivirus', parentId: 24 },
  { name: 'Operating system', parentId: 24 },
  { name: 'Office products', parentId: 24 },
];
