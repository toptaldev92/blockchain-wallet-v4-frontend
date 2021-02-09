import { connect } from 'react-redux'
import { pathOr } from 'ramda'
import React from 'react'
import styled from 'styled-components'

import { getCoins } from './selectors'
import { Icon, Text } from 'blockchain-info-components'
import { selectors } from 'data'
import SelectBox from '../SelectBox'

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-overflow: ellipsis;
  & > :first-child {
    margin-right: 5px;
  }
`
const ItemIcon = styled(Icon)`
  color: ${props => props.theme[props.color]} !important;
  * {
    color: ${props => props.theme[props.color]} !important;
  }
`

class SelectBoxCoin extends React.PureComponent {
  renderItem = props => {
    const { supportedCoins } = this.props
    const { value, text, ...rest } = props
    return (
      <HeaderWrapper {...rest}>
        <ItemIcon
          name={pathOr('', [value, 'icons', 'circleFilled'], supportedCoins)}
          color={pathOr('textBlack', [value, 'colorCode'], supportedCoins)}
          size='20px'
        />
        <Text size='14px' cursor='pointer' data-e2e=''>
          {text}
        </Text>
      </HeaderWrapper>
    )
  }
  renderDisplay = (props, children) => {
    const { supportedCoins } = this.props
    const { value, ...rest } = props
    const e2eTag = value
      ? value.toLowerCase() + 'CurrencyOption'
      : 'currencyOption'
    return (
      <HeaderWrapper {...rest}>
        <ItemIcon
          name={pathOr('', [value, 'icons', 'circleFilled'], supportedCoins)}
          color={pathOr('textBlack', [value, 'colorCode'], supportedCoins)}
          size='20px'
        />
        <Text size='16px' cursor='pointer' data-e2e={e2eTag} weight={500}>
          {children}
        </Text>
      </HeaderWrapper>
    )
  }
  render () {
    const { additionalOptions, coins, supportedCoins, ...rest } = this.props
    const elements = [
      {
        group: '',
        items: additionalOptions ? [...additionalOptions, ...coins] : coins
      }
    ]
    return (
      <SelectBox
        supportedCoins={supportedCoins}
        elements={elements}
        templateDisplay={this.renderDisplay}
        templateItem={this.renderItem}
        zIndex={3}
        {...rest}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  coins: getCoins(state, ownProps),
  supportedCoins: selectors.core.walletOptions
    .getSupportedCoins(state)
    .getOrFail()
})

export default connect(mapStateToProps)(SelectBoxCoin)
