import { IState, updateOrder } from './store'
import {html} from '../node_modules/lit-html/lit-html.js'

export function render (state:IState) {
  return html`

<div class="grid-x">    
    ${state.stoneMaterialProducts.map(p => 
    html`<div class="cell medium-12" @click=${() => updateOrder({stoneProduct: p})}>
            <div><img src="${p.image}" width=100></div>
            <div>${p.name}</div> 
        </div>`)}    
</div>`
}