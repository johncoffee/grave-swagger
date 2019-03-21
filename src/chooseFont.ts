import { html } from '../node_modules/lit-html/lit-html'
import { Font } from './store'
import { dispatchUpdateShorthand as upd } from './module1'
import { Product } from './types'

export function render (fontProducts:Product[]) {
  console.assert(fontProducts.length > 0, "need fonts?")

  const choices = fontProducts.map(fp => <[Product, Font]>[fp as Product, Font[fp.name as any] as any])

  return html`
<div class="grid-x">
    ${choices.map(([prod, fontEnum]) => 
                  html`<div class="cell auto text-center" @click=${()=>upd({font:fontEnum }) }>
                         <img src="${prod.image}"><br>
                         ${prod.name}
                       </div>`)}
 
</div>
    `
}