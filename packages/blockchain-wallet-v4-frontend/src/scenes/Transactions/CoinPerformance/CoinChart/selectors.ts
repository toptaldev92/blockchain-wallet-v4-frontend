import { createDeepEqualSelector } from 'services/ReselectHelper'
import { lift, map } from 'ramda'
import { selectors } from 'data'

export const getData = createDeepEqualSelector(
  [
    selectors.core.settings.getCurrency,
    selectors.core.data.misc.getPriceIndexSeries,
    (state, ownProps) => ownProps.coin
  ],
  (currencyR, priceIndexSeriesDataR, coin) => {
    const currency = currencyR.getOrElse('USD')

    const transform = priceIndexSeriesData => ({
      data: map(d => [d.timestamp * 1000, d.price], priceIndexSeriesData),
      coin,
      time: 'week'
    })
    return {
      data: lift(transform)(priceIndexSeriesDataR),
      currency
    }
  }
)
