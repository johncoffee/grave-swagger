import { StoneBase, } from './types'

export async function fetchProducts() {

  const products:StoneBase[] = [
    {
      name: 'granit',
      graveCategory: 'plænesten',
      price: 80000
    },
    {
      name: 'granit / rød',
      graveCategory: 'plænesten',
      price: 100000
    },
  ]
  return products
}

