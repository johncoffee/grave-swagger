import { html } from '../node_modules/lit-html/lit-html'
import { Font } from './store'
import { dispatchUpdateShorthand as upd } from './module1'
import { Product } from './apiClient'

export function render (fontProducts:Product[]) {
  console.assert(fontProducts.length > 0, "need fonts?")

  const problematic = fontProducts.filter(font => Font[font.name as any] === undefined)
  if (problematic.length > 0) {
    console.log("These fonts was mapped wrong")
    console.warn(problematic)
  }

  const choices = fontProducts.map(fp => <[Product, Font]>[fp as Product, Font[fp.name as any] as any])

  return html`
<div class="grid-x">
    <div class="cell small-12">
        Vælg skrift type   
    </div>
</div>
<form class="grid-x grid-margin-x">
    
    ${choices.map(([prod, fontEnum]) => 
                  html`<label class="cell shrink text-center" @click=${()=>upd({font:fontEnum }) }>
                         <img src="${prod.image}" style="border: 1px solid #aab"><br>
                         <input type="radio" name="font-type"> ${prod.name}
                       </label>`)}
 
</form>
    `
}