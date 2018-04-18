import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { NavLink } from 'react-router-dom'

import { Link, Text } from 'blockchain-info-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  & > * { margin-left: 5px; }
`

const BuyText = styled(Text)`
  color: ${props => props.theme['brand-secondary']};
  text-decoration: underline;
  text-decoration-color: ${props => props.theme['brand-secondary']};
  cursor: pointer;
`

const MinimumMaximum = props => {
  const { isBalanceBelowMin, minimum, sourceCoin } = props
  return isBalanceBelowMin
    ? (
      <Wrapper>
        <Text weight={300} size='12px'>
          <FormattedMessage id='scenes.exchangebox.firststep.use1' defaultMessage='😢 ' />
        </Text>
        <Text weight={300} size='12px'>
          {minimum} {sourceCoin}
        </Text>
        <Text weight={300} size='12px'>
          <FormattedMessage id='scenes.exchangebox.firststep.use1' defaultMessage=' required to exchange' />
        </Text>
        {sourceCoin === 'BTC' &&
          <NavLink to='/buy-sell'>
            <BuyText weight={300} size='12px'>
              <FormattedMessage id='scenes.exchangebox.firststep.buybtc' defaultMessage='Buy Bitcoin' />
            </BuyText>
          </NavLink>
        }
      </Wrapper>
    )
    : (
      <Wrapper>
        <Text weight={300} size='12px'>
          <FormattedMessage id='scenes.exchangebox.firststep.use1' defaultMessage='Use' />
        </Text>
        <Link size='12px' weight={300} onClick={props.handleClickMinimum}>
          <FormattedMessage id='scenes.exchangebox.firststep.min' defaultMessage='minimum' />
        </Link>
        <Text weight={300} size='12px'>
          <FormattedMessage id='scenes.exchangebox.firststep.use2' defaultMessage='| Use' />
        </Text>
        <Link size='12px' weight={300} onClick={props.handleClickMaximum}>
          <FormattedMessage id='scenes.exchangebox.firststep.max' defaultMessage='maximum' />
        </Link>
      </Wrapper>
    )
}

MinimumMaximum.propTypes = {
  handleClickMinimum: PropTypes.func.isRequired,
  handleClickMaximum: PropTypes.func.isRequired
}

export default MinimumMaximum
