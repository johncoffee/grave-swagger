import { IState, updateOrder } from './store.js'
import { html } from 'lit-html'

export function render (state:IState) {
  return html`
<div>
    Choose stone type (${state.order.graveCategory})    
    <div @click=${() => updateOrder({graveCategory: 'urnesten'})}>urnesten</div>
    <div @click=${() => updateOrder({graveCategory: 'plænesten'})}>plænesten</div>
</div>`
}