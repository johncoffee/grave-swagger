import { html } from '../node_modules/lit-html/lit-html'
import { Font, IState } from './store'
import { dispatchUpdateShorthand as upd } from './module1'

export function render (state:IState) {
  return html`
<div class="grid-x"> 
    <div class="cell auto" @click=${()=>upd({font:Font.Helvetica }) }>${Font[Font.Helvetica]}</div>
    <div class="cell auto" @click=${()=>upd({font:Font.Skriveskrift }) }>${Font[Font.Skriveskrift]}</div>
    <div class="cell auto" @click=${()=>upd({font:Font.Antikva }) }>${Font[Font.Antikva]}</div>
    ${state.order.graveCategory === 'urnesten' ? 
      html`<div class="cell auto" @click=${()=>upd({font:Font.Bronze }) }>${Font[Font.Bronze]}</div>` : null}
</div>
    `
}