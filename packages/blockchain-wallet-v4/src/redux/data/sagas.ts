import algo from './algo/sagas'
import bch from './bch/sagas'
import btc from './btc/sagas'
import eth from './eth/sagas'
import stx from './stx/sagas'
import xlm from './xlm/sagas'

export default ({ api, networks }) => ({
  algo: algo({ api }),
  bch: bch({ api }),
  btc: btc({ api }),
  eth: eth({ api }),
  stx: stx(),
  xlm: xlm({ api, networks })
})
