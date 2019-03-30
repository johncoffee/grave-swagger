import { html } from '../node_modules/lit-html/lit-html'
import { Product } from './apiClient'
import { updateOrder } from './store.js'

export function render (fontProducts:Product[]) {
  return html`
<div class="grid-x">
    <div class="cell small-12">
        Vælg skrift type   
    </div>
</div>
<form class="grid-x grid-margin-x">
    ${fontProducts.map(font => 
                  html`<label class="cell shrink text-center" @click=${()=>updateOrder({fontProduct: font}) }>
                         <img src="${font.image}" style="border: 1px solid #aab"><br>
                         <input type="radio" name="font-type"> ${font.name}
                       </label>`)}
 
</form>
    `
}