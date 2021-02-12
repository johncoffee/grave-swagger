import { html } from '../node_modules/lit-html/lit-html'
import { unsafeHTML } from '../node_modules/lit-html/directives/unsafe-html'
import { getState, IState } from './store'
import { dispatch, } from './module1'
import { GraveStoneOrder } from './types'

const inputField = new Map<string, Function>()
inputField.set('ln1', (val:string, order:GraveStoneOrder) => order.customTextLines[0] = val)
inputField.set('ln2', (val:string, order:GraveStoneOrder) => order.customTextLines[1] = val)

const textField = new Map<string, Function>()
textField.set('born-d', (val:string, order:GraveStoneOrder) => order['born-d'] = val)
textField.set('born-m', (val:string, order:GraveStoneOrder) => order['born-m'] = val)
textField.set('born-y', (val:string, order:GraveStoneOrder) => order['born-y'] = val)
textField.set('dead-d', (val:string, order:GraveStoneOrder) => order['dead-d'] = val)
textField.set('dead-m', (val:string, order:GraveStoneOrder) => order['dead-m'] = val)
textField.set('dead-y', (val:string, order:GraveStoneOrder) => order['dead-y'] = val)
textField.set('extra-line-name', (val:any, order:GraveStoneOrder) => order['extra-line-name'] = val)
textField.set('text-after', (val:string, order:GraveStoneOrder) => order.textAfterProduct = getState().efterskriftProducts.find(p => p.name === val))

function changeHandler (evt: Event) {
  const el = evt.target as HTMLInputElement
  const value:string = el.value
  const cb = textField.get(el.name)
  if (cb) {
    dispatch((currentState, updateState) => {
      const order = currentState.order
      cb(value, order)
      updateState({order})
    })
  }
}

function inputHandler (evt: Event) {
  const el = evt.target as HTMLInputElement
  const value:string = el.value
  const cb = inputField.get(el.name)
  if (cb) {
    setTimeout(() =>
      dispatch((currentState, updateState) => {
        const order = currentState.order
        cb(value, order)
        updateState({order})
      })
    ,0)
  }
}

export function render (state: IState) {
  return html`
<form class="grid-x grid-margin-x" @change=${changeHandler} @input=${inputHandler}>
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
  <div class="medium-4 cell auto">
  <label>
    <select name="born-d">
    <option selected></option>
      ${new Array(31).fill(1).map((v, idx) => html`<option>${v + idx}</option>`)}                             
      </select>
    </label>
  </div>
  <div class="medium-4 cell auto">
     <label>
    <select name="born-m">
      <option selected></option>
      ${new Array(12).fill(1).map((v, idx) => html`<option>${v + idx}</option>`)}
    </select>
    </label>
  </div>
  <div class="medium-4 cell auto">
    <label>
    <select name="born-y">
      <option selected></option>
      ${new Array(120).fill((new Date).getFullYear() - 120 + 1).map((v, idx) => html`<option>${v + idx}</option>`)}
    </select>
    </label>
  </div>

    <div class="medium-12 cell">Død</div>
  <div class="medium-4 cell auto">
    <label>
      <select name="dead-d">
        <option selected></option>
        ${new Array(31).fill(1).map((v, idx) => html`<option>${v + idx}</option>`)}
      </select>
    </label>
  </div>
  <div class="medium-4 cell auto">
    <label>
    <select name="dead-m">
      <option selected></option>
      ${ unsafeHTML(new Array(31).fill(1).map((v, idx) => `<option>${v + idx}</option>`).join('')) }                             
    </select>
    </label>
  </div>  
  <div class="medium-4 cell auto">
    <label>
      <select name="dead-y">
        <option selected></option>
        ${ unsafeHTML(new Array(120).fill((new Date).getFullYear() - 120 + 1).map((v, idx) => `<option>${v + idx}</option>`).reverse().join('') ) }
      </select>
    </label>
  </div>

  <div class="cell small-12">
    <label>Ønskes efterskrift <strong>kr. ${state.efterskriftProducts.filter((v,idx)=>idx===0).map(p => p.price).find(p => !!p)}</strong>
    <select name="text-after">
      <option selected value="">(ingen)</option>
      ${state.efterskriftProducts.map(p => html`<option value="${p.name}">${p.name}</option>`)}
    </select>
  </label>
  </div>

  <div class="cell small-12">
    Skal inskriptionen udføres så der senere er plads til et ekstra navn?
  </div>
  <div class="cell shrink">
      <label>
        <input ?checked=${state.order['extra-line-name'] === 'yes'} type="radio" name="extra-line-name" value="yes">
        Ja
      </label>
  </div>
  <div class="cell auto">     
      <label>
        <input ?checked=${state.order['extra-line-name'] === 'no'} type="radio" name="extra-line-name" value="no">
        Nej
    </label>
  </div>
</form>
`}