import { html } from '../node_modules/lit-html/lit-html'
import { unsafeHTML } from '../node_modules/lit-html/directives/unsafe-html'
import { IState } from './store'
import { dispatch, } from './module1'
import { GraveStoneOrder } from './types.js'

function inputHandler1 (event:KeyboardEvent) {
  setTimeout(() => {
    const el:HTMLInputElement = event.target as any
    dispatch((currentState, updateState) => {
      const order = currentState.order
      order.customTextLines[0] = el.value
      updateState({order})
    })
  }, 10)
}

function inputHandler2 (event:KeyboardEvent) {
  setTimeout(() => {
    const el:HTMLInputElement = event.target as any
    dispatch((currentState, updateState) => {
      const order = currentState.order
      order.customTextLines[0] = el.value
      updateState({order})
    })
  }, 10)
}

const m = new Map<string, Function>()
m.set('born-d', (val:string, order:GraveStoneOrder) => order['born-d'] = val)
m.set('born-m', (val:string, order:GraveStoneOrder) => order['born-m'] = val)
m.set('born-y', (val:string, order:GraveStoneOrder) => order['born-y'] = val)
m.set('dead-d', (val:string, order:GraveStoneOrder) => order['dead-d'] = val)
m.set('dead-m', (val:string, order:GraveStoneOrder) => order['dead-m'] = val)
m.set('dead-y', (val:string, order:GraveStoneOrder) => order['dead-y'] = val)
m.set('text-after', (val:string, order:GraveStoneOrder) => order['text-after'] = val)
m.set('extra-line-name', (val:any, order:GraveStoneOrder) => order['extra-line-name'] = val)

function stuffchanged (evt: Event) {
  const el = evt.target as HTMLInputElement
  const f = m.get(el.name)
  if (f) {
    dispatch((currentState, updateState) => {
      const order = currentState.order
      f(el.value, order)
      updateState({order})
    })
  }
}

export function render (state: IState) {
  return html`
<form class="grid-x grid-margin-x" @change=${stuffchanged}>
  <div class="medium-6 cell">
    <label>Navn linje 1 (max 20 tegn)
  <input type="text" name="ln1" @keydown=${inputHandler1} @change=${inputHandler1}>
    </label>
    </div>
    <div class="medium-6 cell">
    <label>Navn linje 2 (max 20 tegn)
  <input type="text" name="ln2" @keydown=${inputHandler2} @change=${inputHandler2}>
    </label>
    </div>

    <div class="medium-12 cell">Født</div>
    <div class="medium-3 cell auto">
  <label>
    <select name="born-d">
    ${new Array(31).fill(1).map((v, idx) => html`<option>${v + idx}</option>`)}                             
    </select>
    </label>
    </div>
    <div class="medium-3 cell auto">
  <label>
    <select name="born-m">
    ${new Array(12).fill(1).map((v, idx) => html`<option>${v + idx}</option>`)}

    </select>
    </label>
    </div>
    <div class="medium-6 cell auto">
  <label>
    <select name="born-y">
    ${new Array(120).fill((new Date).getFullYear() - 120 + 1).map((v, idx) => html`<option>${v + idx}</option>`)}

    </select>
    </label>
    </div>

    <div class="medium-12 cell">Død</div>
    <div class="medium-3 cell auto">
  <label>
    <select name="dead-d">
    ${new Array(31).fill(1).map((v, idx) => html`<option>${v + idx}</option>`)}
    </select>
  </label>
  </div>
    
  <div class="medium-3 cell auto">
    <label>
    <select name="dead-m">
        ${(new Array(31).fill(1).map((v, idx) => html`<option>${v + idx}</option>`))}                             
    </select>
    </label>
  </div>
    
    <div class="medium-6 cell auto">
    <label>
      <select name="dead-y">
          ${unsafeHTML(`${(new Array(120)).fill((new Date).getFullYear() - 120 + 1).map((v, idx) => `<option>${v + idx}</option>`).reverse().join('')}`)}
      </select>
    </label>
    </div>

    <div class="cell small-12">
    <label>Ønskes efterskrift
    <select name="text-after">
      ${state.efterskrift.map(txt => html`<option>${txt}</option>`)}
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
`}