import { GraveStoneOrder, StoneBase } from './types'

export enum Route {
  ChooseType,
  Swag,
  ReviewOrder,
  Payment,
  OrderConfirmation,
}

export interface IState {
  route: Route
  order: GraveStoneOrder
  font: Font
  efterskrift: string[]
}


export enum Font {
  Helvetica,
  Antikva,
  Skriveskrift,
}

// state

export const originalState:Readonly<IState> = {
  route: Route.ChooseType,
  font: Font.Helvetica,
  efterskrift: <string[]>[
    `Tak for alt`,
    `Altid frejdig når du går`,
    `Hvil i fred`,
    `Elsket og savnet`,
    `Altid i vore hjerter`,
    `Gemt i vore hjerter`,
    `Minderne lever`,
    `Et sidste farvel`,
    `Mindes med kærlighed`,
    `Tak for gode minder`,
  ],
  order: <GraveStoneOrder>{
    // properties
    stoneBaseProduct: <StoneBase>{name: "nice blå granit", price: 750000, graveCategory: "plænesten"},
    graveCategory: "plænesten",
    stoneMaterial: "granite-red",

    // swag
    customTextLines: <string[]>[],
    "dead-d": "",
    "dead-m": "",
    "dead-y": "",
    "born-d": "",
    "born-m": "",
    "born-y": "",
    'extra-line-name': "no",
    'text-after': "",

    // product addons,
    // stoneStandSupport?: {},
    // decorationIllustration: "birds",
    // decorationFrame: 'round-corners',
  }
}

let _state:IState = {...originalState}


// functions

export function getState():Readonly<IState> {
  return _state
}

export interface IUpdateState {
  (newState:Partial<IState>): void
}

export function updateState (newState:Partial<IState>) {
  _state = <IState>{..._state, ...newState}
}



