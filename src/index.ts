import "./module1.js"
import { renderMain } from './module1.js'


// Side effects

;(window as any).mountSwagger = function(selector:string) {
  console.assert(!!document.querySelector(selector), `didnt find ${selector}`)
  renderMain(document.querySelector('.root-con') as Element)
}

function fetchProducts () {
  return [
    {id: 123, grImage: ""}
  ]
}
