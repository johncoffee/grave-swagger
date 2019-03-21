import { html } from '../node_modules/lit-html/lit-html.js'

import { IState, Route } from './store'
import { dispatchUpdateShorthand as upd } from './module1'

export function render (state:IState) {
  return html`
<style>
.progress__tile--active {
    background: #214432; color: #fff;    
}
</style>
<div class="grid-x">
    <div @click=${() => upd({route: Route.ChooseType})}" 
      class=${'padding-2 cell auto ' + (state.route === Route.ChooseType ? `progress__tile--active` : '')}>
        <span>1 Vælg type</span>       
    </div>
    <div @click=${() => upd({route: Route.Swag})}"
      class=${'padding-2 cell auto ' + (state.route === Route.Swag ? `progress__tile--active` : '')}>
        2 Tilvælg swag      
    </div>
    <div @click=${() => upd({route: Route.ReviewOrder})}"
       class="cell auto padding-2">3 Gennemse ordre</div>
       
    <div class="cell auto padding-2">4 Betaling</div>
    <div class="cell auto padding-2">5 Ordrebekræftelse</div>
</div>
`
}

