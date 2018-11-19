import { equals } from 'ramda'
import { createSelectorCreator, defaultMemoize } from 'reselect'

import * as bch from './bch'
import * as bitcoin from './btc'
import * as ethereum from './eth'
import * as xlm from './xlm'
import * as checks from './checks'

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, equals)

export { bch, bitcoin, ethereum, xlm, checks, createDeepEqualSelector }
