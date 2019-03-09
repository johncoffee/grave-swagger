import { renderMain } from './module1'

// Side effects

const evt:any = new Event('swaggerLoaded')
evt.mountSwagger = function(selector:string) {
  console.assert(!!document.querySelector(selector), `didnt find ${selector}`)
  renderMain(document.querySelector('.root-con') as Element)
}
document.dispatchEvent(evt)
