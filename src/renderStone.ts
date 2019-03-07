import { html, render, TemplateResult } from '../node_modules/lit-html/lit-html.js'

type stringDict = {[k: string]:any}

const compTpl = (ln1:string, ln2:string, ln3:string, ln4:string) => html`    
    <div class="bg1" style="width: 440px; height:  360px; position: relative;">
        <div class="custom-text text-center custom-text--ln1">${ln1}</div>
        <div class="custom-text text-center custom-text--ln2">${ln2}</div>
        <div class="custom-text text-center custom-text--ln3">${ln3}</div>
        <div class="custom-text text-center custom-text--ln4">${ln4}</div>
    </div>
`


export function renderStone(texts:stringDict, element:Element) {
  render(compTpl.apply(compTpl, Object.values(texts) as any ), element)
}
