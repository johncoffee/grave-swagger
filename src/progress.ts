import {html} from '../node_modules/lit-html/lit-html'

import { IState, Route } from './store'
import { dispatch, dispatchUpdateShorthand as upd } from './module1'

function setRoute(route:Route) {
  upd({route})
}

export function render (state:IState) {
  return html`
<style>
.progress__tile--active {
    background: #214432; color: #fff;    
}
</style>
  <div class="grid-x">
      <div @click=${{handleEvent: () => setRoute(Route.ChooseType)}})" 
        class=${'padding-2 cell auto ' + (state.route === Route.ChooseType ? `progress__tile--active` : '')}>
          <span>1 Vælg type</span>       
      </div>
      <div @click=${{handleEvent: () => setRoute(Route.Swag)}})"
        class=${'padding-2 cell auto ' + (state.route === Route.Swag ? `progress__tile--active` : '')}>
          2 Tilvælg swag      
      </div>
      <div class="cell auto padding-2">3 Gennemse ordre</div>
      <div class="cell auto padding-2">4 Betaling</div>
      <div class="cell auto padding-2">5 Ordrebekræftelse</div>
  </div>
`
}

