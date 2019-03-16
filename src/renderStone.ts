import { html, } from '../node_modules/lit-html/lit-html'
import { GraveStoneOrder } from './types.js'

type Lines = {
  ln1: string
  ln2: string
  ln3: string
  ln4: string
  ln5: string
  bg: string
}

export function render (order:GraveStoneOrder) {
  const vm:Lines = {
    ln1: order.customTextLines[0],
    ln2:  order.customTextLines[1],
    ln3: `★ ${order['dead-d']}. ${order['dead-m']}. ${order['dead-y']} ✝ ${order['born-d']}. ${order['born-m']}. ${order['born-y']}`,
    ln4: order['extra-line-name'] === 'yes' ? "" : order['text-after'],
    ln5: order['extra-line-name'] === 'yes' ? order['text-after'] : "",
    bg: 'http://www.nettogravsten.dk/Files/Billeder/Nettogravsten/Pl%C3%A6nesten/Graa-Bohus-50.jpg',
  }
  return html`    
    <div style="width: 440px; height:  360px; position: relative; background-image: url(${vm.bg})">
        <div class="custom-text text-center custom-text--ln1">${vm.ln1}</div>
        <div class="custom-text text-center custom-text--ln2">${vm.ln2}</div>
        <div class="custom-text text-center custom-text--ln3">${vm.ln3}</div>
        <div class="custom-text text-center custom-text--ln4">${vm.ln4}</div>
        <div class="custom-text text-center custom-text--ln5">${vm.ln5}</div>
    </div>
`}
