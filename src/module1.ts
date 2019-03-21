import * as stoneVisual from './renderStone'
import * as lit from '../node_modules/lit-html/lit-html.js'
import * as progress from './progress'
import * as chooseFont from './chooseFont'
import * as chooseBase from './chooseBaseProduct'
import * as formDetails from './form'
import { getState, IState, IUpdateState, originalState, Route, addState, updateOrder } from './store'
import { fetchProductsByCategory } from './apiClient'

let selector:string

let _handle:number
export function dispatchStateChange(now?:boolean) {
  const t0 = new Date()

  if (now) {
    console.assert(!!document.querySelector(selector), `Failed to find '${selector}'`)
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

interface DispatchCallback {
  (state:IState, updateState:IUpdateState):void
}

export function dispatch(cb:DispatchCallback) {
  cb(getState(), addState)
  clearTimeout(_handle)
  _handle = setTimeout(() => dispatchStateChange(true),0)
}

export function dispatchUpdateShorthand (newState:Partial<IState>) {
  dispatch((st, updateState) => {
    updateState(newState)
  })
}

function render (state:IState) {

  if (state.showLoading) {
    return lit.html`Loading....`
  }

  console.assert(!!state.order.stoneProduct, "Render needs a stone product to be set")
  return lit.html`

<!--progress-->
${'' && progress.render(state)}
    
<!--product base type -->
${'' && chooseBase.render(state)}

<div class="grid-x grid-margin-x">
  <div class="cell small-12">
    ${chooseFont.render(state.fontProducts)}</div>
  <div class="cell medium-6">
      ${formDetails.render(state)}
  </div>
  <div class="cell medium-6">
      <div class="stone-render-container">${stoneVisual.render(state)}</div>
      <div class="margin-2 text-right">
          <button @click=${() => dispatchUpdateShorthand({route: Route.OrderConfirmation})} type="button" class="button success next-button">Næste</button>
      </div>
  </div>
</div>

    
<!-- end -->
`
}

function onMounted () {

  !async function () {
    // const products = await fetchProductsByCategory(18)

    const fontProducts = await fetchProductsByCategory(-1)
    addState({fontProducts})

    const stoneMaterialProducts = await fetchProductsByCategory(-2)

    addState({stoneMaterialProducts})
    console.assert(!!stoneMaterialProducts[0], 'missing a product')

    const efterskriftProducts = await fetchProductsByCategory(-3)
    addState({efterskriftProducts})

    addState({showLoading: false})
    updateOrder({stoneProduct: stoneMaterialProducts[0]})
  }()
}

export function mountRoot (_selector:string) {
  selector = _selector
  const el = document.querySelector(selector) as Element
  console.assert(!!el, "Didnt find element by "+_selector)
  lit.render(render(originalState), el)
  onMounted()
}

export function decorateGlobal(window:any) {
  window.mountSwagger = function(sel:string = '.grave-swagger-con') {
    mountRoot(sel)
  }
}

export function dispatchLoaded () {
  const evt:any = new Event('swaggerLoaded')
  evt.mountSwagger = function(sel:string = '.grave-swagger-con') {
    mountRoot(sel)
  }
  document.dispatchEvent(evt)

}
