export interface Product {
  name: string
  price: number
}

export interface StoneBase extends Product {
  graveCategory: 'urnesten' | 'plænesten'
}

export interface GraveStoneOrder {
  // properties
  stoneBaseProduct: StoneBase
  graveCategory: 'urnesten' | 'plænesten'
  stoneMaterial: 'granite-white' | 'granite-red'

  // swag
  customTextLines: string[]
  'dead-d': string
  'dead-m': string
  'dead-y': string
  'born-d': string
  'born-m': string
  'born-y': string
  'extra-line-name': 'yes'|'no'
  'text-after': string

  // product addons
  stoneStandSupport?: Product
  decorationIllustration?: 'birds' | 'tree'
  decorationFrame?: 'round-corners' | 'square'
}

export interface PlænestenOrder extends GraveStoneOrder {
  graveCategory: 'plænesten'
}

export interface UrnestenOrder extends GraveStoneOrder {
  graveCategory: 'urnesten'
}
