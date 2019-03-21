import { GraveStoneOrder, Product, } from './types'
import { dispatchUpdateShorthand as upd } from './module1'

export enum Route {
  ChooseType,
  Swag,
  ReviewOrder,
  Payment,
  OrderConfirmation,
}

export interface IState {
  showLoading: boolean
  route: Route
  order: GraveStoneOrder
  fontProducts: Product[]
  stoneMaterialProducts: Product[]
  font: Font
  efterskriftProducts: Product[]
}


export enum Font {
  Helvetica,
  Antikva,
  Skriveskrift,
  Bronze,
}

// state

export const originalState:Readonly<IState> = <IState>{
  showLoading: true,
  route: Route.ChooseType,
  font: Font.Helvetica,

  stoneMaterialProducts: [],
  fontProducts: [],

  efterskriftProducts: [],
  order: <GraveStoneOrder>{
    // properties
    graveCategory: "plænesten",

    stoneProduct: <Product>{
      name: 'Multicolor Poleret urnesten',
      image:'/images/Multicolor-Poleret-urnesten.jpg',
      price: '319900',
    },

    // swag
    customTextLines: <string[]>[
      'john julian',
      'hansen'
    ],
    "dead-d": "1",
    "dead-m": "2",
    "dead-y": "2012",
    "born-d": "15",
    "born-m": "12",
    "born-y": "1922",
    'extra-line-name': "no",

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

export function addState (newState:Partial<IState>) {
  _state = <IState>{..._state, ...newState}
}


// high level
export function updateOrder (newOrder:Partial<GraveStoneOrder>) {
  const order = {...(getState().order), ...newOrder}
  upd({order})
}



