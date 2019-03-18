import { mountRoot } from './module1'

// Side effects

const evt:any = new Event('swaggerLoaded')
evt.mountSwagger = function(sel:string = '.grave-swagger-con') {
  mountRoot(sel)
}
document.dispatchEvent(evt)


// fetch inputs:

// products
// - convert to font selection component
