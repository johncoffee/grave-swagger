import * as stone from './renderStone'
import * as lit from '../node_modules/lit-html/lit-html'
import { html } from '../node_modules/lit-html/lit-html'
import { GraveStoneOrder, } from './types'
import * as progress from './progress'
import * as chooseFont from './chooseFont'
import * as form from './form'
import { getState, IState, IUpdateState, originalState, Route, updateState } from './store'

let selector:string

let _handle:number
export function dispatchStateChange(now?:boolean) {
  const t0 = new Date()

  if (now) {
    lit.render(render(getState()), document.querySelector(selector) as Element)
  }
  else {
    clearTimeout(_handle)
    // const p = Promise.resolve(true).then(dispatchStateChange) // to cancel?
    _handle = setTimeout(() => dispatchStateChange(true),0)
  }

  const t1 = new Date()
  const d = t1.getTime() - t0.getTime()
  if (sessionStorage.debug) {
    console.log(`dispatchStateChange took ${d}`)
  }
}

interface Cb {
  (state:IState, updateState:IUpdateState):void
}

export function dispatch(cb:Cb) {
  cb(getState(), updateState)
  clearTimeout(_handle)
  _handle = setTimeout(() => dispatchStateChange(true),0)
}

export function dispatchUpdateShorthand (newState:Partial<IState>) {
  dispatch((st, updateState) => {
    updateState(newState)
  })
}


function setGraveCategory(graveCategory: GraveStoneOrder['graveCategory']) {
  const updatedOrder = {...getState().order, graveCategory}
  updateState({order: updatedOrder})
  dispatchStateChange()
}

function render (state:IState) {
  const order = state.order

  return html`
  <div class="grid-x">
      <div class="cell auto">${progress.render(state)}</div>
  </div>
  
    ${state.route === Route.ChooseType ?
    html`
<div>
    Choose stone type (${getState().order.graveCategory})
    
    <div @click=${{handleEvent: () => setGraveCategory('urnesten')}}>urnesten</div>
    <div @click=${{handleEvent: () => setGraveCategory('plænesten')}}>plænesten</div>
</div>` 
    : html`
<div class="grid-x grave-swagger">
  <div class="cell small-12">${chooseFont.render(state)}</div>
  <div class="cell small-6">
        ff
      ${form.render(state)}
  </div>
  <div class="cell small-6">
      <div class="stone-render-container">${stone.render(order)}</div>

      <div class="margin-2 text-right">
          <button type="button" class="button success next-button">Næste</button>
      </div>
  </div>
</div>
`}
    
<!-- end -->
`
}

export function init (_selector:string) {
  selector = _selector
  const el = document.querySelector(selector) as Element
  console.assert(!!el, "Didnt find element by "+_selector)
  lit.render(render(originalState), document.querySelector(selector) as Element)
}
