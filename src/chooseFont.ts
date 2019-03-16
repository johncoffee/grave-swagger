import { html } from '../node_modules/lit-html/lit-html'
import { Font, IState } from './store'
import { dispatchUpdateShorthand as upd } from './module1'

export function render (state:IState) {
  return html` 
    <div @click=${{handleEvent: () =>upd({font:Font.Helvetica})}}>Helvetica</div>
    <div @click=${{handleEvent: () =>upd({font:Font.Antikva})}}>Antikva</div>
    `
}