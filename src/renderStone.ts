import { html, render } from '../node_modules/lit-html/lit-html'

type stringDict = {[k: string]:any}

const compTpl = (vm:stringDict) => html`    
    <div class="bg1" style="width: 440px; height:  360px; position: relative;">
        <div class="custom-text text-center custom-text--ln1">${vm.ln1}</div>
        <div class="custom-text text-center custom-text--ln2">${vm.ln2}</div>
        <div class="custom-text text-center custom-text--ln3">${vm.ln3}</div>
        <div class="custom-text text-center custom-text--ln4">${vm.ln4}</div>
        <div class="custom-text text-center custom-text--ln5">${vm.ln5}</div>
    </div>
`

export function renderStone(vm:stringDict, element:Element) {
  render(compTpl(vm), element)
}
