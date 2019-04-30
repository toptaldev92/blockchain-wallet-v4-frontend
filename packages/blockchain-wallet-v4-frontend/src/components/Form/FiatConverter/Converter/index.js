import React from 'react'
import PropTypes from 'prop-types'
import { equals } from 'ramda'

import { Exchange } from 'blockchain-wallet-v4/src'
import Converter from './template'

const convertFiatToCoin = (value, unit, currency, rates) => ({
  coinCode: unit,
  coin: Exchange.convertFiatToCoin(value, unit, currency, rates),
  fiat: value
})

const convertCoinToFiat = (value, unit, currency, rates) => ({
  coinCode: unit,
  coin: value,
  fiat: Exchange.convertCoinToFiat(value, unit, currency, rates)
})

class ConverterContainer extends React.PureComponent {
  state = { coin: '', fiat: '' }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!equals(nextProps.value, prevState)) {
      return nextProps.value
    }
    return null
  }

  handleCoinChange = e => {
    const { unit, currency, rates } = this.props
    const nextProps = convertCoinToFiat(e.target.value, unit, currency, rates)
    this.props.onChange(nextProps)
  }

  handleFiatChange = e => {
    const { unit, currency, rates } = this.props
    const decimals = e.target.value.split('.')[1]
    const needsFormatting = decimals && decimals.length > 2
    const val = needsFormatting
      ? Number(e.target.value).toFixed(2)
      : e.target.value

    const nextProps = convertFiatToCoin(val, unit, currency, rates)
    this.props.onChange(nextProps)
  }

  handleBlur = () => {
    this.props.onBlur(this.state)
  }

  handleFocus = () => {
    this.props.onFocus(this.state)
  }

  render () {
    const { coin, fiat } = this.state
    const {
      disabled,
      unit,
      currency,
      meta,
      errorBottom,
      className
    } = this.props
    return (
      <Converter
        coin={coin}
        fiat={fiat}
        unit={unit}
        disabled={disabled}
        currency={currency}
        meta={meta}
        errorBottom={errorBottom}
        className={className}
        handleBlur={this.handleBlur}
        handleFocus={this.handleFocus}
        handleCoinChange={this.handleCoinChange}
        handleFiatChange={this.handleFiatChange}
        data-e2e={this.props['data-e2e']}
      />
    )
  }
}

ConverterContainer.propTypes = {
  unit: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  rates: PropTypes.object.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
}

export default ConverterContainer
