export interface Product {
  id: string
  name: string
  image: string
  price: string
  category: string
}

export interface GraveStoneOrder {
  // properties
  graveCategory: 'urnesten' | 'plænesten'

  stoneProduct: Product,
  fontProduct: Product,
  textAfterProduct?: Product,

  // swag
  customTextLines: string[]
  'dead-d': string
  'dead-m': string
  'dead-y': string
  'born-d': string
  'born-m': string
  'born-y': string
  'extra-line-name': 'yes'|'no'

  // product addons
  stoneStandSupport?: Product
  decorationIllustration?: 'birds' | 'tree'
  decorationFrame?: 'round-corners' | 'square'
}
