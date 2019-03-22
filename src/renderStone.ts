import { html, } from '../node_modules/lit-html/lit-html.js'
import { GraveStoneOrder} from './types'
import { Font, IState } from './store'
import { Product } from './apiClient.js'

export function render (state:IState) {
  const order:GraveStoneOrder = state.order
  const offset:number = (order['extra-line-name'] === 'yes') ? 50 : 0
  const vm = {
    ln1: order.customTextLines[0],
    ln2:  order.customTextLines[1],
    ln3: `★ ${order['dead-d']}. ${order['dead-m']}. ${order['dead-y']} ✝ ${order['born-d']}. ${order['born-m']}. ${order['born-y']}`,
    ln4: (order.textAfterProduct) ? order.textAfterProduct.name : "",
  }
  const fonts = new Map<Font, string>([
    [Font.Helvetica, 'HelveticaMediumStenRegular'],
    [Font.Antikva, 'AntikvaCBRegular'],
  ])

  return html`    
    <div
    class='bg' 
    style="background-image: url('${order.stoneProduct.image}');
           font-family: '${fonts.get(state.font) || "comic sans ms"}'">
        <div class="custom-text text-center custom-text--ln1">${vm.ln1}</div>
        <div class="custom-text text-center custom-text--ln2">${vm.ln2}</div>
        <div class="custom-text text-center custom-text--ln3">${vm.ln3}</div>
        <div class="custom-text text-center custom-text--ln4" style="padding-top: ${offset}px">${vm.ln4}</div>     
    </div>
`}
