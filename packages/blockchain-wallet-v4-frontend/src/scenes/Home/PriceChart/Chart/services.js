import * as Currency from 'blockchain-wallet-v4/src/exchange/currency'
import { Color } from 'blockchain-info-components'
import { head, last, map, sort } from 'ramda'
import ReactHighcharts from 'react-highcharts'

export const getConfig = (start, interval, coin, currency, data, decimals) => ({
  chart: {
    height: 295,
    type: 'area',
    spacing: [25, 0, 0, 0],
    data: {
      dateFormat: 'YYYY/mm/dd'
    }
  },
  title: {
    text: null
  },
  yAxis: {
    visible: false,
    minPadding: 0.1,
    maxPadding: 0,
    gridLineColor: 'transparent'
  },
  xAxis: {
    visible: false,
    minPadding: 0,
    maxPadding: 0,
    type: 'datetime',
    gridLineColor: 'transparent'
  },
  plotOptions: {
    series: {
      pointStart: start,
      pointInterval: interval,
      animation: false
    },
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [
            0,
            ReactHighcharts.Highcharts.Color(Color(coin.toLowerCase()))
              .setOpacity(0.7)
              .get('rgba')
          ],
          [
            1,
            ReactHighcharts.Highcharts.Color(Color(coin.toLowerCase()))
              .setOpacity(0.1)
              .get('rgba')
          ]
        ]
      },
      marker: {
        radius: 0
      },
      lineWidth: 2,
      color: Color(coin.toLowerCase()),
      states: {
        hover: {
          lineWidth: 2
        }
      },
      threshold: null,
      dataGrouping: { enabled: false }
    },
    line: {
      marker: {
        enabled: false
      }
    }
  },
  tooltip: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 4,
    valueDecimals: 2,
    backgroundColor: Color(coin.toLowerCase()),
    shadow: false,
    padding: 4,
    style: {
      color: Color('white')
    },
    xDateFormat: '%b %d, %Y',
    useHTML: true,
    pointFormatter: function () {
      return currency + Currency.formatFiat(this.y, decimals)
    }
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  series: [
    {
      name: 'Price',
      data: data
    }
  ]
})

const getPrices = map(last)

const getMinMax = data => {
  const lowToHigh = (a, b) => a - b
  const prices = getPrices(data)
  const sorted = sort(lowToHigh, prices)
  const min = head(sorted)
  const max = last(sorted)
  return [min, max]
}

const getMinMaxIndex = data => {
  const prices = getPrices(data)
  const [min, max] = getMinMax(data)
  const minIndex = prices.indexOf(min)
  const maxIndex = prices.indexOf(max)
  return [minIndex, maxIndex]
}

const renderPoint = (chart, pointData, isPointGreaterThanCounterPoint) => {
  const [point, value] = pointData
  const xPadding = isPointGreaterThanCounterPoint ? -50 : 5

  chart.renderer
    .text(
      `<div class='min-max'>${value}</div>`,
      point.plotX + chart.plotLeft + xPadding,
      point.plotY + chart.plotTop - 10,
      true
    )
    .attr({
      zIndex: 5
    })
    .add()
}

export const renderMinMax = (chart, { currency, data, decimals }) => {
  const [min, max] = getMinMax(data)
  const [minIndex, maxIndex] = getMinMaxIndex(data)

  const maxPoint = [
    chart.series[0].data[maxIndex],
    currency + Currency.formatFiat(max, decimals)
  ]
  const minPoint = [
    chart.series[0].data[minIndex],
    currency + Currency.formatFiat(min, decimals)
  ]

  renderPoint(chart, maxPoint, maxIndex > minIndex)
  renderPoint(chart, minPoint, minIndex > maxIndex)
}
