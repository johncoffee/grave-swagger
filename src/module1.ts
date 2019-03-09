import { renderStone } from './renderStone'
import { html, render } from '../node_modules/lit-html/lit-html'
import { fetchProducts } from './apiClient'
import { GraveStoneOrder, StoneBase, PlænestenOrder, UrnestenOrder, Product } from './types.js'

export const __order:GraveStoneOrder = <GraveStoneOrder>{
  // properties
  stoneBaseProduct: <StoneBase>{name: "nice blå granit", price: 750000, graveCategory: "plænesten"},
  graveCategory: "plænesten",
  stoneMaterial: "granite-red",

  // swag
  customTextLines: <string[]>[],
  "dead-d": "",
  "dead-m": "",
  "dead-y": "",
  "born-d": "",
  "born-m": "",
  "born-y": "",
  'extra-line-name': "no",
  'text-after': "",

  // product addons,
  // stoneStandSupport?: {},
  // decorationIllustration: "birds",
  // decorationFrame: 'round-corners',
}

export async function init (el:Element) {
  const products = await fetchProducts()

  renderSwagger(el, __order)
}

let once=false

function renderSwagger (el:Element, order:GraveStoneOrder) {
  const mainTpl = html`
<div class="grid-x grave-swagger">
  <div class="cell small-6">
              <form class="grid-x grid-padding-x">
                  <div class="medium-6 cell">
                      <label>Navn linje 1 (max 20 tegn)
                          <input type="text" name="ln1">
                      </label>
                  </div>
                  <div class="medium-6 cell">
                      <label>Navn linje 2 (max 20 tegn)
                          <input type="text" name="ln2">
                      </label>
                  </div>

                  <div class="medium-12 cell">Født</div>
                  <div class="medium-3 cell auto">
                      <label>
                          <select name="born-d">
                              ${ new Array(31).fill(1).map((v,idx) => html`<option>${v + idx}</option>`) }                             
                          </select>
                      </label>
                  </div>
                  <div class="medium-3 cell auto">
                      <label>
                          <select name="born-m">
                              ${new Array(12).fill(1).map((v,idx) => html`<option>${v + idx}</option>`)}
                              
                          </select>
                      </label>
                  </div>
                  <div class="medium-6 cell auto">
                      <label>
                          <select name="born-y">
                              ${new Array(120).fill((new Date).getFullYear()-120+1).map((v,idx) => html`<option>${v + idx}</option>`)}
                              
                          </select>
                      </label>
                  </div>

                  <div class="medium-12 cell">Død</div>
                  <div class="medium-3 cell auto">
                      <label>
                          <select name="dead-d">
                              ${new Array(31).fill(1).map((v,idx) => html`<option>${v + idx}</option>`)}
                          </select>
                      </label>
                  </div>
                  <div class="medium-3 cell auto">
                      <label>
                          <select name="dead-m">
                              ${(new Array(31).fill(1).map((v,idx) => html`<option>${v + idx}</option>`))}                             
                          </select>
                      </label>
                  </div>
                  <div class="medium-6 cell auto">
                      <label>
                          <select name="dead-y">
                                ${new Array(120).fill((new Date).getFullYear()-120+1).map((v,idx) => html`<option>${v + idx}</option>`).reverse()}
                          </select>
                      </label>
                  </div>

                  <div class="cell small-12">
                      <label>Ønskes efterskrift
                          <select name="text-after">
                              <option selected></option>
                              <option>Tak for alt</option>
                              <option>Altid frejdig når du går</option>
                              <option>Hvil i fred</option>
                              <option>Elsket og savnet</option>
                              <option>Altid i vore hjerter</option>
                              <option>Gemt i vore hjerter</option>
                              <option>Minderne lever</option>
                              <option>Et sidste farvel</option>
                              <option>Mindes med kærlighed</option>
                              <option>Tak for gode minder</option>
                          </select>
                      </label>
                  </div>

                  <fieldset class="cell small-12">
                      <legend>Skal inskriptionen udføres så der senere er plads til et ekstra navn?</legend>
                      <label>
                          <input type="radio" name="extra-line-name" value="yes">
                          Ja
                      </label>
                      <label>
                          <input type="radio" name="extra-line-name" value="no">
                          Nej
                      </label>
                  </fieldset>
              </form>
  </div>
  <div class="cell small-6">
      <div class="stone-render-container"></div>

      <div class="margin-2 text-right">
          <button type="button" class="button success next-button">Næste</button>
      </div>
  </div>
</div>
`

  render(mainTpl, el)
  renderStone({
    grImage: '',
    ln1: order.customTextLines[0],
    ln2:  order.customTextLines[1],
    ln3: `★ ${order['dead-d']}. ${order['dead-m']}. ${order['dead-y']} ✝ ${order['born-d']}. ${order['born-m']}. ${order['born-y']}`,
    ln4: order['extra-line-name'] === 'yes' ? "" : order['text-after'],
    ln5: order['extra-line-name'] === 'yes' ? order['text-after'] : "",
  }, document.querySelector('.stone-render-container') as Element)

  if (!once) {
    once=true
    addListeners(order)
  }
}

function addListeners (order:GraveStoneOrder) {
  console.assert(!!document.querySelector('.grave-swagger'))

  Array.from(document.querySelectorAll('.next-button'))
    .forEach((el:Element) =>
      el.addEventListener('click', evt => (console.log("OK") !== undefined) || evt.stopPropagation())
    )

  Array.from(document.querySelectorAll('.grave-swagger'))
    .forEach((el:Element) => {

      el.addEventListener('mouseup', evt=>stateChanged())
      el.addEventListener('keyup', evt=>stateChanged())

      Array.from(el.querySelectorAll('select'))
        .forEach((el:Element) => el.addEventListener('change', evt=>stateChanged()))
    })

  const stateChanged = () => setTimeout(() => collect(document.querySelector('.grave-swagger') as Element, order),0)

  function collect (node:Element, order:GraveStoneOrder) {
    const form:any = {}
    Array.from(node.querySelectorAll('input[type=text], select, [type=radio]:checked'))
      .map((el:any) => [el.name, el.value])
      .forEach(([key, value]) => form[key] = value)

    order.customTextLines[0] = form.ln1
    order.customTextLines[1] = form.ln2

    ;(Object.keys(order) as any).forEach((k:keyof GraveStoneOrder) => {
      if (form[k] !== undefined) order[k] = form[k]
    })

    renderStone({
      grImage: '',
      ln1: order.customTextLines[0],
      ln2: order.customTextLines[1],
      ln3: `★ ${order['dead-d']}. ${order['dead-m']}. ${order['dead-y']} ✝ ${order['born-d']}. ${order['born-m']}. ${order['born-y']}`,
      ln4: order['extra-line-name'] === 'yes' ? "" : order['text-after'],
      ln5: order['extra-line-name'] === 'yes' ? order['text-after'] : "",
    }, document.querySelector('.stone-render-container') as Element)
  }

}
