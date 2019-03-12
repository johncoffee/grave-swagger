import { init } from './module1'

// Side effects

const evt:any = new Event('swaggerLoaded')
evt.mountSwagger = function(selector:string) {
  const el:Element|null = document.querySelector(selector)
  console.assert(!!el, `didnt find ${selector}`)
  if (el) {
    init(el)
  }
}
document.dispatchEvent(evt)


// fetch inputs:

// products
// - convert to font selection component
