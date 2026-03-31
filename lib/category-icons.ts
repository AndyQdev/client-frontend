import {
  ShoppingBag, Package, Coffee, Sparkles, Shirt, Home, Dumbbell,
  Palette, Heart, Gem, Smartphone, Car, BookOpen, Music,
  UtensilsCrossed, Baby, Dog, Flower2, Camera, Scissors,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  ShoppingBag, Package, Coffee, Sparkles, Shirt, Home, Dumbbell,
  Palette, Heart, Gem, Smartphone, Car, BookOpen, Music,
  UtensilsCrossed, Baby, Dog, Flower2, Camera, Scissors,
}

const NAME_HINTS: Array<[RegExp, LucideIcon]> = [
  [/perfum|fragranc|belleza|cosmetic|beauty/i, Sparkles],
  [/ropa|moda|fashion|vestir|camis/i, Shirt],
  [/electr|tech|celular|comput|smart/i, Smartphone],
  [/hogar|casa|home|muebl|decor/i, Home],
  [/deport|sport|gym|fitness/i, Dumbbell],
  [/arte|art|pintur|creat/i, Palette],
  [/comida|aliment|abarrot|grocer/i, UtensilsCrossed],
  [/café|coffee|bebida/i, Coffee],
  [/salud|health|bienestar/i, Heart],
  [/joya|jewel|accesori/i, Gem],
  [/auto|car|vehic/i, Car],
  [/libro|book|lectur/i, BookOpen],
  [/music|instrument/i, Music],
  [/beb[eé]|baby|niñ/i, Baby],
  [/mascot|pet|animal/i, Dog],
  [/flor|plant|jardin/i, Flower2],
  [/foto|camera|fotograf/i, Camera],
  [/peluquer|barber|estilis/i, Scissors],
]

export function getCategoryIcon(name: string, iconName?: string | null): LucideIcon {
  if (iconName && ICON_MAP[iconName]) return ICON_MAP[iconName]

  for (const [pattern, icon] of NAME_HINTS) {
    if (pattern.test(name)) return icon
  }

  return Package
}
