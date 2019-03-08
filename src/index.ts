import "./module1.js"
import { renderMain } from './module1.js'


// Side effects

console.assert(!!document.querySelector('.root-con'), "missing root el")
renderMain(document.querySelector('.root-con') as Element)


function fetchProducts () {
  return [
    {id: 123, grImage: ""}
  ]
}
