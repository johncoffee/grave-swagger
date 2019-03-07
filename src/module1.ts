import { renderStone } from './renderStone.js'

console.log("hi from module")
export const NICE = 42

type Customer = {
  name: string
  address: string
  address2: string
  postal: string
  city: string
}
type OrderItem = {
  id: string
  name: string
  priceCent: number
}
type TombStoneProduct = {
  name: string,
}

const webshopInputFixturesProducts = {
}



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
