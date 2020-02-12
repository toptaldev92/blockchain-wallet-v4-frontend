import { calculateInterval, calculateStart } from 'services/ChartService'
import { getConfig, renderMinMax } from './services'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactHighcharts from 'react-highcharts'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
  }
  svg {
    .highcharts-background {
      fill: ${props => props.theme.white} !important;
    }
  }
  .highcharts-tooltip span {
    padding: 0px 2px 2px 2px;
    > span:first-child {
      font-weight: 400;
    }
  }
  .highcharts-container,
  .highcharts-root {
    overflow: visible !important;
  }
  .min-max {
    opacity: 1;
    padding: 4px 6px;
    border-radius: 4px;
    color: ${props => props.theme.white};
    background: ${props => props.theme[props.coin.toLowerCase()]};
    transition: opacity 0.3s;
  }
  &:hover {
    .min-max {
      opacity: 0;
      transition: opacity 0.3s 0.3s;
    }
  }
`

const Chart = props => {
  const { coin, time, data, currency, isSilverOrAbove } = props
  const decimals = coin === 'XLM' ? 4 : 2
  const start = calculateStart(coin, time)
  const interval = calculateInterval(coin, time)
  let config = getConfig(
    coin,
    currency,
    data,
    decimals,
    interval,
    isSilverOrAbove,
    start
  )

  const [chartObj, setChartObj] = useState({
    config,
    start,
    interval,
    decimals,
    isSilverOrAbove
  })

  useEffect(() => {
    config = getConfig(
      coin,
      currency,
      data,
      decimals,
      interval,
      isSilverOrAbove,
      start
    )
    setChartObj({ config })
  }, [isSilverOrAbove])

  const handleCallback = chart =>
    renderMinMax(chart, { currency, data, decimals })

  return (
    <Wrapper coin={coin}>
      <ReactHighcharts
        config={chartObj.config}
        callback={handleCallback}
        isPureConfig
      />
    </Wrapper>
  )
}

Chart.propTypes = {
  currency: PropTypes.string.isRequired,
  coin: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}

export default Chart
