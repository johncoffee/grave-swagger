import { init } from './module1'
import * as lit from '../node_modules/lit-html/lit-html'

// Side effects

const evt:any = new Event('swaggerLoaded')
evt.mountSwagger = function(sel:string = '.grave-swagger-con') {
  init(sel)
}
document.dispatchEvent(evt)


// fetch inputs:

// products
// - convert to font selection component
