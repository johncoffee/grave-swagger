import * as stoneVisual from './renderStone'
import * as lit from '../node_modules/lit-html/lit-html.js'
import * as progress from './progress'
import * as chooseFont from './chooseFont'
import * as chooseBase from './chooseBaseProduct'
import * as formDetails from './form'
import { addState, getState, IState, IUpdateState, originalState, Route, updateOrder } from './store'
import { addToBasket, CategoryID, fetchProductsByCategory } from './apiClient'
import { GraveStoneOrder } from './types.js'

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

async function updateBasket (order:GraveStoneOrder) {
  // update basket

  console.log("putting font in basket....")
  await addToBasket(order.fontProduct.id)

  if (order.textAfterProduct) {
    console.log("extra-text in basket...")
    await addToBasket(order.textAfterProduct.id)
  }
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
    
    <div class="cell small-12" style="height: 20px;"></div>
   
    <div class="cell small-12">Oplysninger om den afdøde</div>
    
  <div class="cell medium-6">
      ${formDetails.render(state)}
  </div>
  <div class="cell medium-6">
      <div class="stone-render-container">${stoneVisual.render(state)}</div>     
  </div>
  <div class="cell small-12">
      <div class="margin-2 text-center">
          <button @click=${() => updateBasket(state.order)} type="button" class="button success next-button">
          Næste</button>
      </div>
  </div>
</div>

    
<!-- end -->
`
}

type Options = {
  stoneProductID: number
  stoneCategory: CategoryID
}

async function onMounted () {
    const searchParams = new Map<string,string>(
      location.search.replace(/^\?/,'')
        .split('&')
        .map(v => v.split('=') as [string, string])
        .filter(([k]) => k)
    )
    // const products = await fetchProductsByCategory(18)
    const opt = <Options>{
      // stoneProductID: 118,
      // stoneCategory: CategoryID.Plaenesten
      stoneProductID: parseInt(searchParams.get('stone_product_id') || sessionStorage.stone_product_id),
      stoneCategory: CategoryID.Urnesten
    }

    // const basketItems = await fetchBasketProducts()
    // console.debug("baskt",basketItems)
    const fontProducts = await fetchProductsByCategory(CategoryID.Skrifttype)
    const efterskriftProducts = await fetchProductsByCategory(CategoryID.Eftertekst)
    const stoneMaterialProducts = await fetchProductsByCategory(opt.stoneCategory)

    if (fontProducts.length === 0) console.warn('missing font products on initialization')
    if (efterskriftProducts.length === 0) console.warn('missing efterskrift products on initialization')
    if (stoneMaterialProducts.length === 0) console.warn('missing stone products on initialization')

    addState({
      efterskriftProducts,
      fontProducts,
      stoneMaterialProducts,
      showLoading: false,
    })

    const p = stoneMaterialProducts.find(st => st.id === opt.stoneProductID)
    console.assert(!!p, "did not find product by id "+opt.stoneProductID + ' in list of' + stoneMaterialProducts.length)
    updateOrder({
      stoneProduct: stoneMaterialProducts.find(st => st.id === opt.stoneProductID)
    })
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

export function dispatchLoaded (document:EventTarget) {
  const evt:any = new Event('swaggerLoaded')
  evt.mountSwagger = function(sel:string = '.grave-swagger-con') {
    mountRoot(sel)
  }
  document.dispatchEvent(evt)

}
