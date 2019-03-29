import { decorateGlobal, dispatchLoaded } from './module1'

// here we provide access to the swagger in two ways:
decorateGlobal(window)
dispatchLoaded(document)
