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
    function updateView () {
      collect(el)
    }

    el.addEventListener('mouseup', evt=>updateView())
    el.addEventListener('keyup', evt=>updateView())

    Array.from(el.querySelectorAll('select'))
      .forEach((el:Element) => el.addEventListener('change', evt=>updateView()))
  })

function collect (node:Element) {
  Array.from(node.querySelectorAll('input'))
    .forEach((el:HTMLInputElement) => console.log(`${el.name}: ${el.value}`))
}
