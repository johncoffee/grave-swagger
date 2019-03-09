import { renderStone } from './renderStone'
import { html, render } from '../node_modules/lit-html/lit-html'

function fetchProducts () {
  return [
    {id: 123, grImage: ""}
  ]
}

export function renderMain (el:Element) {
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
  addListeners()
}

function addListeners () {
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

  const stateChanged = () => setTimeout(() => collect(document.querySelector('.grave-swagger') as Element),0)

  function collect (node:Element) {
    const state:any = {}
    Array.from(node.querySelectorAll('input[type=text], select, [type=radio]:checked'))
      .forEach((el:any) => {
        state[el.name] = el.value
      })

    console.debug(state)
    const s = state
    renderStone({
      ln1: state.ln1,
      ln2: state.ln2,
      ln3: `★ ${s['dead-d']}. ${s['dead-m']}. ${s['dead-y']} ✝ ${s['born-d']}. ${s['born-m']}. ${s['born-y']}`,
      ln4: state['extra-line-name'] === 'yes' ? "" : state['text-after'],
      ln5: state['extra-line-name'] === 'yes' ? state['text-after'] : "",
    }, document.querySelector('.stone-render-container') as Element)
  }

}
